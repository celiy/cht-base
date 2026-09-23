import { reactive } from "vue";

export type DevToolsOption = {
    id?: string;
    label: string;
    icon?: string;
    run: () => void | Promise<void>;
};

export const extraDevToolsOptions = reactive<DevToolsOption[]>([]);

/**
 * Adds client-specific debug menu entries. Returns an unregister function.
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
