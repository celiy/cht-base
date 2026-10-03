<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>ViewportCenter</h1>

            <p>
                Teleporta o slot para o <code>body</code> e centra-o no viewport com
                <code>$project.device.viewportWidth</code> / <code>viewportHeight</code>. O
                wrapper tem <code>pointer-events-none</code>: filhos clicáveis precisam de
                <code>pointer-events-auto</code>. Sem props.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Centro">
                <div class="p-4">
                    <Button
                        :label="showCenter ? 'Esconder' : 'Mostrar no centro'"

                        @click="showCenter = !showCenter"
                    />

                    <ViewportCenter v-if="showCenter">
                        <div
                            class="pointer-events-auto rounded border bg-card px-4 py-3 shadow-sm"
                        >
                            <p class="font-medium">No meio do ecrã</p>

                            <p class="mt-1 text-sm text-muted-foreground">
                                Segue o tamanho da janela. Não usa o centro do artigo.
                            </p>
                        </div>
                    </ViewportCenter>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import ViewportCenter from "@design/components/ViewportCenter.vue";

export default defineComponent({
    name: "ComponentsViewportCenter",

    components: {
        Button,
        ViewportCenter
    },

    data() {
        return {
            showCenter: false
        };
    }
});
</script>
