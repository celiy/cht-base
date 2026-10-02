/**
 * The repo updates module
 * This module is responsible for the repo updates of the project.
 */

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

export type VersionMismatch = {
    id: string;
    name: string;
    expected: string;
    actual: string | null;
};

export type RepoUpdatesPayload = {
    updates: RepoUpdate[];
    versionMismatches: VersionMismatch[];
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
 * @param {DismissalsMap} existing The existing dismissals
 * @param {DismissalsMap} confirmed The confirmed dismissals
 * @returns {DismissalsMap} The merged dismissals
 */
export function mergeDismissals(
    existing: DismissalsMap,
    confirmed: DismissalsMap
): DismissalsMap {
    return { ...existing, ...confirmed };
}

/**
 * Reads the dismissals from the storage
 * @param {Storage} storage The storage
 * @returns {DismissalsMap} The dismissals
 */
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

/**
 * Writes the dismissals to the storage
 * @param {DismissalsMap} dismissals The dismissals
 * @param {Storage} storage The storage
 * @returns {void}
 */
export function writeDismissals(
    dismissals: DismissalsMap,
    storage: Storage = localStorage
): void {
    storage.setItem(REPO_UPDATE_STORAGE_KEY, JSON.stringify(dismissals));
}

/**
 * Fetches the repo updates
 * @param {typeof fetch} fetchImpl The fetch implementation
 * @returns {Promise<RepoUpdatesPayload>} The repo updates
 */
export async function fetchRepoUpdates(
    fetchImpl: typeof fetch = fetch
): Promise<RepoUpdatesPayload> {
    const empty: RepoUpdatesPayload = { updates: [], versionMismatches: [] };
    const response = await fetchImpl(REPO_UPDATES_ENDPOINT, {
        method: "GET",
        headers: { Accept: "application/json" }
    });

    if (!response.ok) {
        return empty;
    }

    const payload: unknown = await response.json();

    if (!payload || typeof payload !== "object") {
        return empty;
    }

    const body = payload as { updates?: unknown; versionMismatches?: unknown };
    const updates = Array.isArray(body.updates) ? body.updates : [];
    const mismatches = Array.isArray(body.versionMismatches) ? body.versionMismatches : [];

    return {
        updates: updates.filter((row): row is RepoUpdate => {
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
        }),
        versionMismatches: mismatches.filter((row): row is VersionMismatch => {
            if (!row || typeof row !== "object") {
                return false;
            }

            const item = row as Partial<VersionMismatch>;

            return (
                typeof item.id === "string"
                && typeof item.name === "string"
                && typeof item.expected === "string"
                && (item.actual === null || typeof item.actual === "string")
            );
        })
    };
}

/**
 * Dismisses the repo updates
 * @param {RepoUpdate[]} repos The repos
 * @param {Storage} storage The storage
 * @returns {void}
 */
export function dismissRepoUpdates(repos: RepoUpdate[], storage: Storage = localStorage): void {
    const existing = readDismissals(storage);
    const confirmed = buildDismissals(repos);
    writeDismissals(mergeDismissals(existing, confirmed), storage);
}

/**
 * Asserts a condition
 * @param {boolean} condition The condition
 * @param {string} message The message
 * @returns {void}
 */
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

    const payload: RepoUpdatesPayload = {
        updates: remote,
        versionMismatches: [
            {
                id: "cht-base",
                name: "cht-base",
                expected: "1.0.1",
                actual: "1.0.2"
            }
        ]
    };
    const pending = filterPendingUpdates(payload.updates, {
        "cht-base": { remoteSha: "bbb" },
        "cht-shared": { remoteSha: "ddd" }
    });
    assert(pending.length === 0, "git dismiss does not drop version mismatches");
    assert(payload.versionMismatches.length === 1, "mismatch stays until versions match");
}
