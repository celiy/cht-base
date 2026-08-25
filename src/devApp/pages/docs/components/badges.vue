<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Badge
            </h1>

            <p>
                Rótulo compacto para status, categorias ou links.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Badge">
                <div class="p-4 flex flex-wrap gap-2">
                    <Badge label="Primary" />
                    <Badge label="Secondary" variant="secondary" />
                    <Badge label="Destructive" variant="destructive" />
                    <Badge label="Warning" variant="warning" />
                    <Badge label="Info" variant="info" />
                    <Badge label="Success" variant="success" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                Cores via <code>variant</code>. Semânticas:
                <code>primary / secondary / destructive / warning / info / success</code>.
                Paleta de gráficos (tokens <code>--color-chart-*</code> em <code>style.css</code>):
                <code>chart-1</code> … <code>chart-5</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4 flex flex-wrap gap-2">
                    <Badge label="chart-1" variant="chart-1" />
                    <Badge label="chart-2" variant="chart-2" />
                    <Badge label="chart-3" variant="chart-3" />
                    <Badge label="chart-4" variant="chart-4" />
                    <Badge label="chart-5" variant="chart-5" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tipo link
            </h3>

            <p>
                Com <code>type="link"</code> o badge navega. <code>external</code> abre em nova aba.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipo link">
                <div class="p-4 flex flex-wrap gap-2">
                    <Badge label="Link external" variant="secondary" type="link" :external="true" link="https://google.com" />
                    <Badge label="Link internal" variant="secondary" type="link" link="/" />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Badge from "@design/components/Badge.vue";

export default defineComponent({
    name: "ComponentsBadges",

    components: {
        Badge
    }
});
</script>
