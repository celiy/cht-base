import { reactive } from "vue";

/** The dev tools option type */
export type DevToolsOption = {
    id?: string;
    label: string;
    icon?: string;
    run: () => void | Promise<void>;
};

/** The extra dev tools options */
export const extraDevToolsOptions = reactive<DevToolsOption[]>([]);

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
