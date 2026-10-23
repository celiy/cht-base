/**
 * The Freedom Lab Electron main hook module
 * This module is responsible for the client IPC, switches and window tweaks of the desktop app.
 */

import { app, dialog, ipcMain } from "electron";
import type { BrowserWindow } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import type { ClientElectronContext } from "../../cht-base/electron/types";

// Top level runs before `app` is ready: the only moment Chromium switches apply.
app.commandLine.appendSwitch("enable-unsafe-webgpu");

const MAX_ENTRIES = 200;
const MAX_TEXT_BYTES = 64 * 1024;

let readyContext: ClientElectronContext | null = null;

/**
 * Lists a folder chosen by the user in the native dialog. The renderer never sends a path,
 * so it cannot read outside what the user picked.
 * @returns The folder and its entries, or null when cancelled
 */
async function pickFolder(): Promise<{ folder: string; entries: { name: string; dir: boolean }[] } | null> {
    const window = readyContext?.getMainWindow();
    const options = { properties: ["openDirectory" as const] };
    const result = window ? await dialog.showOpenDialog(window, options) : await dialog.showOpenDialog(options);
    const folder = result.filePaths[0];

    if (result.canceled || !folder) {
        return null;
    }

    const dirents = await fs.readdir(folder, { withFileTypes: true });

    return {
        folder,
        entries: dirents.slice(0, MAX_ENTRIES).map((entry) => ({ name: entry.name, dir: entry.isDirectory() }))
    };
}

/**
 * Writes then reads a file in userData, proving full Node fs in the main process.
 * @param text The text to persist
 * @returns The path and the text read back
 */
async function roundTrip(text: unknown): Promise<{ file: string; text: string }> {
    if (typeof text !== "string" || Buffer.byteLength(text) > MAX_TEXT_BYTES) {
        throw new Error("Texto inválido.");
    }

    const file = path.join(app.getPath("userData"), "freedom-lab.txt");

    await fs.writeFile(file, text, "utf8");

    return { file, text: await fs.readFile(file, "utf8") };
}

export function onReady(context: ClientElectronContext): void {
    readyContext = context;

    ipcMain.handle("lab:info", () => {
        const window = context.getMainWindow();

        return {
            client: context.client,
            isDev: context.isDev,
            electron: process.versions.electron,
            chrome: process.versions.chrome,
            webgpuSwitch: app.commandLine.hasSwitch("enable-unsafe-webgpu"),
            minSize: window ? window.getMinimumSize() : null
        };
    });

    ipcMain.handle("lab:pick-folder", () => pickFolder());
    ipcMain.handle("lab:round-trip", (_event, text: unknown) => roundTrip(text));
}

export function onWindow(window: BrowserWindow): void {
    window.setMinimumSize(900, 650);
}
