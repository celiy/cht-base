/**
 * The Freedom Lab checks module
 * This module is responsible for the self-checks shown on the home page.
 */

import labInfo from "virtual:lab-info";
import { add } from "@lab/add.wasm";

export interface LabCheck {
    id: string;
    label: string;
    ok: boolean;
    detail: string;
}

/**
 * Runs a check and turns a throw into a failed result.
 * @param id Stable id used by automated tests
 * @param label UI label
 * @param run Returns the detail when ok, throws otherwise
 * @returns The result
 */
async function check(id: string, label: string, run: () => Promise<string> | string): Promise<LabCheck> {
    try {
        return { id, label, ok: true, detail: await run() };
    } catch (error) {
        return { id, label, ok: false, detail: error instanceof Error ? error.message : String(error) };
    }
}

/**
 * Throws when the condition is false.
 * @param condition The condition
 * @param message The failure message
 */
function expect(condition: boolean, message: string): void {
    if (!condition) {
        throw new Error(message);
    }
}

/**
 * Counts primes up to `limit` in a module worker.
 * @param limit Upper bound
 * @returns The count
 */
function countPrimesInWorker(limit: number): Promise<number> {
    const worker = new Worker(new URL("./primes.worker.ts", import.meta.url), { type: "module" });

    return new Promise<number>((resolve, reject) => {
        worker.onmessage = (event: MessageEvent<number>) => {
            resolve(event.data);
        };
        worker.onerror = (event) => {
            reject(new Error(event.message || "worker falhou"));
        };
        worker.postMessage(limit);
    }).finally(() => {
        worker.terminate();
    });
}

/**
 * Runs every check that does not need user interaction.
 * @returns The results, in display order
 */
export function runLabChecks(): Promise<LabCheck[]> {
    return Promise.all([
        check("vite-plugin", "Plugin Vite do cliente (módulo virtual)", () => {
            expect(labInfo.plugin === "freedom-lab", "módulo virtual ausente");

            return `build ${labInfo.builtAt}`;
        }),
        check("vite-define", "define do cliente", () => {
            expect(__LAB_DEFINE__ === "define do cliente", "define ausente");

            return __LAB_DEFINE__;
        }),
        check("html", "index.html transformado pelo cliente", () => {
            expect(document.documentElement.lang === "pt-BR", `lang=${document.documentElement.lang}`);
            expect(Boolean(document.querySelector("meta[name=theme-color]")), "meta theme-color ausente");

            return "lang=pt-BR + meta theme-color";
        }),
        check("env", ".env do cliente (VITE_*)", () => {
            const greeting = import.meta.env.VITE_LAB_GREETING;
            const leaked = (import.meta.env as Record<string, unknown>).LAB_PRIVATE_TOKEN;

            expect(Boolean(greeting), "VITE_LAB_GREETING ausente");
            expect(leaked === undefined, "chave sem VITE_ vazou");

            return `${greeting}; LAB_PRIVATE_TOKEN não exposto`;
        }),
        check("public", "public/ do cliente", async () => {
            const response = await fetch(`${import.meta.env.BASE_URL}data/lab.json`);
            const data = (await response.json()) as { ok?: boolean };

            expect(data.ok === true, "lab.json inválido");

            return `${import.meta.env.BASE_URL}data/lab.json`;
        }),
        check("wasm", "WASM via vite-plugin-wasm", () => {
            const result = add(2, 3);

            expect(result === 5, `add(2,3)=${result}`);

            return "add(2, 3) = 5";
        }),
        check("worker", "Web Worker (módulo)", async () => {
            const count = await countPrimesInWorker(100000);

            expect(count === 9592, `contou ${count}`);

            return `${count} primos até 100000`;
        }),
        check("webgpu", "WebGPU disponível", async () => {
            expect("gpu" in navigator, "navigator.gpu ausente");

            const adapter = await navigator.gpu.requestAdapter();

            expect(Boolean(adapter), "sem adapter");

            return adapter?.info.vendor || adapter?.info.architecture || "adapter ok";
        }),
        check("opfs", "OPFS (disco privado do navegador)", async () => {
            const root = await navigator.storage.getDirectory();
            const handle = await root.getFileHandle("freedom-lab.txt", { create: true });
            const writable = await handle.createWritable();
            const stamp = new Date().toISOString();

            await writable.write(stamp);
            await writable.close();

            const text = await (await handle.getFile()).text();

            expect(text === stamp, "conteúdo diferente");

            return "escreveu e leu freedom-lab.txt";
        }),
        check("electron", "Ponte Electron do cliente (labAPI)", async () => {
            if (!window.labAPI) {
                return "fora do Electron (ignorado)";
            }

            const info = await window.labAPI.info();
            const written = await window.labAPI.roundTrip("ok");

            expect(info.webgpuSwitch, "switch WebGPU ausente");
            expect(info.minSize?.[0] === 900, `minSize=${String(info.minSize)}`);
            expect(written.text === "ok", "roundTrip falhou");

            return `Electron ${info.electron}, fs em ${written.file}`;
        })
    ]);
}
