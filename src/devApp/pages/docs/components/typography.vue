<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Typography</h1>

            <p>
                Família <code>Inter</code> (400, 500, 700). Tamanhos e pesos dos headings vêm de
                <code>style.css</code>.
            </p>
        </section>

        <section>
            <h3>Headings</h3>

            <p><code>h1</code> … <code>h6</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Headings">
                <div class="flex flex-col p-4">
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tags</h3>
        </section>

        <section class="mb-8">
            <DocsExample label="Negrito e itálico">
                <div class="flex flex-col gap-2 p-4">
                    <span>
                        <span class="flex items-center"
                            ><code>p</code>:
                            <p>&nbsp;parágrafo</p>
                            <br /></span
                        ><br />

                        <code>b</code>: <b>negrito</b> <br /><br />
                        <code>i</code>: <i>itálico</i> <br /><br />
                        <code>li</code>:
                        <li>item de lista</li>
                        <li>item de lista</li>
                        <li>item de lista</li>
                        <li>item de lista</li>
                        <br />
                        <code>ol</code>:
                        <ol>
                            <li>item de lista</li>
                            <li>item de lista</li>
                            <li>item de lista</li>
                            <li>item de lista</li>
                        </ol>
                        <br />
                        <code>strong</code>: <strong>forte</strong> <br /><br />
                        <code>mark</code>: <mark>marcação</mark> <br /><br />
                        <code>s</code>: <s>riscado</s> <br /><br />
                        <code>sub</code>: <sub>subscrito</sub> <br /><br />
                        <span class="flex items-center"
                            ><code>small</code>: <small>&nbsp;pequeno</small></span
                        >
                        <br />
                        <code>sup</code>: <sup>sobrescrito</sup> <br /><br />
                        <code>small-muted</code>: <small-muted>pequeno e muteado</small-muted>
                        <br /><br />
                        <code>kbd</code>: <kbd>Esc</kbd>, <kbd>Shift</kbd>+<kbd>Enter</kbd>
                    </span>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Contraste</h3>

            <p>
                <code>text-contrast</code> escolhe <code>--color-foreground</code> ou
                <code>--color-background</code> (com <code>!important</code>) consoante o fundo for
                escuro ou claro.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="text-contrast">
                <div class="grid gap-3 p-4 sm:grid-cols-2">
                    <div class="rounded bg-primary p-4">
                        <p class="text-contrast">Sobre <code>primary</code></p>
                    </div>

                    <div class="rounded bg-secondary p-4">
                        <p class="text-contrast">Sobre <code>secondary</code></p>
                    </div>

                    <div class="rounded bg-warning p-4">
                        <p class="text-contrast">Sobre <code>warning</code></p>
                    </div>

                    <div class="rounded border bg-background p-4">
                        <p class="text-contrast">Sobre <code>background</code></p>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Combinações</h3>

            <p>Combinações de <code>p</code>, <code>h1</code> … <code>h3</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combinações">
                <div class="flex flex-col p-4">
                    <h1>Heading 1</h1>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi
                        debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse
                        qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad
                        libero?
                    </p>

                    <h2>Heading 2</h2>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi
                        debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse
                        qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad
                        libero?
                    </p>

                    <h3>Heading 3</h3>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi
                        debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse
                        qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad
                        libero?
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Código</h3>

            <p>
                <code>code</code> inline usa fundo <code>secondary</code>. Dentro de
                <code>pre</code> o fundo some.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Código">
                <div class="flex flex-col gap-4 p-4">
                    <p>Use <code>var(--color-foreground)</code> para a cor do texto.</p>

                    <pre class="overflow-x-auto rounded bg-secondary p-4 text-sm"><code>html {
    font-family: "Inter", sans-serif;
}</code></pre>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsTypography"
});
</script>
