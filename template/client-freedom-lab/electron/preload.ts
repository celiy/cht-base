/**
 * The Freedom Lab Electron preload hook module
 * This module is responsible for exposing the narrow labAPI bridge to the renderer.
 */

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("labAPI", {
    info: () => ipcRenderer.invoke("lab:info"),
    pickFolder: () => ipcRenderer.invoke("lab:pick-folder"),
    roundTrip: (text: string) => ipcRenderer.invoke("lab:round-trip", text)
});
