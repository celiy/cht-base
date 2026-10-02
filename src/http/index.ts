import { createHttpClient } from "./http";
import { resolveReachableApiBaseUrl } from "./resolveApiBaseUrl";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3001";

/** The authentication token listeners */
const authTokenListeners = new Set<(token: string | null) => void>();
const unauthorizedListeners = new Set<() => void>();

/** Emits the authentication token change */
function emitAuthTokenChange(token: string | null): void {
    for (const listener of authTokenListeners) {
        listener(token);
    }
}

/** The HTTP client */
export const http = createHttpClient({
    baseURL: API_BASE_URL,
    withCredentials: true,
    onUnauthorized: () => {
        http.setAuthToken(null);
        emitAuthTokenChange(null);

        for (const listener of unauthorizedListeners) {
            listener();
        }
    }
});

/** Discovers the API base URL */
export async function discoverApiBaseUrl(): Promise<string> {
    const configured = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3001";

    if (import.meta.env.VITE_HAS_BACKEND !== "true") {
        return configured;
    }

    const maxOffset = Number(import.meta.env.VITE_API_PORT_SCAN_LIMIT || "20");
    const limit = Number.isFinite(maxOffset) && maxOffset >= 0 ? maxOffset : 20;
    const resolved = await resolveReachableApiBaseUrl(configured, limit);

    http.setBaseURL(resolved);

    return resolved;
}

/** Sets an in-memory Bearer token (optional tool; session cookies are httpOnly) */
export function setAuthToken(token: string | null): void {
    http.setAuthToken(token);
    emitAuthTokenChange(token);
}

/** Clears the in-memory Bearer token */
export function clearAuthToken(): void {
    setAuthToken(null);
}

/** Adds an authentication token change listener */
export function onAuthTokenChange(listener: (token: string | null) => void): () => void {
    authTokenListeners.add(listener);

    return () => {
        authTokenListeners.delete(listener);
    };
}

/** Adds a listener for HTTP 401 responses */
export function onHttpUnauthorized(listener: () => void): () => void {
    unauthorizedListeners.add(listener);

    return () => {
        unauthorizedListeners.delete(listener);
    };
}

/** The HTTP error type */
export { HttpError } from "./http";
export type { HttpClient } from "./http";
