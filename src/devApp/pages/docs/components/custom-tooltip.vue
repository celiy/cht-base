<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Tooltip</h1>

            <p>Wrapper com um slot padrão, que é o alvo, e um slot <code>#tooltip</code>, com conteúdo livre. No hover ou no toque, o balão aparece junto do ponteiro e o segue com um pequeno atraso, controlado por <code>followMs</code>, que tem padrão <code>60</code>. Isso evita que ele trema. Ele é diferente da diretiva <code>v-tooltip</code>, de Fundamentos, porque aqui o conteúdo é Vue, e não uma string.</p>
        </section>

        <section>
            <h3>Uso</h3>

            <p>
                Envolva qualquer elemento. O wrapper é um <code>div</code>; nos charts cada barra ou
                ponto da onda já traz o seu.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Uso">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <Tooltip class="inline-block">
                        <Button>Passe o mouse</Button>

                        <template #tooltip> Segue o ponteiro </template>
                    </Tooltip>

                    <Tooltip class="inline-block">
                        <Button variant="secondary"> Conteúdo rico </Button>

                        <template #tooltip>
                            <div class="flex flex-col gap-1">
                                <span class="text-muted-foreground">Setembro</span>
                                <span>R$ 12.400</span>
                            </div>
                        </template>
                    </Tooltip>

                    <Tooltip class="inline-block">
                        <Badge
                            label="Reaberta"
                            variant="info"
                        />

                        <template #tooltip> OS reaberta neste mês </template>
                    </Tooltip>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Delay e follow</h3>

            <p><code>delay</code> é a espera até o balão aparecer. O padrão é <code>40</code> ms, e <code>0</code> mostra na hora. <code>followMs</code> é o atraso da animação que acompanha o mouse.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Delay e follow">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <Tooltip
                        class="inline-block"
                        :delay="0"
                    >
                        <Button variant="outline"> delay 0 </Button>

                        <template #tooltip> Aparece na hora </template>
                    </Tooltip>

                    <Tooltip
                        class="inline-block"
                        :follow-ms="160"
                    >
                        <Button variant="outline"> followMs 160 </Button>

                        <template #tooltip> Segue mais lento </template>
                    </Tooltip>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Animação</h3>

            <p>Por padrão o balão aparece e some sem animação. <code>animation</code> aceita <code>fade</code>, <code>scale</code>, <code>slide-up</code> e <code>slide-down</code>, usada tanto para aparecer quanto para sumir. <code>animationDuration</code> define a duração em ms, com padrão <code>150</code>. Com <code>prefers-reduced-motion</code>, toda animação vira <code>fade</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Animação">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <Tooltip
                        v-for="name in animations"
                        :key="name"
                        class="inline-block"
                        :animation="name"
                    >
                        <Button variant="outline">{{ name }}</Button>

                        <template #tooltip> animation="{{ name }}" </template>
                    </Tooltip>

                    <Tooltip
                        class="inline-block"
                        animation="scale"
                        :animation-duration="400"
                    >
                        <Button variant="outline"> scale 400 ms </Button>

                        <template #tooltip> Mais lento </template>
                    </Tooltip>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Nos charts</h3>

            <p>
                <code>BarChart</code> envolve cada barra; <code>WaveChart</code> envolve cada ponto.
                O conteúdo padrão é a data longa e o valor.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Nos charts">
                <div class="p-4">
                    <TableCharts
                        header="Barras com Tooltip"
                        description="Passe o mouse em cada barra"
                        variant="bars"
                        :data="{ label: 'Vendas', displayAs: 'currency', items: [{ value: 12, group: 'Mai' }, { value: 19, group: 'Jun' }, { value: 8, group: 'Jul' }, { value: 24, group: 'Ago' }] }"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Badge from "@design/components/Badge.vue";
import Button from "@design/components/Button.vue";
import TableCharts from "@design/components/custom/TableCharts.vue";
import Tooltip from "@design/components/custom/Tooltip.vue";

export default defineComponent({
    name: "ComponentsCustomTooltip",

    components: {
        Badge,
        Button,
        TableCharts,
        Tooltip
    },

    data() {
        return {
            animations: ["fade", "scale", "slide-up", "slide-down"] as const
        };
    }
});
</script>
