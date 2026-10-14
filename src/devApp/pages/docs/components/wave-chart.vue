<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Wave chart</h1>

            <p>
                <code>WaveChart</code> desenha linhas ou áreas. <code>TableCharts</code> com
                <code>variant="wave"</code> envolve o gráfico num card e, com dados por data, mostra
                o filtro de período (3 meses, 1 mês, 2 semanas, 7 dias).
            </p>

            <p>
                <code>data</code> recebe uma série ou várias, no mesmo formato do
                <a href="/docs/components/bar-chart">Bar chart</a>. Itens com
                <code>date</code> viram um ponto por dia (<code>bucket="month"</code> agrupa por
                mês); itens com <code>group</code>, um ponto por grupo. Passar o ponteiro mostra uma
                bolinha em cada série e o tooltip com todos os valores daquele ponto.
            </p>

            <p>
                Na primeira vez que aparece na tela, cada linha é desenhada do início ao fim e o
                fundo surge depois. Quando os valores mudam, as linhas se movem até o novo estado;
                quando as séries ou as datas mudam, o gráfico é redesenhado.
            </p>
        </section>

        <section>
            <h3>Formato do data</h3>

            <p>
                Mesmo formato do Bar chart: um <code>ChartSeries</code> ou uma lista. Cada item tem
                <code>value</code> e <code>date</code> (um ponto por dia) ou <code>group</code> (um
                ponto por grupo). Itens sem <code>date</code> nem <code>group</code> são ignorados.
                Séries com várias datas se alinham pelas mesmas categorias.
            </p>

            <DocsCode
                language="ts"
                :code="waveDataExample"
            />
        </section>

        <section>
            <h3>Tipos de curva</h3>

            <p>
                <code>type</code>: <code>smooth</code> (padrão, nunca passa dos valores),
                <code>linear</code> ou <code>step</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
                    <TableCharts
                        v-for="curve in curves"
                        :key="curve"

                        variant="wave"
                        bucket="month"
                        :header="`Area Chart - ${curve}`"
                        :description="`type=&quot;${curve}&quot;`"
                        :data="desktop"
                        :type="curve"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estilo</h3>

            <p>
                <code>waveStyle="solid"</code> (padrão) preenche abaixo da linha: cor sólida no tema
                simplicia e degradê no tema hodiernus. <code>waveStyle="line"</code> desenha só a
                linha.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estilo">
                <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Area Chart"
                        description='waveStyle="solid"'
                        :data="[desktop, mobile]"
                        legend
                    />

                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Line Chart"
                        description='waveStyle="line"'
                        :data="[desktop, mobile]"
                        wave-style="line"
                        legend
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Várias séries</h3>

            <p>
                Com <code>stack="none"</code> (padrão) as áreas se sobrepõem a partir do zero.
                <code>stack="stacked"</code> empilha as séries e <code>stack="expanded"</code>
                mostra a fatia de cada uma em 100%. Cada série pode ter seu
                <code>displayAs</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Empilhadas">
                <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Area Chart - Stacked"
                        description='stack="stacked"'
                        :data="[other, mobile, desktop]"
                        stack="stacked"
                        legend
                    />

                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Area Chart - Stacked Expanded"
                        description='stack="expanded"'
                        :data="[other, mobile, desktop]"
                        stack="expanded"
                        legend
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Pontos e labels</h3>

            <p>
                <code>dots</code> mostra uma bolinha em cada ponto, na cor do item ou da série.
                <code>showLabels</code> escreve o valor acima de cada ponto; o slot
                <code>#label</code> e <code>labelClass</code> funcionam como no Bar chart.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pontos e labels">
                <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Line Chart - Label"
                        description="dots + showLabels"
                        :data="desktop"
                        wave-style="line"
                        dots
                        show-labels
                    />

                    <TableCharts
                        variant="wave"
                        header="Line Chart - Custom Label"
                        description="Slot #label com o nome do grupo"
                        :data="browsers"
                        wave-style="line"
                        type="linear"
                        dots
                        show-labels
                        hide-axis-labels
                    >
                        <template #label="{ category }">
                            {{ category.short }}
                        </template>
                    </TableCharts>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Por data e ao vivo</h3>

            <p>
                Dados diários usam o filtro de período do card (<code>filter</code> no
                <code>WaveChart</code>: <code>all</code>, <code>3m</code>, <code>1m</code>,
                <code>2s</code>, <code>7d</code>). Se houver mais pontos do que cabem na largura,
                eles são espaçados por igual.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 gap-4">
            <DocsExample label="Por data">
                <div class="p-4">
                    <TableCharts
                        variant="wave"
                        header="Acessos"
                        description="Um ponto a cada três dias"
                        :data="daily"
                    />
                </div>
            </DocsExample>

            <DocsExample label="Ao vivo">
                <div class="flex flex-col gap-3 p-4">
                    <Button
                        class="w-fit"
                        label="Atualizar dados"
                        left-icon="fa-rotate"

                        @click="live = [randomize(live[0]), randomize(live[1])]"
                    />

                    <TableCharts
                        variant="wave"
                        bucket="month"
                        header="Ao vivo"
                        description="As linhas se movem até os novos valores"
                        :data="live"
                        legend
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
    browserSeries,
    dailySeries,
    desktopSeries,
    mobileSeries,
    otherSeries,
    randomize
} from "../../../ts/chartDemoData";

export default defineComponent({
    name: "ComponentsWaveChart",

    components: {
        Button,
        DocsCode,
        TableCharts
    },

    data() {
        return {
            waveDataExample: `const data: ChartSeries = {
    label: "Acessos",
    displayAs: "sum",
    items: [
        { date: new Date(2024, 2, 1), value: 14 },
        { date: new Date(2024, 2, 8), value: 18 },
        { date: new Date(2024, 2, 15), value: 22 }
    ]
};`,
            curves: ["smooth", "linear", "step"],
            desktop: desktopSeries,
            mobile: mobileSeries,
            other: otherSeries,
            browsers: browserSeries,
            daily: dailySeries(),
            live: [desktopSeries, mobileSeries]
        };
    },

    methods: {
        randomize
    }
});
</script>
