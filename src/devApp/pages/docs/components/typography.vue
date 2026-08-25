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
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Texto e lista">
                <div class="p-4 flex flex-col">
                    <p>
                        Texto corrente com <code>p</code>.
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

                    <pre class="bg-secondary rounded-lg p-4 overflow-x-auto text-sm"><code>html {
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
