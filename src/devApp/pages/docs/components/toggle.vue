<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Toggle
            </h1>

            <p>
                Botão com os mesmos props do <code>Button</code>. Desligado usa
                <code>variant="transparent"</code>; ligado usa o
                <code>variant</code> informado (padrão <code>default</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Toggle">
                <div class="p-4 flex flex-wrap gap-2 items-center">
                    <Toggle
                        v-model="basic"
                        label="Default"
                    />

                    <Toggle
                        v-model="primary"
                        label="Primary"
                        variant="primary"
                    />

                    <Toggle
                        v-model="success"
                        label="Success"
                        variant="success"
                    />

                    <Toggle
                        v-model="info"
                        label="Info"
                        variant="info"
                    />

                    <Toggle
                        v-model="warning"
                        label="Warning"
                        variant="warning"
                    />

                    <Toggle
                        v-model="destructive"
                        label="Destructive"
                        variant="destructive"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Ícones e tamanho
            </h3>

            <p>
                Aceita <code>leftIcon</code>, <code>rightIcon</code> e
                <code>size</code> como o <code>Button</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ícones e tamanho">
                <div class="p-4 flex flex-wrap gap-2 items-center">
                    <Toggle
                        v-model="iconToggle"
                        label="Filtro"
                        left-icon="fa-filter"
                        variant="secondary"
                        size="small"
                    />

                    <Toggle
                        v-model="iconToggleLarge"
                        label="Destaque"
                        right-icon="fa-star"
                        variant="primary"
                        size="large"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toggle from "@design/components/Toggle.vue";

export default defineComponent({
    name: "DocsToggle",

    components: {
        Toggle
    },

    data() {
        return {
            basic: false,
            primary: true,
            success: false,
            info: true,
            warning: false,
            destructive: false,
            iconToggle: true,
            iconToggleLarge: false
        };
    }
});
</script>
