import type { LocationQuery } from "vue-router";
import type { Router } from "vue-router";

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
 * Builds a LocationQuery from a flat string map (for router.push).
 */
export function toLocationQuery(record: Record<string, string>): LocationQuery {
    const q: LocationQuery = {};

    for (const [key, value] of Object.entries(record)) {
        q[key] = value;
    }

    return q;
}

export interface ProjectUrlParamsApi {
    get(name: string): string | undefined;
    set(name: string, value: string | number | boolean | null | undefined): Promise<unknown> | void;
    getAll(): Record<string, string>;
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
 * Creates get/set/getAll helpers bound to a router instance.
 * Query snapshot sync should run from router.afterEach (see project init).
 */
export function createProjectUrlParams(getRouter: () => Router): ProjectUrlParamsApi {
    return {
        get(name: string): string | undefined {
            return flattenQuery(getRouter().currentRoute.value.query)[name];
        },

        set(name: string, value: string | number | boolean | null | undefined) {
            const router = getRouter();
            const merged: Record<string, string> = {
                ...flattenQuery(router.currentRoute.value.query)
            };

            if (value === null || value === undefined || value === "") {
                delete merged[name];
            } else {
                merged[name] = String(value);
            }

            return router.push({
                query: toLocationQuery(merged)
            });
        },

        getAll(): Record<string, string> {
            return { ...flattenQuery(getRouter().currentRoute.value.query) };
        }
    };
}
