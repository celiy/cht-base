/// <reference types="vite/client" />
/// <reference types="@webgpu/types" />

/**
 * The Freedom Lab environment types module
 * This module is responsible for the ambient types of the client.
 */

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const component: DefineComponent<object, object, unknown>;
    export default component;
}

declare module "*.wasm" {
    export function add(a: number, b: number): number;
}

declare module "virtual:lab-info" {
    const info: { plugin: string; builtAt: string };
    export default info;
}

declare const __LAB_DEFINE__: string;

interface ImportMetaEnv {
    readonly VITE_LAB_GREETING?: string;
}

interface LabFolder {
    folder: string;
    entries: { name: string; dir: boolean }[];
}

interface LabAPI {
    info: () => Promise<{
        client: string;
        isDev: boolean;
        electron: string;
        chrome: string;
        webgpuSwitch: boolean;
        minSize: number[] | null;
    }>;
    pickFolder: () => Promise<LabFolder | null>;
    roundTrip: (text: string) => Promise<{ file: string; text: string }>;
}

interface Window {
    labAPI?: LabAPI;
    // File System Access API: Chromium only, so not in lib.dom yet.
    showOpenFilePicker?: () => Promise<FileSystemFileHandle[]>;
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle & AsyncIterable<[string, FileSystemHandle]>>;
}
