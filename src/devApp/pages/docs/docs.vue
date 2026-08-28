<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4 pb-12">
        <section>
            <h1>
                Bem-vindo
            </h1>

            <p>
                Esta é a documentação do design system CHT: a mesma linguagem visual e os mesmos
                componentes Vue que a aplicação usa. Cada página mostra o componente <b>ao vivo</b>,
                as props que importam e um exemplo que podes copiar.
            </p>
        </section>

        <section>
            <h3>
                Por onde começar
            </h3>

            <p>
                Se é a primeira visita, segue esta ordem. Se já conheces o sistema, salta
                direto para o componente na sidebar.
            </p>
        </section>

        <section class="grid sm:grid-cols-2 gap-3 mb-4">
            <Item
                label="Installation"
                description="Como clonar o monorepo e subir o ambiente de desenvolvimento."
                icon="fa-download"
                variant="secondary"

                @click="$router.push('/docs/installation')"
            />

            <Item
                label="Usage"
                description="Como o plugin regista os componentes e como os usas na app."
                icon="fa-book-open"
                variant="secondary"

                @click="$router.push('/docs/usage')"
            />

            <Item
                label="Foundation"
                description="Cores, tipografia, toast e tooltip — a base visual do sistema."
                icon="fa-palette"
                variant="secondary"

                @click="$router.push('/docs/components/colors')"
            />

            <Item
                label="Components"
                description="Primitivos e compostos: botão, input, card, sidebar e o resto."
                icon="fa-cubes"
                variant="secondary"

                @click="$router.push('/docs/components/buttons')"
            />
        </section>

        <section>
            <h3>
                Como estas páginas funcionam
            </h3>

            <p>
                A sidebar à esquerda é o índice. À direita, o outline acompanha os títulos da página atual.
            </p>
        </section>

        <section class="mb-4">
            <li>
                Em cada componente, o separador <b>Preview</b> é o exemplo interativo;
                <b>Code</b> mostra o markup.
            </li>
            <li>
                Tokens e texto global (headings, <code>p</code>, <i>itálico</i>, <b>negrito</b>)
                estão em Foundation, não em Components.
            </li>
            <li>
                A playground da <a href="/" @click.prevent="$router.push('/')">home</a> junta vários
                componentes no mesmo ecrã; as docs isolam um de cada vez.
            </li>
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
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Docs"
});
</script>
