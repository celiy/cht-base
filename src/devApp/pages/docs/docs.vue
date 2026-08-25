<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                CHT Docs
            </h1>

            <p>
                Mini wiki dos componentes do design system, no estilo Storybook. Cada página mostra o componente ao vivo, as variações de props e exemplos de uso.
            </p>
        </section>

        <section>
            <h3>
                Como usar
            </h3>

            <p>
                Navegue pela sidebar à esquerda.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Docs"
});
</script>
