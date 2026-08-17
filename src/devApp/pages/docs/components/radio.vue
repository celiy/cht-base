<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Radio
            </h1>

            <p class="text-muted-foreground!">
                Escolha exclusiva dentro de um grupo com o mesmo <code>name</code>.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-2">
                        <Radio v-model="selected" label="Opção A" value="opt-a" name="docs-radio" id="docs-ra-1" description="Com descrição" />
                        <Radio v-model="selected" label="Opção B em card" value="opt-b" name="docs-radio" id="docs-ra-2" variant="card" />
                        <Radio v-model="selected" label="Opção C" value="opt-c" name="docs-radio" id="docs-ra-3" />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="normal / card"</code>
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Radio from "@design/components/Radio.vue";

export default defineComponent({
    name: "ComponentsRadio",

    components: {
        Card,
        Radio
    },

    data() {
        return {
            selected: "opt-a"
        };
    }
});
</script>
