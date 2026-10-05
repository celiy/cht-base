<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Tooltip</h1>

            <p>
                Wrapper com slot padrão (o alvo) e <code>#tooltip</code> (conteúdo livre). No hover
                ou toque, o balão aparece junto do ponteiro e o segue com um atraso curto
                (<code>followMs</code>, padrão <code>60</code>) para não tremer. Distinto da
                diretiva <code>v-tooltip</code> em Fundamentos: aqui o conteúdo é Vue, não uma
                string.
            </p>
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

            <p>
                <code>delay</code> é a espera até aparecer (padrão <code>40</code> ms;
                <code>0</code> mostra na hora). <code>followMs</code> é o atraso da animação que
                acompanha o mouse.
            </p>
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
                        :data="chartData"
                        :hide-label="true"
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
            chartData: {
                label: "Vendas",
                displayAs: "currency" as const,
                items: [
                    { value: 12, group: "Mai" },
                    { value: 19, group: "Jun" },
                    { value: 8, group: "Jul" },
                    { value: 24, group: "Ago" }
                ]
            }
        };
    }
});
</script>
