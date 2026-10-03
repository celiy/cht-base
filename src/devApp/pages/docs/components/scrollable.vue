<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Scrollable</h1>

            <p>
                Container com barra vertical customizada via
                <a href="https://github.com/buzinas/simple-scrollbar">simple-scrollbar</a>.
                O host precisa de altura limitada (<code>h-48</code>,
                <code>max-h-*</code> ou flex com <code>min-h-0</code>). A biblioteca
                só desenha o eixo vertical: <code>side</code> é
                <code>right</code> (padrão) ou <code>left</code>.
            </p>
        </section>

        <section>
            <h3>Padrão</h3>

            <p>
                A barra aparece no hover. O conteúdo nativo continua a receber
                roda, teclado e arrasto.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Padrão">
                <div class="p-4">
                    <Scrollable class="h-48 rounded border">
                        <div class="flex flex-col gap-2 p-3">
                            <p
                                v-for="n in 16"
                                :key="n"

                                class="text-sm"
                            >
                                Linha {{ n }} — o painel tem altura fixa, o resto
                                desliza.
                            </p>
                        </div>
                    </Scrollable>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Lado</h3>

            <p>
                <code>side="left"</code> cola o thumb à esquerda sem inverter o
                texto.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Lado esquerdo">
                <div class="p-4">
                    <Scrollable
                        class="h-48 rounded border"
                        side="left"
                    >
                        <div class="flex flex-col gap-2 p-3">
                            <p
                                v-for="n in 12"
                                :key="n"

                                class="text-sm"
                            >
                                Conteúdo com a barra à esquerda ({{ n }}).
                            </p>
                        </div>
                    </Scrollable>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Cor e tamanho</h3>

            <p>
                <code>color</code> aceita qualquer cor CSS.
                <code>size</code> é a largura do thumb em pixels (padrão 9).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cor e tamanho">
                <div class="flex flex-col gap-4 p-4 md:flex-row">
                    <Scrollable
                        class="h-40 flex-1 rounded border"
                        color="var(--color-primary)"
                        :size="4"
                        always-visible
                    >
                        <div class="p-3 text-sm">
                            Thumb fino, cor <code>primary</code>, sempre visível.
                            <p
                                v-for="n in 10"
                                :key="n"
                            >
                                {{ n }}
                            </p>
                        </div>
                    </Scrollable>

                    <Scrollable
                        class="h-40 flex-1 rounded border"
                        color="var(--color-destructive)"
                        :size="14"
                        always-visible
                    >
                        <div class="p-3 text-sm">
                            Thumb largo, cor <code>destructive</code>.
                            <p
                                v-for="n in 10"
                                :key="n"
                            >
                                {{ n }}
                            </p>
                        </div>
                    </Scrollable>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scrollable from "@design/components/Scrollable.vue";

export default defineComponent({
    name: "ComponentsScrollable",

    components: {
        Scrollable
    }
});
</script>
