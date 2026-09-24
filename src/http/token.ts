export const AUTH_TOKEN_STORAGE_KEY = "cht_auth_token";
export const SYSTEM_TOKEN_STORAGE_KEY = "cht_system_token";

/** Gets the stored authentication token */
export function getStoredAuthToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

/** Sets the stored authentication token */
export function setStoredAuthToken(token: string | null): void {
    if (typeof window === "undefined") {
        return;
    }

    if (!token) {
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

        return;
    }

    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

/** Gets the session system-owner token */
export function getStoredSystemToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return window.sessionStorage.getItem(SYSTEM_TOKEN_STORAGE_KEY);
}

/** Sets the session system-owner token */
export function setStoredSystemToken(token: string | null): void {
    if (typeof window === "undefined") {
        return;
    }

    if (!token) {
        window.sessionStorage.removeItem(SYSTEM_TOKEN_STORAGE_KEY);

        return;
    }

    window.sessionStorage.setItem(SYSTEM_TOKEN_STORAGE_KEY, token);
}
