<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Progress bar
            </h1>

            <p>
                Controle de valor numérico em barra, vertical ou circular.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Progress bar">
                <div class="p-4 flex flex-col gap-6">
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
            <h3>
                Estados
            </h3>

            <p>
                <code>disabled</code>, <code>readonly</code> e <code>loading</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados">
                <div class="p-4 flex flex-col gap-6">
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
            <h3>
                Direção
            </h3>

            <p>
                <code>direction="horizontal / vertical"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Direção">
                <div class="p-4 w-fit">
                    <ProgressBar
                        v-model="value"
                        label="Vertical"
                        direction="vertical"
                        show-progress
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Circular
            </h3>

            <p>
                <code>variant="circular"</code> com <code>size="small / medium / large"</code>.
                Também aceita <code>min</code>, <code>max</code> e <code>loading</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Circular">
                <div class="p-4 flex flex-col gap-6">
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
    </main>
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
