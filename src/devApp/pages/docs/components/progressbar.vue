<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Progress bar</h1>

            <p>Controle de valor numérico em barra, vertical ou circular.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Progress bar">
                <div class="flex flex-col gap-6 p-4">
                    <ProgressBar
                        v-model="value"
                        label="Barra padrão"
                        show-progress
                        :helper-text="`Value: ${value}`"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estados</h3>

            <p><code>disabled</code>, <code>readonly</code> e <code>loading</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados">
                <div class="flex flex-col gap-6 p-4">
                    <ProgressBar
                        v-model="value"
                        label="Desabilitada"
                        disabled
                        show-progress
                        :helper-text="`Value: ${value}`"
                    />

                    <ProgressBar
                        v-model="value"
                        label="Somente leitura"
                        readonly
                        show-progress
                        :helper-text="`Value: ${value}`"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Valor atual</h3>

            <p>
                <code>show-progress</code> mostra o valor num tooltip enquanto você arrasta. O
                tooltip acompanha a bolinha: acima dela na horizontal e ao lado na vertical. O slot
                <code>#tooltip="{ value }"</code> troca o conteúdo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Valor atual">
                <div class="flex flex-col gap-6 p-4 pt-12">
                    <ProgressBar
                        v-model="value"
                        show-progress
                    />

                    <ProgressBar
                        v-model="value"
                        show-progress
                    >
                        <template #tooltip="{ value: current }">
                            {{ current }}%
                        </template>
                    </ProgressBar>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Direção</h3>

            <p>
                <code>direction="horizontal / vertical"</code>. No vertical,
                <code>vertical-origin="bottom / top"</code> define de onde o progresso começa. Com
                <code>bottom</code>, o padrão, o mínimo fica embaixo e a barra enche para cima. Com
                <code>top</code>, o mínimo fica no topo e ela enche para baixo.
                <code>height</code> define a altura, com padrão <code>12rem</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Direção">
                <div class="flex gap-16 p-4">
                    <div class="w-fit">
                        <ProgressBar
                            v-model="value"
                            label="De baixo"
                            direction="vertical"
                            show-progress
                        />
                    </div>

                    <div class="w-fit">
                        <ProgressBar
                            v-model="value"
                            label="De cima"
                            direction="vertical"
                            vertical-origin="top"
                            show-progress
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Marks</h3>

            <p>
                <code>marks</code> recebe valores do intervalo, como números ou
                <code>{ value, label }</code>. Cada mark desenha um traço na barra e um label
                pequeno: embaixo na horizontal e à esquerda na vertical. Valores fora de
                <code>min</code> e <code>max</code> são ignorados. Os slots
                <code>#mark-tick="{ mark }"</code> e <code>#mark-label="{ mark }"</code> substituem o
                traço e o label, e <code>markClass</code> e <code>markLabelClass</code> mudam só o
                estilo. O <code>mark</code> tem <code>value</code>, <code>label</code> e
                <code>percent</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Marks">
                <div class="flex flex-col gap-10 p-4 pt-12">
                    <ProgressBar
                        v-model="value"
                        show-progress
                        :marks="[0, 30, 50, 100]"
                    />

                    <ProgressBar
                        v-model="value"
                        mark-label-class="font-semibold text-primary"
                        :marks="[
                            { value: 25, label: 'Fácil' },
                            { value: 50, label: 'Médio' },
                            { value: 75, label: 'Difícil' }
                        ]"
                    >
                        <template #mark-tick>
                            <span class="block h-3 w-3 rounded-full border-2 border-primary bg-background" />
                        </template>
                    </ProgressBar>

                    <div class="w-fit pl-12">
                        <ProgressBar
                            v-model="value"
                            direction="vertical"
                            vertical-origin="top"
                            :marks="[0, 50, 100]"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customização</h3>

            <p>
                As cores e os tamanhos vêm de variáveis CSS que você define no próprio
                ProgressBar, por <code>style</code> ou por classe:
                <code>--progress-fill</code>, <code>--progress-track</code>,
                <code>--progress-thumb</code>, <code>--progress-thumb-border</code>,
                <code>--progress-track-size</code> e <code>--progress-thumb-size</code>. O circular
                usa <code>--progress-fill</code> e <code>--progress-track</code>. Os textos aceitam
                <code>labelClass</code>, <code>helperTextClass</code> e <code>tooltipClass</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customização">
                <div class="flex flex-col gap-8 p-4 pt-12">
                    <ProgressBar
                        v-model="value"
                        label="Grossa e verde"
                        label-class="font-semibold text-success"
                        tooltip-class="bg-success! text-success-foreground!"
                        show-progress
                        :style="{
                            '--progress-fill': 'var(--color-success)',
                            '--progress-track-size': '0.75rem',
                            '--progress-thumb-size': '1.5rem'
                        }"
                    />

                    <ProgressBar
                        v-model="value"
                        label="Fina, sem borda na bolinha"
                        helper-text-class="italic"
                        helper-text="Trilho e bolinha customizados"
                        :style="{
                            '--progress-fill': 'var(--color-warning)',
                            '--progress-thumb': 'var(--color-warning)',
                            '--progress-thumb-border': 'transparent',
                            '--progress-track-size': '0.25rem',
                            '--progress-thumb-size': '0.75rem'
                        }"
                    />

                    <ProgressBar
                        v-model="value"
                        label="Circular colorido"
                        variant="circular"
                        :style="{ '--progress-fill': 'var(--color-destructive)' }"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Circular</h3>

            <p>
                <code>variant="circular"</code> com <code>size="small / medium / large"</code>.
                Também aceita <code>min</code>, <code>max</code> e <code>loading</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Circular">
                <div class="flex flex-col gap-6 p-4">
                    <ProgressBar
                        v-model="value"
                        label="Circular small"
                        variant="circular"
                        size="small"
                        show-progress
                    />

                    <ProgressBar
                        v-model="value"
                        label="Circular medium"
                        variant="circular"
                        size="medium"
                    />

                    <ProgressBar
                        v-model="value"
                        label="Circular large"
                        variant="circular"
                        size="large"
                    />

                    <ProgressBar
                        v-model="rangedValue"
                        label="Min 30, max 60"
                        variant="circular"
                        :min="30"
                        :max="60"
                        show-progress
                    />

                    <ProgressBar
                        label="Loading"
                        loading
                        variant="circular"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressBar from "@design/components/ProgressBar.vue";

export default defineComponent({
    name: "ComponentsProgressbar",

    components: {
        ProgressBar
    },

    data() {
        return {
            value: 40,
            rangedValue: 45
        };
    }
});
</script>
