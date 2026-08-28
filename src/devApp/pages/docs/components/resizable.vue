<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Resizable
            </h1>

            <p>
                Container sem estilo próprio, com bordas arrastáveis.
                O cursor muda para resize; o tamanho nunca passa do pai
                nem dos limites <code>maxWidth</code> / <code>maxHeight</code>.
            </p>
        </section>

        <section>
            <h3>
                Todas as bordas
            </h3>

            <p>
                <code>resize="all"</code> (padrão) e <code>hover-border</code>
                para a borda <code>border-ring</code> no hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Todas as bordas">
                <div class="p-4">
                    <div class="relative h-72 overflow-hidden rounded border border-border bg-muted/30">
                        <Resizable
                            class="absolute top-6 left-6 bg-card p-4"
                            hover-border
                            :width="220"
                            :height="140"
                            :max-width="400"
                            :max-height="240"
                        >
                            <p class="text-sm">
                                Arraste qualquer borda ou canto.
                            </p>
                        </Resizable>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Isolar o resize
            </h3>

            <p>
                <code>resize</code> aceita um eixo
                (<code>horizontal</code> / <code>vertical</code>)
                ou um lado (<code>left</code> / <code>right</code> /
                <code>top</code> / <code>bottom</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Isolar o resize">
                <div class="p-4 grid gap-4 md:grid-cols-2">
                    <div class="relative h-48 overflow-hidden rounded border border-border bg-muted/30">
                        <Resizable
                            class="absolute top-4 left-4 bg-card p-3"
                            hover-border
                            resize="horizontal"
                            :width="180"
                            :height="112"
                            :max-width="320"
                        >
                            <p class="text-sm">
                                Só horizontal
                            </p>
                        </Resizable>
                    </div>

                    <div class="relative h-48 overflow-hidden rounded border border-border bg-muted/30">
                        <Resizable
                            class="absolute top-4 left-4 bg-card p-3"
                            hover-border
                            resize="right"
                            :width="180"
                            :height="112"
                            :max-width="320"
                        >
                            <p class="text-sm">
                                Só a borda direita
                            </p>
                        </Resizable>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Limite do container
            </h3>

            <p>
                Mesmo com <code>maxWidth</code> alto, o box não atravessa o pai.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Limite do container">
                <div class="p-4">
                    <div class="relative h-40 w-64 overflow-hidden rounded border border-border bg-muted/30">
                        <Resizable
                            class="absolute top-3 left-3 bg-card p-3"
                            hover-border
                            resize="all"
                            :width="140"
                            :height="88"
                            :max-width="800"
                            :max-height="800"
                        >
                            <p class="text-sm">
                                Pai 256×160
                            </p>
                        </Resizable>
                    </div>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Resizable from "@design/components/custom/Resizable.vue";

export default defineComponent({
    name: "ComponentsResizable",

    components: {
        Resizable
    }
});
</script>
