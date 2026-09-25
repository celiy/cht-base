<template>
    <div
        v-if="showCorner"

        class="pointer-events-none fixed right-4 bottom-4 z-[1200] flex items-end gap-1"
    >
        <RepoUpdatesFab />

        <div
            v-if="enabled && menuOptions.length > 0"

            class="pointer-events-auto w-fit"
        >
            <Popover
                close-on-content-click
                hide-dropdown-arrow
                :min-width-px="220"
                panel-class="p-1"
            >
                <template #button="{ toggle, isOpen }">
                    <Button
                        variant="transparent"
                        shape="rounded"
                        aria-label="Modo dev"

                        @click.stop="toggle"
                    >
                        <i
                            class="fa-solid fa-bug text-sm"
                            :class="{ 'text-primary': isOpen }"
                        />
                    </Button>
                </template>

                <Option
                    v-for="(option, index) in menuOptions"
                    :key="option.id || option.label"

                    :first="index === 0"
                    :last="index === menuOptions.length - 1"
                    :label="option.label"
                    :icon="option.icon"
                    :value="option.id || option.label"

                    @click="runOption(option)"
                />
            </Popover>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { extraDevToolsOptions, type DevToolsOption } from "./registry";
import RepoUpdatesFab from "./RepoUpdatesFab.vue";

export default defineComponent({
    name: "DevToolsFab",

    components: {
        RepoUpdatesFab
    },

    computed: {
        /** Whether the debug FAB is enabled */
        enabled(): boolean {
            return import.meta.env.DEV && import.meta.env.VITE_DEV_TOOLS === "true";
        },

        repoUpdatesEnabled(): boolean {
            return (
                this.enabled
                && import.meta.env.VITE_REPO_UPDATE_NOTIFICATIONS === "true"
            );
        },

        showCorner(): boolean {
            return this.enabled || this.repoUpdatesEnabled;
        },

        /**
         * Gets the documentation URL
         * @returns {string} The documentation URL
         */
        docsUrl(): string {
            const base = (import.meta.env.VITE_DEVAPP_URL || "").replace(/\/$/, "");

            if (!base) {
                return "";
            }

            return `${base}/docs`;
        },

        /**
         * Gets the menu options
         * @returns {DevToolsOption[]} The menu options
         */
        menuOptions(): DevToolsOption[] {
            const options: DevToolsOption[] = [];

            if (this.docsUrl) {
                options.push({
                    id: "docs",
                    label: "Documentação",
                    icon: "fa-book",
                    run: () => {
                        window.open(this.docsUrl, "_blank", "noopener,noreferrer");
                    }
                });
            }

            for (const extra of extraDevToolsOptions) {
                options.push(extra);
            }

            return options;
        }
    },

    methods: {
        /**
         * Runs the option
         * @param {DevToolsOption} option The option to run
         */
        runOption(option: DevToolsOption) {
            void option.run();
        }
    }
});
</script>
