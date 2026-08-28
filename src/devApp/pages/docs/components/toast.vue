<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Toast
            </h1>

            <p>
                Notificações globais via plugin <code>$toast</code> (success, info, error, warning).
                O botão de fechar pode emitir <code>event</code> (string ou objeto), ouvido em qualquer sítio com <code>$toast.on</code>.
                <br> <br>
                O componente <code>&lt;Toast position="bottom" /&gt;</code> pode receber outras posições como <code>"top"</code>, <code>"left"</code>, <code>"right"</code>, <code>"top-left"</code>, <code>"top-right"</code>, <code>"bottom-left"</code>, <code>"bottom-right"</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Toast">
                <div class="p-4 flex flex-col gap-3">
                    <div class="flex flex-wrap gap-2">
                        <Button variant="success" @click="() => $toast.success('Ok')">
                            Success
                        </Button>

                        <Button variant="info" @click="() => $toast.info('Toast info')">
                            Info
                        </Button>

                        <Button variant="destructive" @click="() => $toast.error('Something went wrong')">
                            Error
                        </Button>

                        <Button variant="warning" @click="() => $toast.warning('This warning is a longer toast message')">
                            Warning
                        </Button>

                        <Button variant="secondary" @click="() => $toast.success('Mensagem do toast', { closeButton: 'OK' })">
                            Label custom
                        </Button>

                        <Button variant="secondary" @click="() => $toast.info('Sem botão', { closeButton: false })">
                            Sem fechar
                        </Button>

                        <Button variant="secondary" @click="() => $toast.success('Guardado.', { closeButton: 'Undo', event: 'undo' })">
                            Evento string
                        </Button>

                        <Button variant="secondary" @click="() => $toast.success('Guardado. Item 12', { closeButton: 'Undo', event: { action: 'undo', id: 12 } })">
                            Evento objeto
                        </Button>

                        <Button @click="() => $toast.clear()">
                            Clear all toasts
                        </Button>
                    </div>

                    <p class="text-sm text-muted-foreground">
                        Último evento ($toast.on):
                        <code class="text-foreground">{{ lastEventLabel }}</code>
                    </p>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import type { ToastEventPayload } from "@design/toast/toast";

export default defineComponent({
    name: "ComponentsToast",

    components: {
        Button
    },

    data() {
        return {
            lastEvent: null as ToastEventPayload | null,
            stopListening: null as (() => void) | null
        };
    },

    computed: {
        lastEventLabel() {
            if (this.lastEvent === null) {
                return "nenhum";
            }

            if (typeof this.lastEvent === "string") {
                return this.lastEvent;
            }

            return JSON.stringify(this.lastEvent);
        }
    },

    created() {
        this.stopListening = this.$toast.on((payload) => {
            this.lastEvent = payload;
        });
    },

    beforeUnmount() {
        if (this.stopListening !== null) {
            this.stopListening();
            this.stopListening = null;
        }
    }
});
</script>
