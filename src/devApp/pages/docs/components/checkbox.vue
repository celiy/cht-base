<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Checkbox
            </h1>

            <p class="text-muted-foreground!">
                Seleção booleana em formato clássico, card ou switch.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-2">
                        <Checkbox label="Checkbox normal" id="docs-cb-1" name="docs-cb-1" :value="false" />
                        <Checkbox label="Já marcado" id="docs-cb-2" name="docs-cb-2" :checked="true" :value="true" />
                        <Checkbox label="Desabilitado" id="docs-cb-3" name="docs-cb-3" :value="false" :disabled="true" />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="normal / card"</code><br />
                <code>checkboxStyle="normal / switch"</code>
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-2">
                        <Checkbox
                            label="Card"
                            id="docs-cb-4"
                            name="docs-cb-4"
                            description="Descrição ao lado do checkbox em layout de card."
                            variant="card"
                            :value="false"
                        />

                        <Checkbox
                            label="Switch"
                            id="docs-cb-5"
                            name="docs-cb-5"
                            checkboxStyle="switch"
                            :value="false"
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
import Checkbox from "@design/components/Checkbox.vue";

export default defineComponent({
    name: "ComponentsCheckbox",

    components: {
        Card,
        Checkbox
    }
});
</script>
