/**
 * The repo updates plugin module
 * This module is responsible for the repo updates plugin of the project.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Connect, Plugin } from "vite";
// cht-main scripts are JS; the compare is the same function the version.check.mjs runs.
// @ts-expect-error -- no types for scripts/lib/version.mjs
import { compareWorkspaceVersions } from "../../scripts/lib/version.mjs";

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

/**
 * Gets the repository name from the URL
 * @param {string} url The URL
 * @returns {string} The repository name
 */
function repoNameFromUrl(url: string): string {
    const last = url.split("/").pop() || "";

    return last.replace(/\.git$/, "");
}

/**
 * Parses the repository specification
 * @param {string | { url?: string; repo?: string; ref?: string } | null | undefined} value The value
 * @param {string | null} extraRef The extra reference
 * @returns {RepoSpec | null} The repository specification
 */
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

/**
 * Adds a repository specification to the list
 * @param {RepoSpec[]} list The list
 * @param {RepoSpec | null} spec The specification
 * @returns {void}
 */
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

/**
 * Reads a JSON file
 * @param {string} filePath The file path
 * @returns {Record<string, unknown> | null} The JSON file
 */
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
 * @param {string | undefined} clientName The client name
 * @returns {RepoSpec[]} The repository specifications
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

/**
 * Runs a Git command
 * @param {string} cwd The current working directory
 * @param {string[]} args The arguments
 * @returns { { ok: boolean; stdout: string }} The result
 */
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

/**
 * Resolves the remote tip
 * @param {string} dir The directory
 * @returns {string | null} The remote tip
 */
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

/**
 * Scans a git checkout for remote commits it does not have yet
 * @param {string} name The repository name
 * @param {string} dir The checkout directory
 * @returns {RepoUpdateInfo | null} The repository update information
 */
function scanDir(name: string, dir: string): RepoUpdateInfo | null {
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

/**
 * Scans a repository
 * @param {RepoSpec} spec The specification
 * @returns {RepoUpdateInfo | null} The repository update information
 */
function scanRepo(spec: RepoSpec): RepoUpdateInfo | null {
    const name = repoNameFromUrl(spec.url);

    return scanDir(name, path.join(WORKSPACE_ROOT, name));
}

/**
 * Handles the repository updates
 * @param {IncomingMessage} req The request
 * @param {ServerResponse} res The response
 * @param {Connect.NextFunction} next The next function
 * @param {string | undefined} clientName The client name
 * @returns {void}
 */
function handleRepoUpdates(
    req: IncomingMessage,
    res: ServerResponse,
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

        const scanned = [
            scanDir("cht-main", WORKSPACE_ROOT),
            ...specs.map((spec) => scanRepo(spec))
        ];

        for (const info of scanned) {
            if (info) {
                updates.push(info);
            }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.end(
            JSON.stringify({
                updates,
                versionMismatches: compareWorkspaceVersions(WORKSPACE_ROOT)
            })
        );
    } catch (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(
            JSON.stringify({
                updates: [],
                versionMismatches: [],
                error: error instanceof Error ? error.message : String(error)
            })
        );
    }
}

/**
 * Dev-only middleware: GET /__cht/repo-updates lists remotes ahead of HEAD
 * and core-repo version pins that differ from the local workspace.
 * @param {string | undefined} clientName The client name
 * @returns {Plugin} The repo updates plugin
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
