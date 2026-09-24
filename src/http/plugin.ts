import { http } from "./index";
import type { HttpClient } from "./index";

/** The HTTP app type */
type HttpApp = {
    config: {
        globalProperties: Record<string, unknown>;
    };
};

/** The HTTP plugin */
export function httpPlugin(app: HttpApp): void {
    app.config.globalProperties.$http = http;
}

/** Exports the HTTP client */
export {
    http,
    hydrateHttpAuth,
    persistAuthToken,
    clearAuthToken,
    getStoredAuthToken,
    HttpError,
    discoverApiBaseUrl
} from "./index";

/** The HTTP client type */
export type { HttpClient };
