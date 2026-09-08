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

const DEFAULT_TIMEOUT_MS = 30_000;

export class HttpError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly data: unknown;
    readonly fields?: ApiErrorResponse["error"]["fields"];

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

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Object.prototype.toString.call(value) === "[object Object]";
}

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

function resolveUrl(baseURL: string | undefined, url: string, params?: Record<string, HttpQueryValue>): string {
    const resolved = url.startsWith("http://") || url.startsWith("https://")
        ? new URL(url)
        : new URL(url.replace(/^\//, ""), `${(baseURL ?? "").replace(/\/$/, "")}/`);

    appendQueryParams(resolved, params);

    return resolved.toString();
}

function mergeHeaders(...groups: Array<Record<string, string> | undefined>): Record<string, string> {
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

function buildRequestBody(data: HttpRequestBody | undefined, headers: Record<string, string>): BodyInit | undefined {
    if (data === undefined || data === null) {
        return undefined;
    }

    if (
        data instanceof FormData
        || data instanceof Blob
        || data instanceof ArrayBuffer
        || data instanceof URLSearchParams
        || typeof data === "string"
    ) {
        return data;
    }

    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";

    if (isPlainObject(data) || Array.isArray(data)) {
        return JSON.stringify(data);
    }

    return String(data);
}

async function parseResponseBody(response: Response, responseType: HttpResponseType): Promise<unknown> {
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

function createTimeoutSignal(timeoutMs: number, externalSignal?: AbortSignal): {
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

export function createHttpClient(options: HttpClientOptions = {}) {
    let authToken: string | null = null;

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
                credentials: config.withCredentials ?? options.withCredentials ? "include" : "same-origin",
                signal: timeoutControl.signal
            });

            const responseType = config.responseType ?? "json";
            const parsedBody = await parseResponseBody(response, responseType);

            if (!response.ok) {
                if (response.status === 401) {
                    options.onUnauthorized?.();
                }

                const apiMessage =
                    parsedBody
                    && typeof parsedBody === "object"
                    && "error" in parsedBody
                    && typeof (parsedBody as ApiErrorResponse).error?.message === "string"
                        ? (parsedBody as ApiErrorResponse).error.message
                        : response.statusText;

                throw new HttpError(apiMessage || "Erro na requisição", response.status, response.statusText, parsedBody);
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

        get<T = unknown>(url: string, config?: HttpRequestConfig) {
            return request<T>("GET", url, undefined, config);
        },

        post<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("POST", url, data, config);
        },

        put<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("PUT", url, data, config);
        },

        patch<T = unknown>(url: string, data?: HttpRequestBody, config?: HttpRequestConfig) {
            return request<T>("PATCH", url, data, config);
        },

        delete<T = unknown>(url: string, config?: HttpRequestConfig) {
            return request<T>("DELETE", url, undefined, config);
        },

        setAuthToken(token: string | null) {
            authToken = token;
        },

        getAuthToken() {
            return authToken ?? options.getAuthToken?.() ?? null;
        }
    };
}

export type HttpClient = ReturnType<typeof createHttpClient>;
