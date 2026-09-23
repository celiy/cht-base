import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import type { BackendStatus, ElectronBackendConfig } from "./types";
import { parseChtApiUrlFromText } from "../../cht-shared/src/net/portScan";

/** The health check interval in milliseconds */
const HEALTH_INTERVAL_MS = 300;
/** The health check timeout in milliseconds */
const HEALTH_TIMEOUT_MS = 60_000;

/** The backend status listener type */
export type BackendStatusListener = (status: BackendStatus) => void;

/**
 * Sleeps for the given number of milliseconds
 * @param {number} ms The number of milliseconds to sleep
 * @returns {Promise<void>} A promise that resolves when the sleep is complete
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Pings the health of the backend
 * @param {string} url The URL to ping
 * @returns {Promise<boolean>} A promise that resolves to the health of the backend
 */
function pingHealth(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const parsed = new URL(url);
        const transport = parsed.protocol === "https:" ? https : http;
        const request = transport.get(
            url,
            {
                timeout: 1500
            },
            (response) => {
                response.resume();
                resolve((response.statusCode ?? 0) >= 200 && (response.statusCode ?? 0) < 300);
            }
        );

        request.on("error", () => {
            resolve(false);
        });

        request.on("timeout", () => {
            request.destroy();
            resolve(false);
        });
    });
}

/**
 * Kills the process tree
 * @param {ChildProcess} child The child process to kill
 */
function killProcessTree(child: ChildProcess): void {
    if (!child.pid) {
        return;
    }

    if (process.platform === "win32") {
        spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
            stdio: "ignore"
        });
        return;
    }

    try {
        process.kill(-child.pid, "SIGTERM");
    } catch {
        try {
            child.kill("SIGTERM");
        } catch {
            // Already gone.
        }
    }
}

/**
 * Sets the backend environment variables
 * @param {ElectronBackendConfig} config The backend configuration
 * @returns {NodeJS.ProcessEnv} The backend environment variables
 */
function backendEnv(config: ElectronBackendConfig): NodeJS.ProcessEnv {
    const env: NodeJS.ProcessEnv = {
        ...process.env,
        HOST: config.host,
        PORT: String(config.port),
        PORT_SCAN_LIMIT: String(config.portScanLimit ?? 20),
        NODE_ENV: process.env.NODE_ENV || "development"
    };

    delete env.ELECTRON_RUN_AS_NODE;

    if (config.electronAsNode) {
        env.ELECTRON_RUN_AS_NODE = "1";
    }

    if (config.dataDir) {
        env.DB_PATH = path.join(config.dataDir, "mecarvit.sqlite");
        env.EMPRESAS_DIR = path.join(config.dataDir, "empresas");
    }

    return env;
}

/**
 * Resolves the tsx CLI path
 * @param {string} dir The directory to resolve the tsx CLI path from
 * @returns {string | null} The tsx CLI path
 */
function resolveTsxCli(dir: string): string | null {
    const cli = path.join(dir, "node_modules", "tsx", "dist", "cli.mjs");

    return fs.existsSync(cli) ? cli : null;
}

/**
 * Spawns the backend process
 * @param {ElectronBackendConfig} config The backend configuration
 * @returns {ChildProcess} The backend process
 */
function spawnBackendProcess(config: ElectronBackendConfig): ChildProcess {
    const common = {
        cwd: config.dir,
        env: backendEnv(config),
        stdio: ["ignore", "pipe", "pipe"] as ["ignore", "pipe", "pipe"],
        windowsHide: true,
        detached: process.platform !== "win32"
    };

    const entry = config.entry || "src/server.ts";

    if (config.nodePath) {
        const tsxCli = resolveTsxCli(config.dir);

        if (tsxCli) {
            return spawn(config.nodePath, [tsxCli, entry], common);
        }

        const tsxBin = path.join(
            config.dir,
            "node_modules",
            ".bin",
            process.platform === "win32" ? "tsx.cmd" : "tsx"
        );

        if (fs.existsSync(tsxBin)) {
            return spawn(tsxBin, [entry], { ...common, shell: true });
        }
    }

    return spawn(config.cmd, {
        ...common,
        shell: true
    });
}

/**
 * The backend manager class
 */
export class BackendManager {
    private child: ChildProcess | null = null;
    private status: BackendStatus = {
        state: "idle",
        message: ""
    };
    private readonly listeners = new Set<BackendStatusListener>();
    private pollTimer: ReturnType<typeof setTimeout> | null = null;
    private stopped = false;
    private runId = 0;
    private stdoutBuf = "";
    private announcedBaseUrl: string | null = null;

    constructor(private readonly config: ElectronBackendConfig) {}

    /**
     * Gets the status of the backend
     * @returns {BackendStatus} The status of the backend
     */
    getStatus(): BackendStatus {
        return { ...this.status };
    }

    /**
     * Adds a status listener
     * @param {BackendStatusListener} listener The status listener to add
     * @returns {() => void} A function to remove the status listener
     */
    onStatus(listener: BackendStatusListener): () => void {
        this.listeners.add(listener);
        listener(this.getStatus());

        return () => {
            this.listeners.delete(listener);
        };
    }

    /**
     * Starts the backend
     * @returns {Promise<void>} A promise that resolves when the backend is started
     */
    async start(): Promise<void> {
        await this.stop();
        this.stopped = false;
        const runId = ++this.runId;
        this.setStatus("starting", "Iniciando o servidor local...");

        this.stdoutBuf = "";
        this.announcedBaseUrl = null;
        const child = spawnBackendProcess(this.config);
        this.child = child;

        child.stdout?.on("data", (chunk: Buffer) => {
            const text = chunk.toString();
            process.stdout.write(`[backend] ${chunk}`);
            this.ingestBackendOutput(text);
        });

        child.stderr?.on("data", (chunk: Buffer) => {
            const text = chunk.toString();
            process.stderr.write(`[backend] ${chunk}`);
            this.ingestBackendOutput(text);
        });

        const exitPromise = new Promise<void>((resolve) => {
            child.on("exit", (code, signal) => {
                if (this.runId !== runId) {
                    resolve();
                    return;
                }

                this.child = null;
                this.clearPollTimer();

                if (this.stopped) {
                    this.setStatus("stopped", "Servidor local encerrado.");
                    resolve();
                    return;
                }

                const reason = signal ? `sinal ${signal}` : `código ${code ?? "?"}`;
                this.setStatus("error", `O servidor local parou (${reason}).`);
                resolve();
            });
        });

        try {
            await Promise.race([this.waitUntilHealthy(runId), exitPromise]);

            if (this.runId !== runId || this.stopped) {
                return;
            }

            if (this.status.state !== "error" && this.child) {
                this.setStatus("ready", "Servidor local pronto.");
            }
        } catch (error) {
            if (this.runId !== runId || this.stopped) {
                return;
            }

            const message = error instanceof Error ? error.message : String(error);
            this.setStatus("error", message);
            await this.stop();
        }
    }

    /**
     * Retries the backend
     * @returns {Promise<void>} A promise that resolves when the backend is retried
     */
    async retry(): Promise<void> {
        await this.start();
    }

    /**
     * Stops the backend
     * @returns {Promise<void>} A promise that resolves when the backend is stopped
     */
    async stop(): Promise<void> {
        this.stopped = true;
        this.clearPollTimer();

        const child = this.child;
        this.child = null;

        if (!child) {
            if (this.status.state !== "idle") {
                this.setStatus("stopped", "Servidor local encerrado.");
            }

            return;
        }

        killProcessTree(child);

        await Promise.race([
            new Promise<void>((resolve) => {
                child.once("exit", () => resolve());
            }),
            sleep(1500)
        ]);

        if (child.exitCode === null && child.pid) {
            if (process.platform === "win32") {
                spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
                    stdio: "ignore"
                });
            } else {
                try {
                    process.kill(-child.pid, "SIGKILL");
                } catch {
                    child.kill("SIGKILL");
                }
            }
        }

        this.setStatus("stopped", "Servidor local encerrado.");
    }

    /**
     * Waits until the backend is healthy
     * @param {number} runId The run ID
     * @returns {Promise<void>} A promise that resolves when the backend is healthy
     */
    private async waitUntilHealthy(runId: number): Promise<void> {
        const startedAt = Date.now();

        while (!this.stopped && this.runId === runId && this.child) {
            if (Date.now() - startedAt >= HEALTH_TIMEOUT_MS) {
                throw new Error("Tempo esgotado ao aguardar o servidor local.");
            }

            const healthy = await this.pingAnnouncedHealth();

            if (healthy) {
                return;
            }

            await new Promise<void>((resolve) => {
                this.pollTimer = setTimeout(() => {
                    this.pollTimer = null;
                    resolve();
                }, HEALTH_INTERVAL_MS);
            });
        }
    }

    /**
     * Ingests the backend output
     * @param {string} text The text to ingest
     */
    private ingestBackendOutput(text: string) {
        this.stdoutBuf += text;

        if (this.stdoutBuf.length > 16_384) {
            this.stdoutBuf = this.stdoutBuf.slice(-8_192);
        }

        const parsed = parseChtApiUrlFromText(this.stdoutBuf);

        if (!parsed) {
            return;
        }

        this.announcedBaseUrl = parsed;
        this.config.healthUrl = `${parsed}/health`;
    }

    /**
     * Pings the announced health
     * @returns {Promise<boolean>} A promise that resolves to the health of the backend
     */
    private async pingAnnouncedHealth(): Promise<boolean> {
        if (!this.announcedBaseUrl) {
            return false;
        }

        return pingHealth(`${this.announcedBaseUrl}/health`);
    }

    /**
     * Clears the poll timer
     */
    private clearPollTimer(): void {
        if (this.pollTimer === null) {
            return;
        }

        clearTimeout(this.pollTimer);
        this.pollTimer = null;
    }

    /**
     * Sets the status of the backend
     * @param {BackendStatus["state"]} state The state of the backend
     * @param {string} message The message to set
     */
    private setStatus(state: BackendStatus["state"], message: string): void {
        this.status = {
            state,
            message,
            healthUrl: this.config.healthUrl,
            apiBaseUrl: this.announcedBaseUrl ?? undefined
        };

        for (const listener of this.listeners) {
            listener(this.getStatus());
        }
    }
}
