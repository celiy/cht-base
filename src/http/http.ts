import type { ApiErrorResponse } from "@shared/errors/ApiError";
import type {
    HttpClientOptions,
    HttpMethod,
    HttpQueryValue,
    HttpRequestBody,
    HttpRequestConfig,
    HttpResponse,
    HttpResponseType
} from "./types";

/** The default timeout in milliseconds */
const DEFAULT_TIMEOUT_MS = 30_000;

/** The HTTP error class */
export class HttpError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly data: unknown;
    readonly fields?: ApiErrorResponse["error"]["fields"];

    /**
     * Creates a new HTTP error
     * @param {string} message The error message
     * @param {number} status The HTTP status code
     * @param {string} statusText The HTTP status text
     * @param {unknown} data The error data
     */
    constructor(message: string, status: number, statusText: string, data: unknown) {
        super(message);

        this.name = "HttpError";
        this.status = status;
        this.statusText = statusText;
        this.data = data;

        if (data && typeof data === "object" && "error" in data) {
            const apiError = data as ApiErrorResponse;
            this.fields = apiError.error?.fields;
        }
    }
}

/** Whether the value is a plain object */
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Object.prototype.toString.call(value) === "[object Object]";
}

/** Appends the query parameters to the URL
 * @param {URL} url The URL to append the query parameters to
 * @param {Record<string, HttpQueryValue>} params The query parameters to append
 */
function appendQueryParams(url: URL, params?: Record<string, HttpQueryValue>): void {
    if (!params) {
        return;
    }

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) {
            continue;
        }

        url.searchParams.append(key, String(value));
    }
}

/** Resolves the URL
 * @param {string | undefined} baseURL The base URL
 * @param {string} url The URL to resolve
 * @param {Record<string, HttpQueryValue>} params The query parameters to append
 */
function resolveUrl(
    baseURL: string | undefined,
    url: string,
    params?: Record<string, HttpQueryValue>
): string {
    const resolved =
        url.startsWith("http://") || url.startsWith("https://")
            ? new URL(url)
            : new URL(url.replace(/^\//, ""), `${(baseURL ?? "").replace(/\/$/, "")}/`);

    appendQueryParams(resolved, params);

    return resolved.toString();
}

/** Merges the headers
 * @param {Array<Record<string, string> | undefined>} groups The headers to merge
 * @returns {Record<string, string>} The merged headers
 */
function mergeHeaders(
    ...groups: Array<Record<string, string> | undefined>
): Record<string, string> {
    const merged: Record<string, string> = {};

    for (const group of groups) {
        if (!group) {
            continue;
        }

        for (const [key, value] of Object.entries(group)) {
            merged[key] = value;
        }
    }

    return merged;
}

/** Builds the request body
 * @param {HttpRequestBody | undefined} data The data to build the request body from
 * @param {Record<string, string>} headers The headers to build the request body from
 * @returns {BodyInit | undefined} The request body
 */
function buildRequestBody(
    data: HttpRequestBody | undefined,
    headers: Record<string, string>
): BodyInit | undefined {
    if (data === undefined || data === null) {
        return undefined;
    }

    if (
        data instanceof FormData ||
        data instanceof Blob ||
        data instanceof ArrayBuffer ||
        data instanceof URLSearchParams ||
        typeof data === "string"
    ) {
        return data;
    }

    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";

    if (isPlainObject(data) || Array.isArray(data)) {
        return JSON.stringify(data);
    }

    return String(data);
}

/** Parses the response body
 * @param {Response} response The response to parse the body from
 * @param {HttpResponseType} responseType The response type to parse the body from
 * @returns {Promise<unknown>} The parsed body
 */
async function parseResponseBody(
    response: Response,
    responseType: HttpResponseType
): Promise<unknown> {
    if (response.status === 204) {
        return null;
    }

    if (responseType === "blob") {
        return response.blob();
    }

    if (responseType === "arrayBuffer") {
        return response.arrayBuffer();
    }

    if (responseType === "text") {
        return response.text();
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

/** Creates a timeout signal
 * @param {number} timeoutMs The timeout in milliseconds
 * @param {AbortSignal | undefined} externalSignal The external signal to abort the request
 * @returns {Object} The timeout signal
 * @returns {AbortSignal} signal The timeout signal
 * @returns {() => void} clear A function to clear the timeout signal
 * @returns {() => void} A function to clear the timeout signal
 */
function createTimeoutSignal(
    timeoutMs: number,
    externalSignal?: AbortSignal
): {
    signal: AbortSignal;
    clear: () => void;
} {
    const controller = new AbortController();
    let timeoutId: number | null = window.setTimeout(() => {
        controller.abort(new DOMException("Request timeout", "TimeoutError"));
    }, timeoutMs);

    const onExternalAbort = () => {
        controller.abort(externalSignal?.reason);
    };

    if (externalSignal) {
        if (externalSignal.aborted) {
            onExternalAbort();
        } else {
            externalSignal.addEventListener("abort", onExternalAbort, { once: true });
        }
    }

    return {
        signal: controller.signal,
        clear: () => {
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
            }

            if (externalSignal) {
                externalSignal.removeEventListener("abort", onExternalAbort);
            }
        }
    };
}

/** Creates a HTTP client
 * @param {HttpClientOptions} options The options to create the HTTP client with
 * @returns {HttpClient} The HTTP client
 */
export function createHttpClient(options: HttpClientOptions = {}) {
    let authToken: string | null = null;

    /**
     * Makes a request
     * @param {HttpMethod} method The HTTP method to use
     * @param {string} url The URL to make the request to
     * @param {HttpRequestBody | undefined} data The data to send with the request
     * @param {HttpRequestConfig} config The configuration for the request
     * @returns {Promise<HttpResponse<T>>} The response from the request
     */
    async function request<T = unknown>(
        method: HttpMethod,
        url: string,
        data?: HttpRequestBody,
        config: HttpRequestConfig = {}
    ): Promise<HttpResponse<T>> {
        const token = authToken ?? options.getAuthToken?.() ?? null;

        const headers = mergeHeaders(
            options.headers,
            config.headers,
            token ? { Authorization: `Bearer ${token}` } : undefined
        );

        const body = buildRequestBody(data, headers);
        const timeoutMs = config.timeout ?? options.timeout ?? DEFAULT_TIMEOUT_MS;
        const timeoutControl = createTimeoutSignal(timeoutMs, config.signal);
        const requestUrl = resolveUrl(config.baseURL ?? options.baseURL, url, config.params);

        try {
            const response = await fetch(requestUrl, {
                method,
                headers,
                body: method === "GET" || method === "HEAD" ? undefined : body,
                credentials:
                    (config.withCredentials ?? options.withCredentials) ? "include" : "same-origin",
                signal: timeoutControl.signal
            });

            const responseType = config.responseType ?? "json";
            const parsedBody = await parseResponseBody(response, responseType);

            if (!response.ok) {
                if (response.status === 401) {
                    options.onUnauthorized?.();
                }

                const apiMessage =
                    parsedBody &&
                    typeof parsedBody === "object" &&
                    "error" in parsedBody &&
                    typeof (parsedBody as ApiErrorResponse).error?.message === "string"
                        ? (parsedBody as ApiErrorResponse).error.message
                        : response.statusText;

                throw new HttpError(
                    apiMessage || "Erro na requisição",
                    response.status,
                    response.statusText,
                    parsedBody
                );
            }

            return {
                data: parsedBody as T,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                ok: response.ok
            };
        } finally {
            timeoutControl.clear();
        }
    }

    return {
        request,

        /**
         * Makes a GET request
         * @param {string} url The URL to make the request to
         * @param {HttpRequestConfig} config The configuration for the request
         * @returns {Promise<HttpResponse<T>>} The response from the request
         */
        get<T = unknown>(url: string, config?: HttpRequestConfig) {
            return request<T>("GET", url, undefined, config);
        },

        /**
         * Makes a POST request
         * @param {string} url The URL to make the request to
         * @param {HttpRequestBody | undefined} data The data to send with the request
         * @param {HttpRequestConfig} config The configuration for the request
         * @returns {Promise<HttpResponse<T>>} The response from the request
         */
        post<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("POST", url, data, config);
        },

        /**
         * Makes a PUT request
         * @param {string} url The URL to make the request to
         * @param {HttpRequestBody | undefined} data The data to send with the request
         * @param {HttpRequestConfig} config The configuration for the request
         * @returns {Promise<HttpResponse<T>>} The response from the request
         */
        put<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("PUT", url, data, config);
        },

        /**
         * Makes a PATCH request
         * @param {string} url The URL to make the request to
         * @param {HttpRequestBody | undefined} data The data to send with the request
         * @param {HttpRequestConfig} config The configuration for the request
         * @returns {Promise<HttpResponse<T>>} The response from the request
         */
        patch<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("PATCH", url, data, config);
        },

        /**
         * Makes a DELETE request
         * @param {string} url The URL to make the request to
         * @param {HttpRequestConfig} config The configuration for the request
         * @returns {Promise<HttpResponse<T>>} The response from the request
         */
        delete<T = unknown>(url: string, config?: HttpRequestConfig) {
            return request<T>("DELETE", url, undefined, config);
        },

        /**
         * Sets the authentication token
         * @param {string | null} token The authentication token
         */
        setAuthToken(token: string | null) {
            authToken = token;
        },

        /**
         * Gets the authentication token
         * @returns {string | null} The authentication token
         */
        getAuthToken() {
            return authToken ?? options.getAuthToken?.() ?? null;
        },

        /**
         * Sets the base URL
         * @param {string} baseURL The base URL
         */
        setBaseURL(baseURL: string) {
            options.baseURL = baseURL;
        },

        /**
         * Gets the base URL
         * @returns {string} The base URL
         */
        getBaseURL() {
            return options.baseURL ?? "";
        }
    };
}

/** The HTTP client type */
export type HttpClient = ReturnType<typeof createHttpClient>;
