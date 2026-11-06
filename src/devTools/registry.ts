/**
 * The dev tools registry module
 * This module is responsible for the registry of the dev tools.
 */

import { reactive, ref } from "vue";

/** The dev tools option type */
export type DevToolsOption = {
    id?: string;
    label: string;
    icon?: string;
    run: () => void | Promise<void>;
};

/** The extra dev tools options */
export const extraDevToolsOptions = reactive<DevToolsOption[]>([]);

/** The DevToolsFab instance that renders; the first one created wins */
const activeFab = ref<symbol | null>(null);

/**
 * Claims the right to render the debug button, so it never shows twice
 * @param {symbol} id The instance id
 */
export function claimDevToolsFab(id: symbol): void {
    if (activeFab.value === null) {
        activeFab.value = id;
    }
}

/**
 * Releases the claim made by `claimDevToolsFab`
 * @param {symbol} id The instance id
 */
export function releaseDevToolsFab(id: symbol): void {
    if (activeFab.value === id) {
        activeFab.value = null;
    }
}

/**
 * Whether the instance is the one that renders the debug button
 * @param {symbol} id The instance id
 * @returns {boolean} True when the instance owns the button
 */
export function isDevToolsFabActive(id: symbol): boolean {
    return activeFab.value === id;
}

/**
 * Adds client-specific debug menu entries
 * @param {DevToolsOption[]} options The options to add
 * @returns {() => void} An unregister function
 */
export function registerDevToolsOptions(options: DevToolsOption[]): () => void {
    extraDevToolsOptions.push(...options);

    return () => {
        for (const option of options) {
            const index = extraDevToolsOptions.indexOf(option);

            if (index >= 0) {
                extraDevToolsOptions.splice(index, 1);
            }
        }
    };
}
