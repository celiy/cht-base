/**
 * The electron types module
 * This module is responsible for the types of the electron app.
 */

import type { BackendStatus, ElectronAPI } from "../../electron/types";

declare global {
    interface Window {
        electronAPI?: ElectronAPI;
    }
}

export type { BackendStatus, ElectronAPI };
