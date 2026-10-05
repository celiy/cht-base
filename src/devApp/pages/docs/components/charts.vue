<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Charts</h1>

            <p>
                <code>TableCharts</code> envolve barras ou onda. Itens com <code>date</code> agrupam
                por mês; itens com <code>group</code> agregam na ordem da array (chave
                case-insensitive). A prop <code>color</code> aceita token de tema/Tailwind (<code
                    >chart-1</code
                >
                … <code>chart-5</code>, <code>green-500</code>, <code>success</code>, …; padrão
                <code>chart-3</code>). Em barras, <code>negativeColor</code> pinta valores negativos
                (padrão <code>chart-5</code>) e <code>direction</code> escolhe
                <code>vertical</code> / <code>horizontal</code>. Com <code>colorEnd</code> (e
                <code>negativeColorEnd</code>) cada barra é uma cor sólida no caminho da primeira
                até a última: a primeira usa <code>color</code>, a última usa <code>colorEnd</code>,
                as do meio misturam as duas. Um item pode ter <code>value</code> e
                <code>valueNegative</code> para desenhar as duas metades na mesma coluna. Cada barra
                e cada ponto da onda usam o componente <code>Tooltip</code> (Custom): o balão segue
                o ponteiro.
            </p>
        </section>

        <section>
            <h3>Cores</h3>

            <p>
                Tokens em <code>style.css</code> (<code>--color-chart-*</code>) ou qualquer cor do
                tema. Barras positivas usam <code>color</code>; negativas usam
                <code>negativeColor</code> (padrão <code>chart-5</code>). A onda desenha a linha na
                cor escolhida e preenche abaixo dela com a mesma cor a 50% de opacidade.
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
            <h3>Por data</h3>

            <p>
                Barras somam por mês e ordenam cronologicamente. Onda usa cada ponto e o filtro de
                período.
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
                        description="Valores positivos e negativos; negativeColor custom"
                        variant="bars"
                        :data="signedBars"
                        negative-color="destructive"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Degradê</h3>

            <p>
                <code>colorEnd</code> pinta a série da primeira barra até a última: cada barra é uma
                cor sólida no caminho entre <code>color</code> e <code>colorEnd</code> (vermelho →
                roxo → azul). Negativos usam <code>negativeColor</code> →
                <code>negativeColorEnd</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Degradê">
                <div class="p-4">
                    <TableCharts
                        header="Do vermelho ao azul"
                        description="cada barra é uma mistura sólida"
                        variant="bars"
                        color="red-500"
                        color-end="blue-500"
                        negative-color="orange-400"
                        negative-color-end="red-700"
                        :data="signedBars"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Conjunto</h3>

            <p>
                <code>valueNegative</code> desenha a barra de baixo na mesma coluna, sem precisar de
                um <code>value</code> negativo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Conjunto">
                <div class="p-4">
                    <TableCharts
                        header="Entradas e saídas juntas"
                        description="value + valueNegative"
                        variant="bars"
                        color="green-400"
                        color-end="green-700"
                        negative-color="orange-400"
                        negative-color-end="orange-700"
                        :data="dualBars"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Direção</h3>

            <p>
                <code>direction="vertical / horizontal"</code>. Horizontal cresce para a direita e
                não desenha valores negativos (ficam em 0).
            </p>

            <p>
                Na vertical as barras ficam agrupadas (largura máxima <code>5rem</code>, mínima
                <code>2rem</code> se a label for estreita) e não se espalham quando sobra espaço.
                <code>align="left / center / right"</code> posiciona o grupo (padrão
                <code>center</code>). Se as colunas não couberem, o gráfico ganha scroll horizontal.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Muitas barras / uma barra">
                <div class="grid gap-4 p-4 md:grid-cols-2">
                    <TableCharts
                        header="24 meses"
                        description="Scroll horizontal"
                        variant="bars"
                        :data="manyBars"
                    />

                    <TableCharts
                        header="Um mês"
                        description="Largura máxima"
                        variant="bars"
                        :data="singleBar"
                    />
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Barras horizontais">
                <div class="p-4">
                    <TableCharts
                        header="Categorias horizontais"
                        description='direction="horizontal"'
                        variant="bars"
                        direction="horizontal"
                        :data="categoryBars"
                        :hide-label="true"
                        color="success"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Clicável</h3>

            <p>
                <code>clickable</code> no <code>TableCharts</code> / <code>BarChart</code> aplica
                <code>cursor-pointer</code> e <code>brightness</code> no hover de cada barra, e
                emite <code>click:bar</code> com o ponto (incluindo <code>id</code> se o item
                tiver).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Barras clicáveis">
                <div class="p-4">
                    <TableCharts
                        header="Cliques por região"
                        description="Clique numa barra"
                        variant="bars"
                        clickable
                        :data="clickableBars"

                        @click:bar="lastClickedBar = $event.id || $event.dateLong"
                    />

                    <p class="mt-3 text-sm text-muted-foreground">
                        Último clique: {{ lastClickedBar || "nenhum" }}
                    </p>
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
            <h3>Por grupo</h3>

            <p>
                <code>{ value, group }</code>. <code>jan</code> e <code>Jan</code> somam; a label é
                a primeira ocorrência; a ordem é a da array.
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
    </article>
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
            dualBars: {
                label: "Fluxo",
                displayAs: "currency",
                items: [
                    { date: new Date(2023, 0, 1), value: 18, valueNegative: 10 },
                    { date: new Date(2023, 1, 1), value: 26, valueNegative: 8 },
                    { date: new Date(2023, 2, 1), value: 12, valueNegative: 20 },
                    { date: new Date(2023, 3, 1), value: 32, valueNegative: 14 },
                    { date: new Date(2023, 4, 1), value: 22, valueNegative: 22 },
                    { date: new Date(2023, 5, 1), value: 42, valueNegative: 16 }
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
            },
            lastClickedBar: "",
            clickableBars: {
                label: "OS",
                displayAs: "sum",
                items: [
                    { value: 4, group: "Seg", id: "2026-09-28" },
                    { value: 2, group: "Ter", id: "2026-09-29" },
                    { value: 6, group: "Qua", id: "2026-09-30" },
                    { value: 1, group: "Qui", id: "2026-10-01" }
                ]
            },
            manyBars: {
                label: "OS",
                displayAs: "sum",
                items: Array.from({ length: 24 }, (_, index) => ({
                    value: ((index * 7) % 11) + 1,
                    group: `${["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][index % 12]}/${25 + Math.floor(index / 12)}`
                }))
            },
            singleBar: {
                label: "OS",
                displayAs: "sum",
                items: [{ value: 3, group: "Out/26" }]
            }
        };
    }
});
</script>
