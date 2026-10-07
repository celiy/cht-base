<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Estilização</h1>

            <p>
                Classes globais do CHT, definidas em
                <code>cht-base/src/css/style.css</code>, para layout e chrome comuns. Tokens de cor
                ficam em <a href="/docs/components/colors">Colors</a>. Utilitários Tailwind (como
                <code>rounded</code>, <code>flex</code>, <code>gap-2</code>) também estão
                disponíveis.
            </p>
        </section>

        <section>
            <h3>Containers</h3>

            <p>
                <code>container-sm</code> e <code>container-lg</code> centralizam o bloco e aplicam
                padding horizontal; a largura máxima cresce com o breakpoint.
                <code>container-center</code> só alinha o conteúdo no eixo vertical (<code
                    >flex-col justify-center</code
                >) e no eixo horizontal (<code>mx-auto</code>).
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
            <h3>Bordas coloridas</h3>

            <p>
                <code>border-primary</code>, <code>border-muted</code>, <code>border-red-500</code>
                (e qualquer cor do tema/paleta) já aplicam largura 1px + cor — não precisa de
                <code>border</code> à parte. Com tamanho: <code>border-1-primary</code>,
                <code>border-2-red-200</code>. Direções
                (<code>t</code>/<code>r</code>/<code>b</code>/<code>l</code>/<code>x</code>/<code>y</code>):
                <code>border-b-primary</code>, <code>border-b-2-red-500</code>,
                <code>border-x-2/primary</code>. Largura arbitrária usa barra:
                <code>border-[1rem]/muted</code>, <code>border-b-[4px]/primary</code> (o Tailwind
                não aceita token depois de <code>]</code>).
                Novas utilities **só deste cliente** (não o padrão global de bordas) usam
                <a href="/docs/client-tailwind-plugin">Plugin Tailwind do cliente</a>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Bordas coloridas">
                <div class="flex flex-wrap items-end gap-4 p-4">
                    <div class="h-16 w-16 rounded border-primary bg-card" />
                    <div class="border-b-2-red-500 h-16 w-16 rounded bg-card" />
                    <div class="border-x-2-primary h-16 w-16 rounded bg-card" />
                    <div class="border-t-[4px]/muted h-16 w-16 rounded bg-card" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Bordas arredondadas</h3>

            <p>
                <code>rounded</code> vem do Tailwind (raio padrão do tema). Combine com tamanhos
                (<code>rounded-md</code>, <code>rounded-xl</code>, <code>rounded-full</code>) quando
                precisar de outro raio.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Rounded">
                <div class="flex flex-wrap items-end gap-4 p-4">
                    <div class="h-16 w-16 rounded border bg-secondary" />
                    <div class="h-16 w-16 rounded-md border bg-secondary" />
                    <div class="h-16 w-16 rounded-xl border bg-secondary" />
                    <div class="h-16 w-16 rounded-full border bg-secondary" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Grupo de botões</h3>

            <p>
                <code>btn-group</code> cola botões lado a lado: remove o raio interno, compartilha a
                borda e alinha a altura.
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
            <h3>Separator e sombras</h3>

            <p>
                <code>separator</code> é uma linha de 1px com <code>bg-border</code>. Sombras usam
                <code>--color-shadow</code>: <code>shadow-2xs</code> até <code>shadow-2xl</code>.
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
            <h3>Contraste de texto</h3>

            <p>
                <code>text-contrast</code> força <code>var(--color-foreground)</code>. Com
                <code>data-contrast="background"</code> usa <code>var(--color-background)</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="text-contrast">
                <div class="flex flex-col gap-2 p-4">
                    <p class="bg-primary p-3 text-primary-foreground">
                        Sem a classe, o parágrafo herda o token do tema.
                    </p>

                    <p class="text-contrast bg-primary p-3">
                        <code>text-contrast</code>
                    </p>

                    <p
                        class="text-contrast bg-primary p-3"
                        data-contrast="background"
                    >
                        <code>data-contrast="background"</code>
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Reveal highlight</h3>

            <p>
                <code>reveal-highlight</code> ilumina só a borda com um halo que segue o rato em
                toda a página — não é preciso pairar o cursor no elemento. Serve em qualquer nó com
                borda (Card, um <code>div</code> com <code>border</code>, etc.). Não uses em
                elementos void (<code>img</code>, <code>input</code>): põe a classe no wrapper.
                Chromium, Firefox e Safari 15.4+; noutros browsers a classe não faz nada. O halo
                segue o <code>border-radius</code>, tem 1px e 50% de opacidade. Com
                <code>prefers-reduced-motion</code>, ponteiro grosso ou
                <code>$project.style.revealHighlight = false</code> o efeito desliga-se. No arranque,
                o score em <a href="/docs/project">$project.device.performanceScore</a> pode desligar
                o reveal automaticamente (limiar em
                <code>applyRevealHighlightPerformanceGate</code>). No DevApp só corre com o tema de
                superfície <code>hodiernus</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Reveal highlight">
                <div class="p-4">
                    <Button
                        :label="
                            $project.style.revealHighlight
                                ? 'Reveal highlight ativado'
                                : 'Reveal highlight desativado'
                        "

                        @click="$project.style.revealHighlight = !$project.style.revealHighlight"
                    />
                </div>

                <div class="grid grid-cols-2 gap-4 px-4 pb-4">
                    <Card class="reveal-highlight">
                        <template #body>
                            <p>Card 1</p>
                        </template>
                    </Card>

                    <Card class="reveal-highlight">
                        <template #body>
                            <p>Card 2</p>
                        </template>
                    </Card>

                    <Card class="reveal-highlight">
                        <template #body>
                            <p>Card 3</p>
                        </template>
                    </Card>

                    <Card class="reveal-highlight">
                        <template #body>
                            <p>Card 4</p>
                        </template>
                    </Card>
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Borda parcial">
                <div class="flex flex-wrap gap-4 p-4">
                    <div
                        class="reveal-highlight border-b-2-border h-20 w-36 rounded-md bg-card p-3"
                    >
                        <p class="text-sm">border-b</p>
                    </div>

                    <div class="reveal-highlight h-20 w-36 rounded-md border bg-card p-3">
                        <p class="text-sm">border</p>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>CSS override do cliente</h3>

            <p>
                Cada cliente pode ter
                <code>src/override.css</code>
                na raiz de
                <code>src</code>. O Vite injeta esse ficheiro
                <strong>depois</strong>
                de
                <code>cht-base/src/css/style.css</code>, então as regras locais vencem as globais.
                Sem o ficheiro, nada é injetado. Como usar:
                <a href="/docs/override-css">override.css</a>.
                Utilities novas (não retocar classes existentes):
                <a href="/docs/client-tailwind-plugin">Plugin Tailwind do cliente</a>
                (<code>src/tailwind.plugin.js</code>).
            </p>
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
