<template>
    <article class="container-sm mt-4 flex flex-col gap-4 pb-12 md:mt-8">
        <section>
            <h1>Bem-vindo</h1>

            <p>
                Esta é a documentação do design system CHT: a mesma linguagem visual e os mesmos
                componentes Vue que a aplicação usa.
            </p>
        </section>

        <section>
            <h3>Por onde começar</h3>
        </section>

        <section class="mb-4 grid gap-3 sm:grid-cols-2">
            <Item
                label="Instalação"
                description="Como clonar o monorepo e subir o ambiente de desenvolvimento."
                icon="fa-download"
                variant="secondary"

                @click="$router.push('/docs/installation')"
            />

            <Item
                label="Uso"
                description="Como o plugin regista os componentes e como os usas na app."
                icon="fa-book-open"
                variant="secondary"

                @click="$router.push('/docs/usage')"
            />

            <Item
                label="Fundamentos"
                description="Cores, tipografia, toast e tooltip — a base visual do sistema."
                icon="fa-palette"
                variant="secondary"

                @click="$router.push('/docs/components/colors')"
            />

            <Item
                label="Componentes"
                description="Primitivos e compostos: botão, input, card, sidebar e o resto."
                icon="fa-cubes"
                variant="secondary"

                @click="$router.push('/docs/components/buttons')"
            />
        </section>

        <section class="flex flex-wrap gap-2">
            <Button
                variant="primary"
                label="Começar pela instalação"
                right-icon="fa-arrow-right"

                @click="$router.push('/docs/installation')"
            />

            <Button
                variant="outline"
                label="Sobre o projeto"

                @click="$router.push('/docs/about')"
            />
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Docs"
});
</script>
