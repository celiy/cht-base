/** Remote tip the user already confirmed as seen. */
export type DismissedRepoTip = {
    remoteSha: string;
};

export type RepoUpdate = {
    id: string;
    name: string;
    path: string;
    localSha: string;
    remoteSha: string;
    ahead: number;
};

export type DismissalsMap = Record<string, DismissedRepoTip>;

export const REPO_UPDATE_STORAGE_KEY = "cht.repoUpdateDismissals";
export const REPO_UPDATES_ENDPOINT = "/__cht/repo-updates";

/**
 * Keep updates whose remote tip is newer than the last dismissed tip.
 */
export function filterPendingUpdates(
    remote: RepoUpdate[],
    dismissed: DismissalsMap
): RepoUpdate[] {
    return remote.filter((repo) => {
        const seen = dismissed[repo.id];

        if (!seen || !seen.remoteSha) {
            return true;
        }

        return seen.remoteSha !== repo.remoteSha;
    });
}

/**
 * Build dismiss map from the current pending list (user confirmed).
 */
export function buildDismissals(repos: RepoUpdate[]): DismissalsMap {
    const next: DismissalsMap = {};

    for (const repo of repos) {
        next[repo.id] = { remoteSha: repo.remoteSha };
    }

    return next;
}

/**
 * Merge new dismissals into an existing map (preserve unrelated ids).
 */
export function mergeDismissals(
    existing: DismissalsMap,
    confirmed: DismissalsMap
): DismissalsMap {
    return { ...existing, ...confirmed };
}

export function readDismissals(storage: Storage = localStorage): DismissalsMap {
    try {
        const raw = storage.getItem(REPO_UPDATE_STORAGE_KEY);

        if (!raw) {
            return {};
        }

        const parsed: unknown = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object") {
            return {};
        }

        const out: DismissalsMap = {};

        for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
            if (!value || typeof value !== "object") {
                continue;
            }

            const remoteSha = (value as { remoteSha?: unknown }).remoteSha;

            if (typeof remoteSha === "string" && remoteSha) {
                out[id] = { remoteSha };
            }
        }

        return out;
    } catch {
        return {};
    }
}

export function writeDismissals(
    dismissals: DismissalsMap,
    storage: Storage = localStorage
): void {
    storage.setItem(REPO_UPDATE_STORAGE_KEY, JSON.stringify(dismissals));
}

export async function fetchRepoUpdates(
    fetchImpl: typeof fetch = fetch
): Promise<RepoUpdate[]> {
    const response = await fetchImpl(REPO_UPDATES_ENDPOINT, {
        method: "GET",
        headers: { Accept: "application/json" }
    });

    if (!response.ok) {
        return [];
    }

    const payload: unknown = await response.json();

    if (!payload || typeof payload !== "object") {
        return [];
    }

    const updates = (payload as { updates?: unknown }).updates;

    if (!Array.isArray(updates)) {
        return [];
    }

    return updates.filter((row): row is RepoUpdate => {
        if (!row || typeof row !== "object") {
            return false;
        }

        const item = row as Partial<RepoUpdate>;

        return (
            typeof item.id === "string"
            && typeof item.name === "string"
            && typeof item.remoteSha === "string"
            && typeof item.localSha === "string"
            && typeof item.ahead === "number"
            && item.ahead > 0
        );
    });
}

export function dismissRepoUpdates(repos: RepoUpdate[], storage: Storage = localStorage): void {
    const existing = readDismissals(storage);
    const confirmed = buildDismissals(repos);
    writeDismissals(mergeDismissals(existing, confirmed), storage);
}

function assert(condition: boolean, message: string): void {
    if (!condition) {
        throw new Error(`[repoUpdates] ${message}`);
    }
}

/** Runnable self-check for dismiss filtering (no test framework). */
export function selfCheckRepoUpdates(): void {
    const remote: RepoUpdate[] = [
        {
            id: "cht-base",
            name: "cht-base",
            path: "cht-base",
            localSha: "aaa",
            remoteSha: "bbb",
            ahead: 2
        },
        {
            id: "cht-shared",
            name: "cht-shared",
            path: "cht-shared",
            localSha: "ccc",
            remoteSha: "ddd",
            ahead: 1
        }
    ];

    const none = filterPendingUpdates(remote, {});
    assert(none.length === 2, "undismissed should keep all");

    const dismissed = filterPendingUpdates(remote, {
        "cht-base": { remoteSha: "bbb" }
    });
    assert(dismissed.length === 1 && dismissed[0]?.id === "cht-shared", "same tip hides");

    const newer = filterPendingUpdates(remote, {
        "cht-base": { remoteSha: "old" },
        "cht-shared": { remoteSha: "ddd" }
    });
    assert(newer.length === 1 && newer[0]?.id === "cht-base", "newer tip shows again");

    const merged = mergeDismissals(
        { "cht-shared": { remoteSha: "ddd" } },
        buildDismissals([remote[0]!])
    );
    assert(merged["cht-base"]?.remoteSha === "bbb", "confirm writes tip");
    assert(merged["cht-shared"]?.remoteSha === "ddd", "merge keeps others");
}
