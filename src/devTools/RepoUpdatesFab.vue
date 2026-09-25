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
                    variant="transparent"
                    shape="rounded"
                    aria-label="Repositórios atualizados"

                    @click.stop="toggle"
                >
                    <span class="relative inline-flex">
                        <i
                            class="fa-solid fa-bell text-sm"
                            :class="{ 'text-primary': isOpen }"
                        />

                        <span
                            v-if="pending.length > 0"

                            class="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-semibold text-destructive-foreground"
                        >
                            {{ pending.length }}
                        </span>
                    </span>
                </Button>
            </template>

            <div class="flex max-h-60 min-w-[16rem] flex-col">
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

                <div class="border-t p-2">
                    <Button
                        variant="primary"
                        size="small"
                        label="Confirmar"
                        class="w-full"

                        @click="confirmSeen"
                    />
                </div>
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
    type RepoUpdate
} from "./repoUpdates";

export default defineComponent({
    name: "RepoUpdatesFab",

    data() {
        return {
            scanned: false,
            pending: [] as RepoUpdate[]
        };
    },

    computed: {
        enabled(): boolean {
            return (
                import.meta.env.DEV &&
                import.meta.env.VITE_DEV_TOOLS === "true" &&
                import.meta.env.VITE_REPO_UPDATE_NOTIFICATIONS === "true"
            );
        },

        /** Hide until scan finishes; then only if there are pending updates. */
        visible(): boolean {
            return this.scanned && this.pending.length > 0;
        }
    },

    mounted() {
        if (!this.enabled) {
            this.scanned = true;

            return;
        }

        void this.scan();
    },

    methods: {
        shortSha(sha: string): string {
            return sha.slice(0, 7);
        },

        async scan() {
            try {
                const remote = await fetchRepoUpdates();
                const dismissed = readDismissals();
                this.pending = filterPendingUpdates(remote, dismissed);
            } catch {
                this.pending = [];
            } finally {
                this.scanned = true;
            }
        },

        confirmSeen() {
            dismissRepoUpdates(this.pending);
            this.pending = [];
        }
    }
});
</script>
