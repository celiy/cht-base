<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Typography
            </h1>

            <p>
                Família <code>Inter</code> (400, 500, 700). Tamanhos e pesos dos headings vêm de <code>style.css</code>.
            </p>
        </section>

        <section>
            <h3>
                Headings
            </h3>

            <p>
                <code>h1</code> … <code>h6</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Headings">
                <div class="p-4 flex flex-col">
                    <h1>
                        Heading 1
                    </h1>
                    <h2>
                        Heading 2
                    </h2>
                    <h3>
                        Heading 3
                    </h3>
                    <h4>
                        Heading 4
                    </h4>
                    <h5>
                        Heading 5
                    </h5>
                    <h6>
                        Heading 6
                    </h6>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Corpo e pesos
            </h3>

            <p>
                Texto corrente com <code>p</code>, <code>small</code> e <code>li</code>.
                Ênfase com <code>b</code> (negrito) e <code>i</code> (itálico).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Texto e lista">
                <div class="p-4 flex flex-col">
                    <p>
                        Texto corrente com <code>p</code>. Use <b>negrito</b> para destaque
                        e <i>itálico</i> para ênfase.
                    </p>

                    <small>
                        Texto pequeno com <code>small</code>.
                    </small>

                    <li>
                        Item de lista 1
                    </li>
                    <li>
                        Item de lista 2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias recusandae quae ducimus in cupiditate deleniti vitae voluptas dolore velit tenetur aspernatur, eius voluptates laudantium corporis. Temporibus voluptas id aut fugit!
                    </li>
                    <li>
                        Item de lista 3
                    </li>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Ênfase
            </h3>

            <p>
                <code>b</code> aplica <code>font-bold</code>.
                <code>i</code> aplica <code>italic</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Negrito e itálico">
                <div class="p-4 flex flex-col gap-2">
                    <p>
                        Frase com <b>trecho em negrito</b> no meio.
                    </p>

                    <p>
                        Frase com <i>trecho em itálico</i> no meio.
                    </p>

                    <p>
                        Os dois juntos: <b>negrito com <i>itálico</i> dentro</b>.
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Contraste
            </h3>

            <p>
                <code>text-contrast</code> escolhe <code>--color-foreground</code> ou
                <code>--color-background</code> (com <code>!important</code>) consoante o fundo
                for escuro ou claro.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="text-contrast">
                <div class="p-4 grid sm:grid-cols-2 gap-3">
                    <div class="rounded p-4 bg-primary">
                        <p class="text-contrast">
                            Sobre <code>primary</code>
                        </p>
                    </div>

                    <div class="rounded p-4 bg-secondary">
                        <p class="text-contrast">
                            Sobre <code>secondary</code>
                        </p>
                    </div>

                    <div class="rounded p-4 bg-warning">
                        <p class="text-contrast">
                            Sobre <code>warning</code>
                        </p>
                    </div>

                    <div class="rounded p-4 bg-background border">
                        <p class="text-contrast">
                            Sobre <code>background</code>
                        </p>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Combinações
            </h3>

            <p>
                Combinações de <code>p</code>, <code>h1</code> … <code>h3</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combinações">
                <div class="p-4 flex flex-col">
                    <h1>
                        Heading 1
                    </h1>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad libero?
                    </p>

                    <h2>
                        Heading 2
                    </h2>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad libero?
                    </p>

                    <h3>
                        Heading 3
                    </h3>
                    <p class="mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi debitis pariatur praesentium itaque consequatur dignissimos tenetur. Esse qui suscipit in eos tempora, nulla modi voluptatum possimus, ratione, ad libero?
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Código
            </h3>

            <p>
                <code>code</code> inline usa fundo <code>secondary</code>. Dentro de <code>pre</code> o fundo some.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Código">
                <div class="p-4 flex flex-col gap-4">
                    <p>
                        Use <code>var(--color-foreground)</code> para a cor do texto.
                    </p>

                    <pre class="bg-secondary rounded p-4 overflow-x-auto text-sm"><code>html {
    font-family: "Inter", sans-serif;
}</code></pre>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsTypography"
});
</script>
