import { createHttpClient } from "./http";
import { getStoredAuthToken, setStoredAuthToken } from "./token";
import { resolveReachableApiBaseUrl } from "./resolveApiBaseUrl";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3001";

/** The HTTP client */
export const http = createHttpClient({
    baseURL: API_BASE_URL,
    withCredentials: true,
    getAuthToken: getStoredAuthToken,
    onUnauthorized: () => {
        setStoredAuthToken(null);
        http.setAuthToken(null);
        emitAuthTokenChange(null);
    }
});

/** Hydrates the HTTP authentication token */
export function hydrateHttpAuth(): void {
    http.setAuthToken(getStoredAuthToken());
}

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

/** Persists the authentication token */
export function persistAuthToken(token: string): void {
    setStoredAuthToken(token);
    http.setAuthToken(token);
    emitAuthTokenChange(token);
}

/** Clears the authentication token */
export function clearAuthToken(): void {
    setStoredAuthToken(null);
    http.setAuthToken(null);
    emitAuthTokenChange(null);
}

/** The authentication token listeners */
const authTokenListeners = new Set<(token: string | null) => void>();

/** Emits the authentication token change */
function emitAuthTokenChange(token: string | null): void {
    for (const listener of authTokenListeners) {
        listener(token);
    }
}

/** Adds an authentication token change listener */
export function onAuthTokenChange(listener: (token: string | null) => void): () => void {
    authTokenListeners.add(listener);

    return () => {
        authTokenListeners.delete(listener);
    };
}

/** The HTTP error type */
export { HttpError } from "./http";
export type { HttpClient } from "./http";
export { getStoredAuthToken } from "./token";
