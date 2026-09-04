<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Charts
            </h1>

            <p>
                <code>TableCharts</code> envolve barras ou onda. Itens com <code>date</code> agrupam por mês; itens com <code>group</code> agregam na ordem da array (chave case-insensitive).
                A prop <code>color</code> escolhe o token <code>chart-1</code> … <code>chart-5</code> (padrão <code>chart-3</code>).
            </p>
        </section>

        <section>
            <h3>
                Cores
            </h3>

            <p>
                Tokens em <code>style.css</code> (<code>--color-chart-*</code>). Barras positivas usam <code>color</code>;
                negativas ficam em <code>chart-5</code>. A onda desenha a linha na cor escolhida e preenche abaixo dela
                com a mesma cor a 50% de opacidade.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cores">
                <div class="p-4">
                    <Tabs>
                        <template
                            v-for="(color, index) in chartPalette"
                            :key="`title-${color}`"
                            #[`tab-title-${index}`]
                        >
                            {{ color }}
                        </template>

                        <template
                            v-for="(color, index) in chartPalette"
                            :key="`content-${color}`"
                            #[`tab-content-${index}`]
                        >
                            <div class="grid grid-cols-1 gap-4 pt-2">
                                <TableCharts
                                    :header="`Barras ${color}`"
                                    :description="`color=&quot;${color}&quot;`"
                                    variant="bars"
                                    :data="yearBars"
                                    :hide-label="true"
                                    :color="color"
                                />

                                <TableCharts
                                    :header="`Onda ${color}`"
                                    description="Fill sólido a 50% abaixo da linha"
                                    variant="wave"
                                    :data="dailyWave"
                                    :color="color"
                                />
                            </div>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Por data
            </h3>

            <p>
                Barras somam por mês e ordenam cronologicamente. Onda usa cada ponto e o filtro de período.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 gap-4">
            <DocsExample label="Vendas no ano">
                <div class="p-4">
                    <TableCharts
                        header="Vendas no ano"
                        description="Doze meses, displayAs sum"
                        variant="bars"
                        :data="yearBars"
                        :hide-label="true"
                    />
                </div>
            </DocsExample>

            <DocsExample label="Saldo com negativos">
                <div class="p-4">
                    <TableCharts
                        header="Saldo com negativos"
                        description="Valores positivos e negativos, displayAs currency"
                        variant="bars"
                        :data="signedBars"
                    />
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Acessos diários">
                <div class="p-4">
                    <TableCharts
                        header="Acessos diários"
                        description="Onda com pontos ao longo de vários meses e filtro 3m / 1m / 2s / 7d"
                        variant="wave"
                        :data="dailyWave"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Por grupo
            </h3>

            <p>
                <code>{ value, group }</code>. <code>jan</code> e <code>Jan</code> somam; a label é a primeira ocorrência; a ordem é a da array.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 gap-4">
            <DocsExample label="Merge case-insensitive">
                <div class="p-4">
                    <TableCharts
                        header="Merge case-insensitive"
                        description="jan + Jan = 143, depois fev"
                        variant="bars"
                        :data="mergedGroups"
                    />
                </div>
            </DocsExample>

            <DocsExample label="Categorias">
                <div class="p-4">
                    <TableCharts
                        header="Categorias"
                        description="Grupos na ordem em que aparecem"
                        variant="bars"
                        :data="categoryBars"
                    />
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Onda por grupo">
                <div class="p-4">
                    <TableCharts
                        header="Onda por grupo"
                        description="Mesma agregação, sem filtro de período"
                        variant="wave"
                        :data="categoryWave"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on TableCharts.
import { defineComponent } from "vue";
import TableCharts from "@design/components/custom/TableCharts.vue";
import Tabs from "@design/components/Tabs.vue";
import { CHART_COLORS } from "@design/components/custom/charts/chartColors";

export default defineComponent({
    name: "ComponentsCharts",

    components: {
        TableCharts,
        Tabs
    },

    data() {
        return {
            chartPalette: [...CHART_COLORS],
            yearBars: {
                label: "Vendas",
                displayAs: "sum",
                items: [
                    { date: new Date(2023, 0, 1), value: 12 },
                    { date: new Date(2023, 0, 15), value: 8 },
                    { date: new Date(2023, 1, 1), value: 28 },
                    { date: new Date(2023, 2, 1), value: 24 },
                    { date: new Date(2023, 3, 1), value: 32 },
                    { date: new Date(2023, 4, 1), value: 30 },
                    { date: new Date(2023, 5, 1), value: 36 },
                    { date: new Date(2023, 6, 1), value: 22 },
                    { date: new Date(2023, 7, 1), value: 41 }
                ]
            },
            signedBars: {
                label: "Saldo",
                displayAs: "currency",
                items: [
                    { date: new Date(2023, 0, 1), value: -10 },
                    { date: new Date(2023, 1, 1), value: 26 },
                    { date: new Date(2023, 2, 1), value: 12 },
                    { date: new Date(2023, 3, 1), value: -32 },
                    { date: new Date(2023, 4, 1), value: 32 },
                    { date: new Date(2023, 5, 1), value: 42 }
                ]
            },
            dailyWave: {
                label: "Acessos",
                displayAs: "sum",
                items: [
                    { date: new Date(2023, 2, 1), value: 14 },
                    { date: new Date(2023, 2, 8), value: 18 },
                    { date: new Date(2023, 2, 15), value: 22 },
                    { date: new Date(2023, 2, 22), value: 17 },
                    { date: new Date(2023, 2, 29), value: 26 },
                    { date: new Date(2023, 3, 5), value: 20 },
                    { date: new Date(2023, 3, 12), value: 31 },
                    { date: new Date(2023, 4, 31), value: 29 },
                    { date: new Date(2023, 5, 7), value: 34 },
                    { date: new Date(2023, 5, 14), value: 16 },
                    { date: new Date(2023, 5, 21), value: 38 },
                    { date: new Date(2023, 5, 28), value: 25 }
                ]
            },
            mergedGroups: {
                label: "Vendas",
                displayAs: "sum",
                items: [
                    { value: 123, group: "jan" },
                    { value: 20, group: "Jan" },
                    { value: 123, group: "fev" }
                ]
            },
            categoryBars: {
                label: "Pedidos",
                displayAs: "sum",
                items: [
                    { value: 40, group: "Norte" },
                    { value: 12, group: "norte" },
                    { value: 28, group: "Sul" },
                    { value: 55, group: "Sudeste" },
                    { value: 18, group: "Nordeste" },
                    { value: 9, group: "Centro-Oeste" },
                    { value: 22, group: "Sul" }
                ]
            },
            categoryWave: {
                label: "Pedidos",
                displayAs: "sum",
                items: [
                    { value: 40, group: "Norte" },
                    { value: 12, group: "norte" },
                    { value: 28, group: "Sul" },
                    { value: 55, group: "Sudeste" },
                    { value: 18, group: "Nordeste" },
                    { value: 9, group: "Centro-Oeste" },
                    { value: 22, group: "Sul" }
                ]
            }
        };
    }
});
</script>
