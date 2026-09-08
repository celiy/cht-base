export const AUTH_TOKEN_STORAGE_KEY = "cht_auth_token";

export function getStoredAuthToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

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
