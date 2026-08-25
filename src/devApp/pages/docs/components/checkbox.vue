<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Checkbox
            </h1>

            <p>
                Seleção booleana em formato clássico, card ou switch.
                Label e descrição não são selecionáveis (<code>select-none</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Checkbox">
                <div class="p-4 flex flex-col gap-2">
                    <Checkbox label="Checkbox normal" id="docs-cb-1" name="docs-cb-1" :value="false" />
                    <Checkbox label="Já marcado" id="docs-cb-2" name="docs-cb-2" :checked="true" :value="true" />
                    <Checkbox label="Desabilitado" id="docs-cb-3" name="docs-cb-3" :value="false" :disabled="true" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant="normal / card"</code><br />
                <code>checkboxStyle="normal / switch"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
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
                        description="O clique no interruptor e no texto altera o mesmo estado."
                        checkboxStyle="switch"
                        :value="false"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Checkbox from "@design/components/Checkbox.vue";

export default defineComponent({
    name: "ComponentsCheckbox",

    components: {
        Checkbox
    }
});
</script>
