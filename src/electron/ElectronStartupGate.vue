<template>
    <div class="relative min-h-dvh">
        <slot />

        <Transition name="electron-startup-fade">
            <div
                v-if="showOverlay"

                class="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-background px-6"
                role="status"
                aria-live="polite"
            >
                <div class="w-10 shrink-0">
                    <ProgressBar
                        v-if="!isError"

                        variant="circular"
                        size="small"
                        loading
                    />

                    <i
                        v-else

                        class="fa-solid fa-triangle-exclamation text-2xl text-destructive"
                    />
                </div>

                <div class="flex max-w-md flex-col items-center gap-2 text-center">
                    <p class="text-lg font-medium text-foreground">
                        {{ heading }}
                    </p>

                    <p class="text-sm text-muted-foreground">
                        {{ statusMessage }}
                    </p>
                </div>

                <Button
                    v-if="isError"

                    variant="primary"
                    label="Tentar novamente"

                    @click="retry"
                />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { project } from "../project";

const STATUS_HINTS = [
    "Iniciando serviços locais...",
    "Preparando o banco de dados...",
    "Conectando ao servidor..."
];

export default defineComponent({
    name: "ElectronStartupGate",

    data() {
        return {
            hintIndex: 0,
            hintTimer: null as ReturnType<typeof setInterval> | null
        };
    },

    computed: {
        isElectron(): boolean {
            return project.electron.isElectron;
        },

        hasBackend(): boolean {
            return project.electron.hasBackend;
        },

        backendReady(): boolean {
            return project.electron.backendReady;
        },

        isError(): boolean {
            return project.electron.backendStatus === "error";
        },

        showOverlay(): boolean {
            if (!this.isElectron || !this.hasBackend) {
                return false;
            }

            return !this.backendReady;
        },

        heading(): string {
            if (this.isError) {
                return "Não foi possível iniciar o servidor local";
            }

            return this.$project.labels.siteTitle || "Carregando";
        },

        statusMessage(): string {
            if (this.isError) {
                return project.electron.backendMessage || "Verifique os logs e tente novamente.";
            }

            return project.electron.backendMessage || STATUS_HINTS[this.hintIndex] || "Iniciando serviços locais...";
        }
    },

    watch: {
        showOverlay: {
            handler(visible: boolean) {
                if (visible && !this.isError) {
                    this.startHintTimer();
                    return;
                }

                this.stopHintTimer();
            },
            immediate: true
        },

        isError(error: boolean) {
            if (error) {
                this.stopHintTimer();
            } else if (this.showOverlay) {
                this.startHintTimer();
            }
        }
    },

    mounted() {
        if (this.showOverlay && !this.isError) {
            this.startHintTimer();
        }
    },

    unmounted() {
        this.stopHintTimer();
    },

    methods: {
        startHintTimer() {
            if (this.hintTimer !== null) {
                return;
            }

            this.hintTimer = setInterval(() => {
                this.hintIndex = (this.hintIndex + 1) % STATUS_HINTS.length;
            }, 1800);
        },

        stopHintTimer() {
            if (this.hintTimer === null) {
                return;
            }

            clearInterval(this.hintTimer);
            this.hintTimer = null;
        },

        retry() {
            void window.electronAPI?.retryBackend();
        }
    }
});
</script>

<style scoped>
.electron-startup-fade-enter-active,
.electron-startup-fade-leave-active {
    transition: opacity 0.2s ease;
}

.electron-startup-fade-enter-from,
.electron-startup-fade-leave-to {
    opacity: 0;
}
</style>
