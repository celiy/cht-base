import { createHttpClient } from "./http";
import { getStoredAuthToken, setStoredAuthToken } from "./token";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export const http = createHttpClient({
    baseURL: API_BASE_URL,
    withCredentials: true,
    getAuthToken: getStoredAuthToken,
    onUnauthorized: () => {
        setStoredAuthToken(null);
        http.setAuthToken(null);
    }
});

export function hydrateHttpAuth(): void {
    http.setAuthToken(getStoredAuthToken());
}

export function persistAuthToken(token: string): void {
    setStoredAuthToken(token);
    http.setAuthToken(token);
}

export function clearAuthToken(): void {
    setStoredAuthToken(null);
    http.setAuthToken(null);
}

export { HttpError } from "./http";
export type { HttpClient } from "./http";
