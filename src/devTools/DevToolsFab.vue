<template>
    <div
        v-if="showCorner && isActive"

        class="pointer-events-none fixed right-0 bottom-0 z-[1200] flex flex-col items-end"
    >
        <div
            class="flex items-end gap-1 p-4"
            :class="{ 'pb-1': versionsLabel }"
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
                            background-style="background-transparent"
                            hover-style="hover:bg-accent!"
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

        <a
            v-if="versionsLabel"

            v-tooltip="{
                content:
                    'Versão de cada dependência do CHT. A versão entre parênteses (local: x.x.x) é a versão atual no disco, a versão antes disso é a versão no arquivo version do cliente. <br /> <br /> Clique para ver mais.',
                html: true,
                placement: 'top'
            }"
            class="pointer-events-auto px-2 pb-0.5 text-right text-xs text-muted-foreground! no-underline! opacity-20 hover:text-foreground! hover:opacity-60"
            :href="versioningDocsUrl"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ versionsLabel }}
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    claimDevToolsFab,
    extraDevToolsOptions,
    isDevToolsFabActive,
    releaseDevToolsFab,
    type DevToolsOption
} from "./registry";
import RepoUpdatesFab from "./RepoUpdatesFab.vue";

export default defineComponent({
    name: "DevToolsFab",

    components: {
        RepoUpdatesFab
    },

    data() {
        return {
            fabId: Symbol("dev-tools-fab")
        };
    },

    computed: {
        /** Whether this instance is the one rendering the button */
        isActive(): boolean {
            return isDevToolsFabActive(this.fabId);
        },

        /** Whether the debug FAB is enabled */
        enabled(): boolean {
            return import.meta.env.DEV && import.meta.env.VITE_DEV_TOOLS === "true";
        },

        /**
         * Gets the repo updates enabled
         * @returns {unknown} The repo updates enabled
         */
        repoUpdatesEnabled(): boolean {
            return this.enabled && import.meta.env.VITE_REPO_UPDATE_NOTIFICATIONS === "true";
        },

        /**
         * Gets the show corner
         * @returns {unknown} The show corner
         */
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
         * Gets the core versions line, e.g. `cht-base 1.2.1 (local: 1.2.2)`: the pin in the
         * client version file, then the local repo version when it differs
         * @returns {string} The label, empty when there is no client
         */
        versionsLabel(): string {
            if (!this.enabled) {
                return "";
            }

            let rows: { repo: string; pinned: string | null; local: string | null }[] = [];

            try {
                rows = JSON.parse(import.meta.env.VITE_CORE_VERSIONS || "[]");
            } catch {
                return "";
            }

            return rows
                .map(({ repo, pinned, local }) => {
                    const label = `${repo} ${pinned ?? ""}`;

                    return local && local !== pinned ? `${label} (local: ${local})` : label;
                })
                .join(" - ");
        },

        /**
         * Gets the versioning docs URL
         * @returns {string} The versioning docs URL
         */
        versioningDocsUrl(): string {
            return this.docsUrl ? `${this.docsUrl}/versioning` : "";
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

    /**
     * Claims the button, so a second instance stays hidden
     * @returns {void}
     */
    created() {
        claimDevToolsFab(this.fabId);
    },

    /**
     * Releases the button
     * @returns {void}
     */
    beforeUnmount() {
        releaseDevToolsFab(this.fabId);
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
