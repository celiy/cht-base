import { http, hydrateHttpAuth, persistAuthToken, clearAuthToken, HttpError } from "./index";
import type { HttpClient } from "./index";

type HttpApp = {
    config: {
        globalProperties: Record<string, unknown>;
    };
};

export function httpPlugin(app: HttpApp): void {
    app.config.globalProperties.$http = http;
}

export {
    http,
    hydrateHttpAuth,
    persistAuthToken,
    clearAuthToken,
    HttpError
};

export type { HttpClient };
