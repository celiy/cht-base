import { http, hydrateHttpAuth, persistAuthToken, clearAuthToken, HttpError, discoverApiBaseUrl } from "./index";
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
    HttpError,
    discoverApiBaseUrl
};

export type { HttpClient };
