<template>
    <div
        v-if="enabled && visible"

        class="pointer-events-auto relative w-fit"
    >
        <Popover
            close-on-content-click
            hide-dropdown-arrow
            :min-width-px="280"
            panel-class="p-0"
        >
            <template #button="{ toggle, isOpen }">
                <Button
                    shape="rounded"
                    aria-label="Repositórios atualizados"
                    background-style="background-transparent"
                    hover-style="hover:bg-accent!"

                    @click.stop="toggle"
                >
                    <span class="relative inline-flex">
                        <i
                            class="fa-solid fa-bell text-sm"
                            :class="{ 'text-primary': isOpen }"
                        />

                        <span
                            v-if="badgeCount > 0"

                            class="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-semibold text-destructive-foreground"
                        >
                            {{ badgeCount }}
                        </span>
                    </span>
                </Button>
            </template>

            <div class="flex max-h-80 min-w-[16rem] flex-col">
                <div
                    v-if="versionMismatches.length > 0"

                    class="border-b"
                >
                    <small class="flex items-center gap-1 px-3 py-2">
                        Workspace com versões diferentes

                        <button
                            v-tooltip="workspaceVersionTooltip"
                            type="button"
                            class="inline-flex text-muted-foreground"
                            aria-label="O que significa este aviso de versões"

                            @click.stop
                        >
                            <i class="fa-solid fa-circle-info text-xs" />
                        </button>
                    </small>

                    <ul class="py-1">
                        <li
                            v-for="repo in versionMismatches"
                            :key="`ver-${repo.id}`"

                            class="flex flex-col gap-0.5 px-3 py-2 text-sm"
                        >
                            <small>
                                {{ repo.name }}
                            </small>

                            <span class="text-xs text-muted-foreground">
                                workspace {{ repo.expected }} · local
                                {{ repo.actual ?? "sem version" }}
                            </span>
                        </li>
                    </ul>
                </div>

                <template v-if="pending.length > 0">
                    <small class="border-b px-3 py-2"> Repos com commits remotos novos</small>

                    <ul class="flex-1 overflow-y-auto py-1">
                        <li
                            v-for="repo in pending"
                            :key="repo.id"

                            class="flex flex-col gap-0.5 px-3 py-2 text-sm"
                        >
                            <small>
                                {{ repo.name }}
                            </small>

                            <span class="text-xs text-muted-foreground">
                                {{ shortSha(repo.remoteSha) }}
                                · {{ repo.ahead }} commit{{ repo.ahead === 1 ? "" : "s" }} à frente
                            </span>
                        </li>
                    </ul>

                    <div class="flex flex-col gap-2 border-t p-2">
                        <Button
                            variant="primary"
                            size="small"
                            label="Confirmar"
                            class="w-full"

                            @click="confirmSeen"
                        />

                        <Tooltip class="inline-block">
                            <Button
                                variant="outline"
                                label="Atualizar"
                                class="w-full"
                                size="small"

                                @click="copyCommand"
                            />

                            <template #tooltip>
                                <div class="flex flex-col items-center gap-1">
                                    <span>Copiar comando de atualização</span>
                                    <small-muted class="text-xs"> npx chtmain install </small-muted>
                                </div>
                            </template>
                        </Tooltip>
                    </div>
                </template>
            </div>
        </Popover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    dismissRepoUpdates,
    fetchRepoUpdates,
    filterPendingUpdates,
    readDismissals,
    type RepoUpdate,
    type VersionMismatch
} from "./repoUpdates";

export default defineComponent({
    name: "RepoUpdatesFab",

    data() {
        return {
            scanned: false,
            pending: [] as RepoUpdate[],
            versionMismatches: [] as VersionMismatch[]
        };
    },

    computed: {
        /**
         * Gets the enabled status
         * @returns {unknown} The enabled status
         */
        enabled(): boolean {
            return (
                import.meta.env.DEV &&
                import.meta.env.VITE_DEV_TOOLS === "true" &&
                import.meta.env.VITE_REPO_UPDATE_NOTIFICATIONS === "true"
            );
        },

        /**
         * Gets the badge count
         * @returns {unknown} The badge count
         */
        badgeCount(): number {
            return this.pending.length + this.versionMismatches.length;
        },

        /** Hide until scan finishes; then only if there is something to show. */
        visible(): boolean {
            return this.scanned && this.badgeCount > 0;
        },

        /**
         * Gets the workspace version tooltip
         * @returns {unknown} The workspace version tooltip
         */
        workspaceVersionTooltip() {
            return {
                content: [
                    "<div><b>O que é este aviso</b></div>",
                    "<div>A workspace (cht-main) declara no ficheiro version quais versões das repos principais precisa para funcionar: cht-shared, cht-base e cht-design-system.</div>",
                    '<div style="margin-top:0.4rem"><b>O que significa</b></div>',
                    "<div>Uma dessas pastas no disco tem um número diferente do que o cht-main pede — ou ainda não tem ficheiro version. Não é um update do GitHub: é só o que está neste computador agora.</div>",
                    '<div style="margin-top:0.4rem"><b>Como funciona</b></div>',
                    "<div>A comparação é local. Clientes e backends não entram. O aviso fica até os números coincidirem. Confirmar nos commits remotos não esconde isto.</div>",
                    '<div style="margin-top:0.4rem"><b>O que fazer</b></div>',
                    "<div>Se a mudança foi de propósito, atualiza a linha dessa repo no version do cht-main. Se a workspace devia ficar na versão pedida, alinha o version (ou o checkout) da pasta local.</div>"
                ].join(""),
                html: true,
                placement: "left" as const,
                maxWidth: "22rem"
            };
        }
    },

    /**
     * Mounts the component
     * @returns {void}
     */
    mounted() {
        if (!this.enabled) {
            this.scanned = true;

            return;
        }

        void this.scan();
    },

    methods: {
        /**
         * Copy install command
         * @returns {void}
         */
        copyCommand() {
            const command = "npx chtmain install";

            navigator.clipboard.writeText(command).then(
                () => {
                    this.$toast.success("Comando copiado para a área de transferência");
                },
                () => {
                    this.$toast.error("Falha ao copiar o comando");
                }
            );
        },

        /**
         * Short sha
         * @param {string} sha The sha
         * @returns {string} The short sha
         */
        shortSha(sha: string): string {
            return sha.slice(0, 7);
        },

        /**
         * Scan for updates
         * @returns {void}
         */
        async scan() {
            try {
                const payload = await fetchRepoUpdates();
                const dismissed = readDismissals();
                this.pending = filterPendingUpdates(payload.updates, dismissed);
                this.versionMismatches = payload.versionMismatches;
            } catch {
                this.pending = [];
                this.versionMismatches = [];
            } finally {
                this.scanned = true;
            }
        },

        /**
         * Confirm seen
         * @returns {void}
         */
        confirmSeen() {
            dismissRepoUpdates(this.pending);
            this.pending = [];
        }
    }
});
</script>
