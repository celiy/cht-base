<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Charts
            </h1>

            <p class="text-muted-foreground!">
                <code>TableCharts</code> envolve barras ou onda. Itens com <code>date</code> agrupam por mês; itens com <code>group</code> agregam na ordem da array (chave case-insensitive).
            </p>
        </section>

        <section>
            <h3 class="mb-2">
                Por data
            </h3>

            <p>
                Barras somam por mês e ordenam cronologicamente. Onda usa cada ponto e o filtro de período.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TableCharts
                header="Vendas no ano"
                description="Doze meses, displayAs sum"
                variant="bars"
                :data="yearBars"
            />

            <TableCharts
                header="Saldo com negativos"
                description="Valores positivos e negativos, displayAs currency"
                variant="bars"
                :data="signedBars"
            />
        </section>

        <section class="mb-8">
            <TableCharts
                header="Acessos diários"
                description="Onda com pontos ao longo de vários meses e filtro 3m / 1m / 2s / 7d"
                variant="wave"
                :data="dailyWave"
            />
        </section>

        <section>
            <h3 class="mb-2">
                Por grupo
            </h3>

            <p>
                <code>{ value, group }</code>. <code>jan</code> e <code>Jan</code> somam; a label é a primeira ocorrência; a ordem é a da array.
            </p>
        </section>

        <section class="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TableCharts
                header="Merge case-insensitive"
                description="jan + Jan = 143, depois fev"
                variant="bars"
                :data="mergedGroups"
            />

            <TableCharts
                header="Categorias"
                description="Grupos na ordem em que aparecem"
                variant="bars"
                :data="categoryBars"
            />
        </section>

        <section class="mb-8">
            <TableCharts
                header="Onda por grupo"
                description="Mesma agregação, sem filtro de período"
                variant="wave"
                :data="categoryWave"
            />
        </section>
    </main>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on TableCharts.
import { defineComponent } from "vue";
import TableCharts from "@design/components/custom/TableCharts.vue";

export default defineComponent({
    name: "ComponentsCharts",

    components: {
        TableCharts
    },

    data() {
        return {
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
                    { date: new Date(2023, 7, 1), value: 41 },
                    { date: new Date(2023, 8, 1), value: 19 },
                    { date: new Date(2023, 9, 1), value: 27 },
                    { date: new Date(2023, 10, 1), value: 33 },
                    { date: new Date(2023, 11, 1), value: 45 }
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
                    { date: new Date(2023, 5, 1), value: 42 },
                    { date: new Date(2023, 6, 1), value: -8 },
                    { date: new Date(2023, 7, 1), value: 18 }
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
                    { date: new Date(2023, 3, 19), value: 24 },
                    { date: new Date(2023, 3, 26), value: 28 },
                    { date: new Date(2023, 4, 3), value: 19 },
                    { date: new Date(2023, 4, 10), value: 23 },
                    { date: new Date(2023, 4, 17), value: 27 },
                    { date: new Date(2023, 4, 24), value: 21 },
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
