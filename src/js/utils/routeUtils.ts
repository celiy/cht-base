import type { LocationQuery, RouteParams } from "vue-router";

/**
 * Normalizes vue-router query values to a single string per key (first value if array).
 */
export function flattenQuery(query: LocationQuery): Record<string, string> {
    const out: Record<string, string> = {};

    for (const [key, raw] of Object.entries(query)) {
        if (raw === null || raw === undefined) {
            continue;
        }

        out[key] = Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
    }

    return out;
}

/**
 * Normalizes vue-router route params to a single string per key (first value if array).
 */
export function flattenParams(params: RouteParams): Record<string, string> {
    const out: Record<string, string> = {};

    for (const [key, raw] of Object.entries(params)) {
        if (raw === null || raw === undefined) {
            continue;
        }

        out[key] = Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
    }

    return out;
}

/**
 * Builds a LocationQuery from a flat string map (for router.push).
 */
export function toLocationQuery(record: Record<string, string>): LocationQuery {
    const q: LocationQuery = {};

    for (const [key, value] of Object.entries(record)) {
        q[key] = value;
    }

    return q;
}

/**
 * Keeps a reactive snapshot object in sync with the current route query.
 */
export function syncReactiveQuerySnapshot(
    query: LocationQuery,
    snapshot: Record<string, string>
): void {
    const flat = flattenQuery(query);

    for (const key of Object.keys(snapshot)) {
        if (!(key in flat)) {
            delete snapshot[key];
        }
    }

    for (const [key, value] of Object.entries(flat)) {
        snapshot[key] = value;
    }
}

/**
 * Keeps a reactive snapshot object in sync with the current route params.
 */
export function syncReactiveParamsSnapshot(
    params: RouteParams,
    snapshot: Record<string, string>
): void {
    const flat = flattenParams(params);

    for (const key of Object.keys(snapshot)) {
        if (!(key in flat)) {
            delete snapshot[key];
        }
    }

    for (const [key, value] of Object.entries(flat)) {
        snapshot[key] = value;
    }
}
