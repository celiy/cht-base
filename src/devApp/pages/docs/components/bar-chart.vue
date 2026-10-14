<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Bar chart</h1>

            <p>
                <code>BarChart</code> desenha barras verticais ou horizontais.
                <code>TableCharts</code> com <code>variant="bars"</code> envolve o gráfico num card
                com título e descrição e repassa todas as outras props, eventos e o slot
                <code>#label</code>.
            </p>

            <p>
                <code>data</code> recebe uma série (<code>ChartSeries</code>) ou várias
                (<code>ChartSeries[]</code>). Cada série tem <code>label</code>,
                <code>items</code> e, opcionalmente, <code>color</code>,
                <code>displayAs</code> (<code>"currency"</code> ou <code>"sum"</code>) e
                <code>key</code>. Itens com <code>date</code> somam por mês; itens com
                <code>group</code> somam por grupo, na ordem em que aparecem. As séries são
                alinhadas pelas mesmas categorias.
            </p>

            <p>
                Na primeira vez que aparece na tela, as barras sobem uma a uma. Quando os dados
                mudam, elas animam até o novo tamanho. <code>animated</code> desliga as duas
                animações, que também não rodam com "reduzir movimento" do sistema.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Básico">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Bar Chart"
                        description="Janeiro a junho de 2024"
                        :data="desktop"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Formato do data</h3>

            <p>
                <code>data</code> é um objeto <code>ChartSeries</code> ou uma lista deles. Cada
                série tem <code>label</code> (nome na legenda e no tooltip), <code>items</code> (os
                valores) e, opcionalmente, <code>color</code>, <code>displayAs</code> (<code
                    >"currency"</code
                >
                ou <code>"sum"</code>) e <code>key</code>. Cada item tem <code>value</code> e uma
                posição: <code>date</code> (soma por mês) ou <code>group</code> (soma por grupo, na
                ordem em que aparece). Os campos opcionais de item são <code>valueNegative</code>,
                <code>color</code>, <code>id</code> (enviado no <code>click:bar</code>) e
                <code>highlight</code>.
            </p>

            <DocsCode
                language="ts"
                :code="barDataExample"
            />
        </section>

        <section>
            <h3>Várias séries</h3>

            <p>
                Com várias séries, cada categoria mostra uma barra por série, lado a lado. O tooltip
                lista todas, com a cor de cada uma. <code>legend</code> mostra a legenda.
                <code>stack="stacked"</code> empilha as séries e <code>stack="expanded"</code>
                mostra a fatia de cada uma em 100%.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 gap-4">
            <DocsExample label="Lado a lado">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Multiple"
                        description="Desktop e Mobile"
                        :data="[desktop, mobile]"
                        legend
                    />
                </div>
            </DocsExample>

            <DocsExample label="Empilhadas">
                <div class="flex flex-col gap-4 p-4">
                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Stacked"
                        description='stack="stacked"'
                        :data="[desktop, mobile, other]"
                        stack="stacked"
                        legend
                    />

                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Expanded"
                        description='stack="expanded"'
                        :data="[desktop, mobile, other]"
                        stack="expanded"
                        legend
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Labels</h3>

            <p>
                <code>showLabels</code> escreve o valor na ponta de cada barra (o total, quando
                empilhadas). <code>labelClass</code> substitui o estilo padrão do label (<code
                    >text-xs font-medium text-foreground</code
                >); a cor da barra fica em <code>--chart-color</code>, então
                <code>text-(--chart-color)</code> pinta o label com ela. O slot
                <code>#label</code> troca o conteúdo e recebe
                <code>{ value, formatted, category, series, color }</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Labels">
                <div class="flex flex-col gap-4 p-4">
                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Label"
                        description="showLabels"
                        :data="desktop"
                        show-labels
                    />

                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Negative"
                        description="Slot #label com o nome do mês"
                        :data="balance"
                        color="chart-2"
                        negative-color="chart-4"
                        show-labels
                        label-class="text-xs font-medium text-(--chart-color)"
                        hide-axis-labels
                    >
                        <template #label="{ category }">
                            {{ category.long.split(" ")[0] }}
                        </template>
                    </TableCharts>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Cores e negativos</h3>

            <p>
                <code>color</code> é o token da primeira série; as demais sem cor seguem a paleta
                <code>chart-1</code> … <code>chart-5</code>. Um item com <code>color</code> pinta só
                a sua barra. Com uma série só: <code>negativeColor</code> pinta os valores negativos
                e <code>colorEnd</code> / <code>negativeColorEnd</code> misturam as cores da
                primeira até a última barra.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Degradê e negativos">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Saldo"
                        description="colorEnd e negativeColorEnd"
                        :data="balance"
                        color="green-400"
                        color-end="green-700"
                        negative-color="orange-400"
                        negative-color-end="red-700"
                        show-labels
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Destaque</h3>

            <p>Um item com <code>highlight: true</code> ganha borda tracejada na cor da barra.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Destaque">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Bar Chart - Active"
                        description="Firefox com highlight"
                        :data="browsers"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanhos</h3>

            <p>
                <code>barSize</code> fixa a espessura de cada barra em px; sem ele, as barras
                dividem a largura (até 80px). <code>barGap</code> é o espaço entre as barras de uma
                categoria e <code>groupGap</code>, entre categorias. Com <code>barSize</code>,
                <code>align</code> (<code>left</code> / <code>center</code> / <code>right</code>)
                posiciona as barras quando sobra espaço; se não couberem, o gráfico rola na
                horizontal.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanhos">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Barras finas"
                        description="barSize 14, barGap 2, groupGap 32, align center"
                        :data="[desktop, mobile]"
                        :bar-size="14"
                        :bar-gap="2"
                        :group-gap="32"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Horizontal</h3>

            <p>
                <code>direction="horizontal"</code> cresce para a direita, com as mesmas opções
                (séries, empilhamento, negativos e labels). <code>barSize</code> é a altura da barra
                (padrão 32px).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Horizontal">
                <div class="p-4">
                    <TableCharts
                        variant="bars"
                        header="Navegadores"
                        description='direction="horizontal"'
                        direction="horizontal"
                        :data="browsers"
                        show-labels
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Clique e dados ao vivo</h3>

            <p>
                <code>clickable</code> emite <code>click:bar</code> com
                <code>{ id, value, category, series }</code>. Trocar <code>data</code> anima as
                barras até os novos valores.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Clique e atualização">
                <div class="flex flex-col gap-3 p-4">
                    <div class="flex flex-wrap items-center gap-3">
                        <Button
                            label="Atualizar dados"
                            left-icon="fa-rotate"

                            @click="live = [randomize(live[0]), randomize(live[1])]"
                        />

                        <small-muted>{{ clicked }}</small-muted>
                    </div>

                    <TableCharts
                        variant="bars"
                        header="Ao vivo"
                        description="Clique numa barra"
                        :data="live"
                        clickable
                        legend

                        @click:bar="
                            clicked = `${$event.series.label} · ${$event.category.long}: ${$event.value}`
                        "
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on TableCharts.
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import DocsCode from "../../../components/DocsCode.vue";
import TableCharts from "@design/components/custom/TableCharts.vue";
import {
    balanceSeries,
    browserSeries,
    desktopSeries,
    mobileSeries,
    otherSeries,
    randomize
} from "../../../ts/chartDemoData";

export default defineComponent({
    name: "ComponentsBarChart",

    components: {
        Button,
        DocsCode,
        TableCharts
    },

    data() {
        return {
            barDataExample: `const data: ChartSeries[] = [
    {
        label: "Desktop",
        color: "chart-2",
        displayAs: "sum",
        items: [
            { date: new Date(2024, 0, 1), value: 186, valueNegative: 40 },
            { date: new Date(2024, 1, 1), value: 305, id: "2024-02" },
            { date: new Date(2024, 2, 1), value: 237 }
        ]
    },
    {
        label: "Mobile",
        items: [
            { group: "Chrome", value: 80, color: "chart-4", highlight: true },
            { group: "Safari", value: 200 }
        ]
    }
];`,
            desktop: desktopSeries,
            mobile: mobileSeries,
            other: otherSeries,
            browsers: browserSeries,
            balance: balanceSeries,
            live: [desktopSeries, mobileSeries],
            clicked: "Nenhuma barra clicada"
        };
    },

    methods: {
        randomize
    }
});
</script>
