/**
 * The realtime module
 * This module is responsible for the realtime of the project.
 */

import { httpBaseToWsUrl, parseWsMessage, serializeWsMessage } from "@shared/net/wsProtocol";
import { http, onAuthTokenChange } from "../http";

/** The realtime event type */
export type RealtimeEvent = {
    topic: string;
    payload: unknown;
};

/** The realtime handler type */
type RealtimeHandler = (event: RealtimeEvent) => void;

/** The realtime handlers */
const handlers = new Set<RealtimeHandler>();

/** The socket */
let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectDelayMs = 1000;
let started = false;
let unsubAuth: (() => void) | null = null;
let shouldRun = false;


/**
 * Clears the reconnect timer
 * @returns {void}
 */
function clearReconnectTimer(): void {
    if (reconnectTimer === null) {
        return;
    }

    clearTimeout(reconnectTimer);
    reconnectTimer = null;
}

/**
 * Emits a realtime event
 * @param {RealtimeEvent} event The event
 * @returns {void}
 */
function emit(event: RealtimeEvent): void {
    for (const handler of handlers) {
        handler(event);
    }
}

/**
 * Disconnects the socket
 * @returns {void}
 */
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

/**
 * Schedules a reconnect
 * @returns {void}
 */
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

/**
 * Connects the socket
 * @returns {void}
 */
function connectSocket(): void {
    if (!shouldRun || typeof WebSocket === "undefined") {
        return;
    }

    disconnectSocket();

    const url = httpBaseToWsUrl(http.getBaseURL());
    socket = new WebSocket(url);

    socket.onopen = () => {
        reconnectDelayMs = 1000;
        const token = http.getAuthToken();

        if (token) {
            socket?.send(serializeWsMessage({ op: "auth", token }));
        }
    };

    socket.onmessage = (event) => {
        const parsed = parseWsMessage(String(event.data));

        if (parsed?.op === "event") {
            emit({ topic: parsed.topic, payload: parsed.payload });
        }
    };

    socket.onclose = () => {
        socket = null;

        if (shouldRun) {
            scheduleReconnect();
        }
    };
}

/**
 * Adds a realtime event handler
 * @param {RealtimeHandler} handler The handler
 * @returns {() => void} A function to remove the handler
 */
export function onRealtimeEvent(handler: RealtimeHandler): () => void {
    handlers.add(handler);

    return () => {
        handlers.delete(handler);
    };
}

/**
 * Sets the realtime enabled
 * @param {boolean} enabled The enabled
 * @returns {void}
 */
export function setRealtimeEnabled(enabled: boolean): void {
    shouldRun = enabled;

    if (enabled) {
        connectSocket();
        return;
    }

    disconnectSocket();
}

/**
 * Starts the realtime
 * @returns {void}
 */
export function startRealtime(): void {
    if (started || import.meta.env.VITE_HAS_BACKEND !== "true") {
        return;
    }

    started = true;
    unsubAuth = onAuthTokenChange((token) => {
        if (token) {
            setRealtimeEnabled(true);
        }
    });
}

/**
 * Stops the realtime
 * @returns {void}
 */
export function stopRealtime(): void {
    shouldRun = false;
    started = false;
    unsubAuth?.();
    unsubAuth = null;
    handlers.clear();
    disconnectSocket();
}
