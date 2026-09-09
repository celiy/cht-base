import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import type { BackendStatus, ElectronBackendConfig } from "./types";

const HEALTH_INTERVAL_MS = 300;
const HEALTH_TIMEOUT_MS = 60_000;

export type BackendStatusListener = (status: BackendStatus) => void;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

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

function spawnBackendProcess(config: ElectronBackendConfig): ChildProcess {
    const env: NodeJS.ProcessEnv = {
        ...process.env,
        HOST: config.host,
        PORT: String(config.port),
        NODE_ENV: process.env.NODE_ENV || "development"
    };

    delete env.ELECTRON_RUN_AS_NODE;

    const common = {
        cwd: config.dir,
        env,
        stdio: ["ignore", "pipe", "pipe"] as ["ignore", "pipe", "pipe"],
        windowsHide: true,
        detached: process.platform !== "win32"
    };

    if (config.nodePath) {
        const tsxBin = path.join(
            config.dir,
            "node_modules",
            ".bin",
            process.platform === "win32" ? "tsx.cmd" : "tsx"
        );

        return spawn(config.nodePath, [tsxBin, "src/server.ts"], common);
    }

    return spawn(config.cmd, {
        ...common,
        shell: true
    });
}

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

    constructor(private readonly config: ElectronBackendConfig) {}

    getStatus(): BackendStatus {
        return { ...this.status };
    }

    onStatus(listener: BackendStatusListener): () => void {
        this.listeners.add(listener);
        listener(this.getStatus());

        return () => {
            this.listeners.delete(listener);
        };
    }

    async start(): Promise<void> {
        await this.stop();
        this.stopped = false;
        const runId = ++this.runId;
        this.setStatus("starting", "Iniciando o servidor local...");

        const child = spawnBackendProcess(this.config);
        this.child = child;

        child.stdout?.on("data", (chunk: Buffer) => {
            process.stdout.write(`[backend] ${chunk}`);
        });

        child.stderr?.on("data", (chunk: Buffer) => {
            process.stderr.write(`[backend] ${chunk}`);
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

    async retry(): Promise<void> {
        await this.start();
    }

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

    private async waitUntilHealthy(runId: number): Promise<void> {
        const startedAt = Date.now();

        while (!this.stopped && this.runId === runId && this.child) {
            if (Date.now() - startedAt >= HEALTH_TIMEOUT_MS) {
                throw new Error("Tempo esgotado ao aguardar o servidor local.");
            }

            const healthy = await pingHealth(this.config.healthUrl);

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

    private clearPollTimer(): void {
        if (this.pollTimer === null) {
            return;
        }

        clearTimeout(this.pollTimer);
        this.pollTimer = null;
    }

    private setStatus(state: BackendStatus["state"], message: string): void {
        this.status = {
            state,
            message,
            healthUrl: this.config.healthUrl
        };

        for (const listener of this.listeners) {
            listener(this.getStatus());
        }
    }
}
