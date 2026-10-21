<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Estilização</h1>

            <p>
                Classes globais do CHT para layout e partes comuns da interface. Elas vêm de <code>cht-base/src/css/style.css</code>. Os tokens de cor ficam em <a href="/docs/components/colors">Colors</a>, e as utilities Tailwind, como <code>flex</code> e <code>gap-2</code>, também funcionam.
            </p>
        </section>

        <section>
            <h3>Containers</h3>

            <p>
                <code>container-sm</code> e <code>container-lg</code> centralizam o bloco e dão padding horizontal. A largura máxima cresce com o breakpoint. <code>container-center</code> centraliza o conteúdo nos dois eixos.
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
                Classes de cor, como <code>border-primary</code> ou <code>border-red-500</code>, já trazem a borda de 1px. Para mudar a espessura, use <code>border-2-red-200</code>. Para um lado só, use <code>border-b-primary</code> ou <code>border-x-2/primary</code>. Largura arbitrária usa barra: <code>border-[1rem]/muted</code>, porque o Tailwind não aceita token depois de <code>]</code>. Para utilities que só este cliente usa, veja o <a href="/docs/client-tailwind-plugin">Plugin Tailwind do cliente</a>.
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
                <code>rounded</code> usa o raio padrão do tema. Para outro raio, use <code>rounded-md</code>, <code>rounded-xl</code> ou <code>rounded-full</code>.
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
                <code>btn-group</code> junta botões lado a lado. Ele tira o raio interno, compartilha a borda e iguala a altura.
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
                <code>separator</code> é uma linha de 1px com <code>bg-border</code>. As sombras vão de <code>shadow-2xs</code> a <code>shadow-2xl</code> e usam <code>--color-shadow</code>.
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
                <code>text-contrast</code> força <code>var(--color-foreground)</code>. Com <code>data-contrast="background"</code>, usa <code>var(--color-background)</code>.
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
                <code>reveal-highlight</code> ilumina a borda com um halo que segue o mouse por toda a página. Não é preciso passar o cursor sobre o elemento. Funciona em qualquer nó com borda, como um Card ou um <code>div</code> com <code>border</code>. Em elementos vazios, como <code>img</code> e <code>input</code>, coloque a classe num wrapper. Funciona no Chromium, no Firefox e no Safari 15.4 ou superior. Em outros browsers a classe não faz nada. O efeito desliga com <code>prefers-reduced-motion</code>, com ponteiro grosso ou com <code>$project.style.revealHighlight = false</code>. Um score baixo em <a href="/docs/project">$project.device.performanceScore</a> também pode desligá-lo no arranque. O limiar fica em <code>applyRevealHighlightPerformanceGate</code>. No devApp ele só roda com o tema <code>hodiernus</code>.
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
                Cada cliente pode ter um <code>src/override.css</code>. O Vite injeta esse arquivo depois de <code>cht-base/src/css/style.css</code>, então as regras locais ganham das globais. Sem o arquivo, nada é injetado. Veja <a href="/docs/override-css">override.css</a>. Para utilities novas, use o <a href="/docs/client-tailwind-plugin">Plugin Tailwind do cliente</a>.
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
