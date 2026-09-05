<template>
    <main class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Checkbox</h1>

            <p>
                Seleção booleana em formato clássico, card ou switch. Label e descrição não são
                selecionáveis (<code>select-none</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Checkbox">
                <div class="flex flex-col gap-2 p-4">
                    <Checkbox
                        id="docs-cb-1"
                        label="Checkbox normal"
                        name="docs-cb-1"
                        :value="false"
                    />

                    <Checkbox
                        id="docs-cb-2"
                        label="Já marcado"
                        name="docs-cb-2"
                        :checked="true"
                        :value="true"
                    />

                    <Checkbox
                        id="docs-cb-3"
                        label="Desabilitado"
                        name="docs-cb-3"
                        :value="false"
                        :disabled="true"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Variações</h3>

            <p>
                <code>variant="normal / card"</code><br />
                <code>checkboxStyle="normal / switch"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="flex flex-col gap-2 p-4">
                    <Checkbox
                        id="docs-cb-4"
                        label="Card"
                        name="docs-cb-4"
                        description="Descrição ao lado do checkbox em layout de card."
                        variant="card"
                        :value="false"
                    />

                    <Checkbox
                        id="docs-cb-7"
                        label="Card desabilitado"
                        name="docs-cb-7"
                        description="Descrição ao lado do checkbox em layout de card."
                        variant="card"
                        :value="false"
                        disabled
                    />

                    <Checkbox
                        id="docs-cb-6"
                        label="Switch"
                        name="docs-cb-6"
                        description="O clique no interruptor e no texto altera o mesmo estado."
                        checkbox-style="switch"
                        :value="false"
                    />

                    <Checkbox
                        id="docs-cb-5"
                        label="Switch desabilitado"
                        name="docs-cb-5"
                        description="O clique no interruptor e no texto altera o mesmo estado."
                        checkbox-style="switch"
                        :value="false"
                        disabled
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
