<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Estilização
            </h1>

            <p>
                Classes globais do CHT, definidas em
                <code>cht-base/src/css/style.css</code>,
                para layout e chrome comuns. Tokens de cor ficam em
                <a href="/docs/components/colors">Colors</a>.
                Utilitários Tailwind (como <code>rounded</code>,
                <code>flex</code>, <code>gap-2</code>) também estão disponíveis.
            </p>
        </section>

        <section>
            <h3>
                Containers
            </h3>

            <p>
                <code>container-sm</code> e <code>container-lg</code> centralizam
                o bloco e aplicam padding horizontal; a largura máxima cresce
                com o breakpoint.
                <code>container-center</code> só alinha o conteúdo no eixo
                vertical (<code>flex-col justify-center</code>) e no eixo
                horizontal (<code>mx-auto</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Containers">
                <div class="flex flex-col gap-3 p-4">
                    <div class="container-sm rounded border bg-card p-3">
                        <code>container-sm</code>
                    </div>

                    <div class="container-lg rounded border bg-card p-3">
                        <code>container-lg</code>
                    </div>

                    <div class="container-center h-24 rounded border bg-muted">
                        <span>
                            <code>container-center</code>
                        </span>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Bordas arredondadas
            </h3>

            <p>
                <code>rounded</code> vem do Tailwind (raio padrão do tema).
                Combine com tamanhos (<code>rounded-md</code>,
                <code>rounded-xl</code>, <code>rounded-full</code>) quando
                precisar de outro raio.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Rounded">
                <div class="flex flex-wrap items-end gap-4 p-4">
                    <div class="h-16 w-16 border bg-secondary rounded" />
                    <div class="h-16 w-16 border bg-secondary rounded-md" />
                    <div class="h-16 w-16 border bg-secondary rounded-xl" />
                    <div class="h-16 w-16 border bg-secondary rounded-full" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Grupo de botões
            </h3>

            <p>
                <code>btn-group</code> cola botões lado a lado: remove o raio
                interno, compartilha a borda e alinha a altura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="btn-group">
                <div class="p-4">
                    <div class="btn-group">
                        <Button label="Esquerda" />
                        <Button label="Meio" />
                        <Button label="Direita" />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Separator e sombras
            </h3>

            <p>
                <code>separator</code> é uma linha de 1px com
                <code>bg-border</code>.
                Sombras usam <code>--color-shadow</code>:
                <code>shadow-2xs</code> até <code>shadow-2xl</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Separator e sombras">
                <div class="flex flex-col gap-4 p-4">
                    <div class="separator" />

                    <div class="flex flex-wrap gap-4">
                        <div class="rounded bg-card p-4 shadow-sm">
                            <p>shadow-sm</p>
                        </div>

                        <div class="rounded bg-card p-4 shadow-md">
                            <p>shadow-md</p>
                        </div>

                        <div class="rounded bg-card p-4 shadow-lg">
                            <p>shadow-lg</p>
                        </div>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Contraste de texto
            </h3>

            <p>
                <code>text-contrast</code> força
                <code>var(--color-foreground)</code>.
                Com <code>data-contrast="background"</code> usa
                <code>var(--color-background)</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="text-contrast">
                <div class="flex flex-col gap-2 p-4">
                    <p class="bg-primary p-3 text-primary-foreground">
                        Sem a classe, o parágrafo herda o token do tema.
                    </p>

                    <p class="bg-primary p-3 text-contrast">
                        <code>text-contrast</code>
                    </p>

                    <p
                        class="bg-primary p-3 text-contrast"
                        data-contrast="background"
                    >
                        <code>data-contrast="background"</code>
                    </p>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: "DocsStyling",

    components: {
        Button
    }
});
</script>
