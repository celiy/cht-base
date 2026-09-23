import {
    candidatePorts,
    isLoopbackHttpUrl,
    parseUrlPort,
    replaceUrlPort
} from "@shared/net/portScan";
import type { BackendStatus } from "../types/electron";

const HEALTH_TIMEOUT_MS = 1200;
const ELECTRON_API_WAIT_MS = 60_000;

/** Constructs the health URL for the given base URL */
function healthUrlFor(baseURL: string): string {
    return `${baseURL.replace(/\/$/, "")}/health`;
}

/** Pings the health URL */
async function pingHealth(url: string): Promise<boolean> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, HEALTH_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "omit",
            signal: controller.signal
        });

        return response.ok;
    } catch {
        return false;
    } finally {
        window.clearTimeout(timeoutId);
    }
}

/** Constructs the API base URL from the backend status */
function apiBaseUrlFromStatus(status: BackendStatus): string | null {
    if (status.apiBaseUrl) {
        return status.apiBaseUrl.replace(/\/$/, "");
    }

    if (!status.healthUrl) {
        return null;
    }

    try {
        const url = new URL(status.healthUrl);
        url.pathname = "";
        url.search = "";
        url.hash = "";

        return url.toString().replace(/\/$/, "");
    } catch {
        return null;
    }
}

/** Waits for the Electron API base URL */
function waitForElectronApiBaseUrl(): Promise<string | null> {
    const api = window.electronAPI;

    if (!api?.isElectron) {
        return Promise.resolve(null);
    }

    return new Promise((resolve) => {
        let settled = false;

        const finish = (value: string | null) => {
            if (settled) {
                return;
            }

            settled = true;
            window.clearTimeout(timeoutId);
            stopListening();
            resolve(value);
        };

        const onStatus = (status: BackendStatus) => {
            if (status.state === "ready") {
                finish(apiBaseUrlFromStatus(status));
                return;
            }

            if (status.state === "error" || status.state === "stopped") {
                finish(null);
            }
        };

        const stopListening = api.onBackendStatus(onStatus);
        const timeoutId = window.setTimeout(() => {
            finish(null);
        }, ELECTRON_API_WAIT_MS);

        void api.getBackendStatus().then(onStatus);
    });
}

/**
 * Resolves the reachable API base URL
 * Electron: wait for the main process to report the OS-assigned listen URL.
 * Browser loopback: probe startPort .. startPort+maxOffset until `/health` answers.
 * Remote URLs are used as-is.
 * @param {string} configuredBaseUrl The configured base URL
 * @param {number} maxOffset The maximum offset to probe
 * @returns {Promise<string>} The reachable API base URL
 */
export async function resolveReachableApiBaseUrl(
    configuredBaseUrl: string,
    maxOffset: number
): Promise<string> {
    const electronUrl = await waitForElectronApiBaseUrl();

    if (electronUrl) {
        return electronUrl;
    }

    if (!isLoopbackHttpUrl(configuredBaseUrl)) {
        return configuredBaseUrl;
    }

    const startPort = parseUrlPort(configuredBaseUrl, 3001);
    const ports = candidatePorts(startPort, maxOffset);

    for (const port of ports) {
        const baseURL = replaceUrlPort(configuredBaseUrl, port).replace(/\/$/, "");

        if (await pingHealth(healthUrlFor(baseURL))) {
            return baseURL;
        }
    }

    return configuredBaseUrl.replace(/\/$/, "");
}
