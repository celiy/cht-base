import { httpBaseToWsUrl, parseWsMessage, serializeWsMessage } from "@shared/net/wsProtocol";
import { http, onAuthTokenChange } from "../http";

export type RealtimeEvent = {
    topic: string;
    payload: unknown;
};

type RealtimeHandler = (event: RealtimeEvent) => void;

const handlers = new Set<RealtimeHandler>();

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectDelayMs = 1000;
let started = false;
let unsubAuth: (() => void) | null = null;
let shouldRun = false;

function clearReconnectTimer(): void {
    if (reconnectTimer === null) {
        return;
    }

    clearTimeout(reconnectTimer);
    reconnectTimer = null;
}

function emit(event: RealtimeEvent): void {
    for (const handler of handlers) {
        handler(event);
    }
}

function disconnectSocket(): void {
    clearReconnectTimer();

    if (!socket) {
        return;
    }

    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;
    socket.close();
    socket = null;
}

function scheduleReconnect(): void {
    if (!shouldRun || reconnectTimer !== null) {
        return;
    }

    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectSocket();
    }, reconnectDelayMs);

    reconnectDelayMs = Math.min(reconnectDelayMs * 2, 10_000);
}

function connectSocket(): void {
    if (!shouldRun || typeof WebSocket === "undefined") {
        return;
    }

    const token = http.getAuthToken();

    if (!token) {
        disconnectSocket();
        return;
    }

    disconnectSocket();

    const url = httpBaseToWsUrl(http.getBaseURL());
    socket = new WebSocket(url);

    socket.onopen = () => {
        reconnectDelayMs = 1000;
        socket?.send(serializeWsMessage({ op: "auth", token }));
    };

    socket.onmessage = (event) => {
        const parsed = parseWsMessage(String(event.data));

        if (parsed?.op === "event") {
            emit({ topic: parsed.topic, payload: parsed.payload });
        }
    };

    socket.onclose = () => {
        socket = null;

        if (shouldRun && http.getAuthToken()) {
            scheduleReconnect();
        }
    };
}

export function onRealtimeEvent(handler: RealtimeHandler): () => void {
    handlers.add(handler);

    return () => {
        handlers.delete(handler);
    };
}

export function startRealtime(): void {
    if (started || import.meta.env.VITE_HAS_BACKEND !== "true") {
        return;
    }

    started = true;
    shouldRun = true;
    unsubAuth = onAuthTokenChange((token) => {
        if (token) {
            shouldRun = true;
            connectSocket();
            return;
        }

        shouldRun = false;
        disconnectSocket();
    });

    if (http.getAuthToken()) {
        connectSocket();
    }
}

export function stopRealtime(): void {
    shouldRun = false;
    started = false;
    unsubAuth?.();
    unsubAuth = null;
    handlers.clear();
    disconnectSocket();
}
