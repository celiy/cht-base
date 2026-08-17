<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Select
            </h1>

            <p class="text-muted-foreground!">
                Campo de escolha com lista flutuante, pesquisa local, múltipla seleção e memo.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-4 max-w-sm">
                        <Select
                            header="Select"
                            inHelperText="Inside Helper text"
                            helperText="Outside Helper text"

                            :options="options"
                        />

                        <Select
                            :search="{ external: false }"
                            :options="options"
                        />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Múltipla seleção e memo
            </h3>

            <p>
                <code>selectMultiple="{ min, max }"</code> e <code>useMemo</code> para persistir a escolha.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-4 max-w-sm">
                        <Select
                            header="Múltiplo"
                            helperText="Min. 0, max. 3"
                            :options="options"
                            :selectMultiple="{ min: 0, max: 3 }"
                        />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Select from "@design/components/Select.vue";

export default defineComponent({
    name: "ComponentsSelect",

    components: {
        Card,
        Select
    },

    data() {
        return {
            options: [
                { label: "ABC", value: "abc", tooltip: "This item has a tooltip" },
                { label: "DEF", value: "def" },
                { label: "123", value: "unodunotres" }
            ]
        };
    }
});
</script>
