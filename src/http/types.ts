export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export type HttpResponseType = "json" | "text" | "blob" | "arrayBuffer";

export type HttpQueryValue = string | number | boolean | null | undefined;

export interface HttpRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, HttpQueryValue>;
    withCredentials?: boolean;
    timeout?: number;
    responseType?: HttpResponseType;
    signal?: AbortSignal;
    baseURL?: string;
}

export interface HttpResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
    ok: boolean;
}

export interface HttpClientOptions {
    baseURL?: string;
    headers?: Record<string, string>;
    withCredentials?: boolean;
    timeout?: number;
    getAuthToken?: () => string | null;
    onUnauthorized?: () => void;
}

export type HttpRequestBody =
    | Record<string, unknown>
    | FormData
    | Blob
    | ArrayBuffer
    | URLSearchParams
    | string
    | number
    | boolean
    | null;
