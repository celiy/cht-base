import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type { Connect, Plugin } from "vite";

const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(PLUGIN_DIR, "..", "..");
const CLIENTS_FILE = path.join(WORKSPACE_ROOT, "clients.json");
const ENDPOINT = "/__cht/repo-updates";

type RepoSpec = { url: string; ref?: string };

export type RepoUpdateInfo = {
    id: string;
    name: string;
    path: string;
    localSha: string;
    remoteSha: string;
    ahead: number;
};

function repoNameFromUrl(url: string): string {
    const last = url.split("/").pop() || "";

    return last.replace(/\.git$/, "");
}

function parseRepoSpec(
    value: string | { url?: string; repo?: string; ref?: string } | null | undefined,
    extraRef?: string | null
): RepoSpec | null {
    const hint = typeof extraRef === "string" && extraRef.trim() ? extraRef.trim() : undefined;

    if (typeof value === "string" && value.trim()) {
        return { url: value.trim(), ref: hint };
    }

    if (!value || typeof value !== "object") {
        return null;
    }

    const urlCandidate = [value.url, value.repo].find(
        (entry) => typeof entry === "string" && entry.trim()
    );
    const url = urlCandidate ? urlCandidate.trim() : "";
    const ref =
        typeof value.ref === "string" && value.ref.trim() ? value.ref.trim() : hint;

    if (!url) {
        return null;
    }

    return { url, ref };
}

function addRepoSpec(list: RepoSpec[], spec: RepoSpec | null): void {
    if (!spec) {
        return;
    }

    const existing = list.find((item) => item.url === spec.url);

    if (existing) {
        if (!existing.ref && spec.ref) {
            existing.ref = spec.ref;
        }

        return;
    }

    list.push({ url: spec.url, ref: spec.ref });
}

function readJson(filePath: string): Record<string, unknown> | null {
    try {
        const raw = fs.readFileSync(filePath, "utf8");
        const parsed: unknown = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object") {
            return null;
        }

        return parsed as Record<string, unknown>;
    } catch {
        return null;
    }
}

/**
 * Same discovery set as install for the active CLIENT (shared + that client).
 */
function collectScanRepos(clientName: string | undefined): RepoSpec[] {
    const list: RepoSpec[] = [];
    const clientsFile = readJson(CLIENTS_FILE);
    const shared = (clientsFile?.shared as { repos?: unknown } | undefined) || {};
    const sharedRepos = Array.isArray(shared.repos) ? shared.repos : [];

    for (const entry of sharedRepos) {
        addRepoSpec(
            list,
            parseRepoSpec(entry as string | { url?: string; repo?: string; ref?: string })
        );
    }

    if (!clientName || clientName === "dev") {
        return list;
    }

    const catalogClients = (clientsFile?.clients as Record<string, unknown> | undefined) || {};
    const catalog = catalogClients[clientName] as
        | { frontend?: unknown; backend?: unknown }
        | undefined;

    addRepoSpec(list, parseRepoSpec(catalog?.frontend as never));
    addRepoSpec(list, parseRepoSpec(catalog?.backend as never));

    // Discover cht.config.json under workspace siblings (same skip set as clients.mjs).
    const skip = new Set([
        "node_modules",
        ".git",
        "cht-base",
        "cht-design-system",
        "cht-shared",
        "scripts",
        "builds",
        "dist"
    ]);

    try {
        for (const entry of fs.readdirSync(WORKSPACE_ROOT, { withFileTypes: true })) {
            if (!entry.isDirectory() || skip.has(entry.name) || entry.name.startsWith(".")) {
                continue;
            }

            const configPath = path.join(WORKSPACE_ROOT, entry.name, "cht.config.json");
            const config = readJson(configPath);

            if (!config || config.name !== clientName) {
                continue;
            }

            const frontend = config.frontend as { repo?: string; ref?: string } | undefined;
            const backend = config.backend as { repo?: string; ref?: string } | undefined;

            addRepoSpec(list, parseRepoSpec(frontend?.repo, frontend?.ref));
            addRepoSpec(list, parseRepoSpec(backend?.repo, backend?.ref));
            break;
        }
    } catch {
        // Discovery optional when catalog already provided URLs.
    }

    return list;
}

function git(cwd: string, args: string[]): { ok: boolean; stdout: string } {
    const result = spawnSync("git", args, {
        cwd,
        encoding: "utf8",
        timeout: 60_000
    });

    if (result.status !== 0) {
        return { ok: false, stdout: "" };
    }

    return { ok: true, stdout: (result.stdout || "").trim() };
}

function resolveRemoteTip(dir: string): string | null {
    const upstream = git(dir, ["rev-parse", "@{upstream}"]);

    if (upstream.ok && upstream.stdout) {
        return upstream.stdout;
    }

    const originHead = git(dir, ["symbolic-ref", "--quiet", "refs/remotes/origin/HEAD"]);

    if (originHead.ok && originHead.stdout) {
        const tip = git(dir, ["rev-parse", originHead.stdout]);

        if (tip.ok && tip.stdout) {
            return tip.stdout;
        }
    }

    for (const branch of ["origin/main", "origin/master"]) {
        const tip = git(dir, ["rev-parse", branch]);

        if (tip.ok && tip.stdout) {
            return tip.stdout;
        }
    }

    return null;
}

function scanRepo(spec: RepoSpec): RepoUpdateInfo | null {
    const name = repoNameFromUrl(spec.url);
    const dir = path.join(WORKSPACE_ROOT, name);

    if (!fs.existsSync(path.join(dir, ".git"))) {
        return null;
    }

    const fetch = git(dir, ["fetch", "--quiet", "--prune"]);

    if (!fetch.ok) {
        return null;
    }

    const local = git(dir, ["rev-parse", "HEAD"]);

    if (!local.ok || !local.stdout) {
        return null;
    }

    const remoteSha = resolveRemoteTip(dir);

    if (!remoteSha) {
        return null;
    }

    const aheadResult = git(dir, ["rev-list", "--count", `${local.stdout}..${remoteSha}`]);

    if (!aheadResult.ok) {
        return null;
    }

    const ahead = Number.parseInt(aheadResult.stdout, 10) || 0;

    if (ahead <= 0) {
        return null;
    }

    return {
        id: name,
        name,
        path: path.relative(WORKSPACE_ROOT, dir) || name,
        localSha: local.stdout,
        remoteSha,
        ahead
    };
}

function handleRepoUpdates(
    req: Connect.IncomingMessage,
    res: Connect.ServerResponse,
    next: Connect.NextFunction,
    clientName: string | undefined
): void {
    if (req.method !== "GET" || req.url?.split("?")[0] !== ENDPOINT) {
        next();

        return;
    }

    try {
        const specs = collectScanRepos(clientName);
        const updates: RepoUpdateInfo[] = [];

        for (const spec of specs) {
            const info = scanRepo(spec);

            if (info) {
                updates.push(info);
            }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify({ updates }));
    } catch (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(
            JSON.stringify({
                updates: [],
                error: error instanceof Error ? error.message : String(error)
            })
        );
    }
}

/**
 * Dev-only middleware: GET /__cht/repo-updates lists workspace repos ahead of remote.
 */
export function repoUpdatesPlugin(clientName?: string): Plugin {
    return {
        name: "cht-repo-updates",
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                handleRepoUpdates(req, res, next, clientName);
            });
        }
    };
}
