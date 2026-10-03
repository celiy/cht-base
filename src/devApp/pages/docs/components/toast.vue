<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Toast</h1>

            <p>
                Notificações globais com <code>$toast</code>. O host é um único
                <code>&lt;Toast /&gt;</code> no layout (nos docs: <code>DevAppLayout</code>). Os
                métodos devolvem um <code>id</code> numérico.
            </p>
        </section>

        <section>
            <h3>Tipos</h3>

            <p>
                <code>success</code>, <code>info</code>, <code>error</code> e <code>warning</code>.
                Timeout por omissão: 4000&nbsp;ms (plugin).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        variant="success"

                        @click="() => $toast.success('Guardado.')"
                    >
                        Success
                    </Button>

                    <Button
                        variant="info"

                        @click="() => $toast.info('Ainda a sincronizar.')"
                    >
                        Info
                    </Button>

                    <Button
                        variant="destructive"

                        @click="() => $toast.error('Não foi possível guardar.')"
                    >
                        Error
                    </Button>

                    <Button
                        variant="warning"

                        @click="() => $toast.warning('Esta ação não tem volta.')"
                    >
                        Warning
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Botão de fechar</h3>

            <p>
                <code>closeButton</code>: <code>true</code> (label <code>Fechar</code>),
                <code>false</code> (só timeout/swipe) ou uma string com o texto do botão.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Botão de fechar">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        variant="secondary"

                        @click="() => $toast.success('Mensagem', { closeButton: 'OK' })"
                    >
                        Label custom
                    </Button>

                    <Button
                        variant="secondary"

                        @click="() => $toast.info('Some sozinho', { closeButton: false })"
                    >
                        Sem botão
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Timeout</h3>

            <p>
                <code>timeout</code> em milissegundos. <code>0</code> deixa o toast permanente (sem
                barra de progresso). Hover na pilha pausa todos os timeouts; swipe para o lado
                (touch) dispensa sem emitir <code>event</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Timeout">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        variant="secondary"

                        @click="() => $toast.info('1,5 s', { timeout: 1500 })"
                    >
                        1,5 s
                    </Button>

                    <Button
                        variant="secondary"

                        @click="() => $toast.warning('Fica até fechares.', { timeout: 0 })"
                    >
                        Persistente
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>id, dismiss e close</h3>

            <p>
                <code>dismiss(id)</code> remove sem evento. <code>close(id)</code> comporta-se como
                o botão Fechar (emite <code>event</code> se existir). <code>clear()</code> esvazia a
                pilha. No ecrã cabem 4 toasts; os mais antigos ficam por baixo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="id">
                <div class="flex flex-col gap-3 p-4">
                    <div class="flex flex-wrap gap-2">
                        <Button @click="spawnTracked"> Criar e guardar id </Button>

                        <Button
                            variant="secondary"

                            @click="dismissLast"
                        >
                            dismiss
                        </Button>

                        <Button
                            variant="secondary"

                            @click="closeLast"
                        >
                            close
                        </Button>

                        <Button @click="() => $toast.clear()"> clear </Button>
                    </div>

                    <p class="text-sm text-muted-foreground">
                        Último id:
                        <code class="text-foreground">{{ lastId ?? "nenhum" }}</code>
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>pause e resume</h3>

            <p>
                <code>pause(id)</code> / <code>resume(id)</code> num toast; <code>pauseAll</code> /
                <code>resumeAll</code> na pilha.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pausa">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        variant="secondary"

                        @click="
                            () =>
                                $toast.info('Pausa a pilha com os botões ao lado.', {
                                    timeout: 8000
                                })
                        "
                    >
                        Toast longo
                    </Button>

                    <Button
                        variant="secondary"

                        @click="() => $toast.pauseAll()"
                    >
                        pauseAll
                    </Button>

                    <Button
                        variant="secondary"

                        @click="() => $toast.resumeAll()"
                    >
                        resumeAll
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Evento no Fechar</h3>

            <p>
                <code>event</code> (string ou objeto) só corre no clique do botão ou em
                <code>$toast.close</code> — não no timeout nem no swipe. Escuta com
                <code>$toast.on</code> e cancela no unmount (o retorno é o unsubscribe).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Evento">
                <div class="flex flex-col gap-3 p-4">
                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant="secondary"

                            @click="
                                () =>
                                    $toast.success('Guardado.', {
                                        closeButton: 'Desfazer',
                                        event: 'undo'
                                    })
                            "
                        >
                            Evento string
                        </Button>

                        <Button
                            variant="secondary"

                            @click="
                                () =>
                                    $toast.success('Item 12', {
                                        closeButton: 'Desfazer',
                                        event: { action: 'undo', id: 12 }
                                    })
                            "
                        >
                            Evento objeto
                        </Button>
                    </div>

                    <p class="text-sm text-muted-foreground">
                        Último evento (<code>$toast.on</code>):
                        <code class="text-foreground">{{ lastEventLabel }}</code>
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Host: position e width</h3>

            <p>
                Props do <code>&lt;Toast /&gt;</code>, não de <code>$toast.*</code>. Um host por
                app. <code>position</code>: <code>top</code>, <code>bottom</code> (default),
                <code>left</code>, <code>right</code>, <code>top-left</code>,
                <code>top-right</code>, <code>bottom-left</code>, <code>bottom-right</code>.
                <code>width</code> default <code>20rem</code>. Timeout global:
                <code>app.use(toastPlugin, { timeout: 4000 })</code>.
            </p>
        </section>
    </article>
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
            lastId: null as number | null,
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
    },

    methods: {
        spawnTracked() {
            this.lastId = this.$toast.success("Toast com id guardado.", { timeout: 8000 });
        },

        dismissLast() {
            if (this.lastId === null) {
                return;
            }

            this.$toast.dismiss(this.lastId);
        },

        closeLast() {
            if (this.lastId === null) {
                return;
            }

            this.$toast.close(this.lastId);
        }
    }
});
</script>
