<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Accordion</h1>

            <p>
                Uma pilha ou conjunto independente de cabeçalhos que, quando clicados, revelam o
                conteúdo interno.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Accordion">
                <div class="p-4">
                    <Accordion
                        variant="bordered"
                        header="Este é um accordion"
                    >
                        <p>
                            Qualquer conteúdo pode ser colocado dentro. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Porro modi facere atque voluptates, minus
                            officia aperiam commodi odio, voluptas amet esse adipisci placeat ut?
                            Fuga quidem doloremque recusandae inventore distinctio.
                        </p>
                    </Accordion>
                    <Accordion
                        variant="bordered"
                        header="Você pode ter eles empilhados"
                    >
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi
                            facere atque voluptates, minus officia aperiam commodi odio, voluptas
                            amet esse adipisci placeat ut? Fuga quidem doloremque recusandae
                            inventore distinctio.
                        </p>
                    </Accordion>
                    <Accordion
                        variant="bordered"
                        header="Este é o tipo bordado"
                    >
                        <p>
                            É o tipo apropriado para empilhar conteúdo Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Porro modi facere atque voluptates, minus
                            officia aperiam commodi odio, voluptas amet esse adipisci placeat ut?
                            Fuga quidem doloremque recusandae inventore distinctio.
                        </p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Variações</h3>

            <p>
                Accordions atualmente têm duas variações; bordado e padrão. <br />
                <code>variant="default / bordered"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4">
                    <Accordion
                        class="mb-4"
                        variant="bordered"
                        header="Variação bordada"
                    >
                        <p>
                            Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro modi facere atque voluptates, minus officia aperiam commodi
                            odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque
                            recusandae inventore distinctio.
                        </p>
                    </Accordion>

                    <Accordion
                        variant="default"
                        header="Variação padrão"
                    >
                        <p>
                            Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro modi facere atque voluptates, minus officia aperiam commodi
                            odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque
                            recusandae inventore distinctio.
                        </p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Fixável</h3>

            <p>
                Um accordion pode ser "fixado" dado a prop <code>pinnable</code>. Quando um
                accordion é fixado, ele não fecha quando clicado em outros accordions ou fora dele.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fixável">
                <div class="flex flex-col gap-2 p-4">
                    <Accordion
                        pinnable
                        variant="default"
                        header="Variação padrão fixável"
                    >
                        <p>
                            Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro modi facere atque voluptates, minus officia aperiam commodi
                            odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque
                            recusandae inventore distinctio.
                        </p>
                    </Accordion>

                    <Accordion
                        variant="default"
                        header="Variação padrão não fixável"
                    >
                        <p>
                            Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro modi facere atque voluptates, minus officia aperiam commodi
                            odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque
                            recusandae inventore distinctio.
                        </p>
                    </Accordion>

                    <Accordion
                        variant="default"
                        header="Variação padrão não fixável"
                    >
                        <p>
                            Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro modi facere atque voluptates, minus officia aperiam commodi
                            odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque
                            recusandae inventore distinctio.
                        </p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customizações</h3>

            <p>
                Accordion pode ter a superfície customizada via
                <code>backgroundStyle</code> e <code>borderStyle</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customizações">
                <div class="flex flex-col gap-4 p-4">
                    <Accordion
                        header='background-style="bg-muted"'
                        background-style="bg-muted"
                    >
                        <p>Fundo customizado.</p>
                    </Accordion>

                    <Accordion
                        header='border-style="border-2-primary"'
                        border-style="border-2-primary"
                    >
                        <p>Borda customizada.</p>
                    </Accordion>

                    <Accordion
                        header="Fundo + borda"
                        background-style="bg-orange-700/15"
                        border-style="border-2-orange-700"
                    >
                        <p>background-style e border-style juntos.</p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Accordion from "@design/components/Accordion.vue";

export default defineComponent({
    name: "ComponentsAccordion",

    components: {
        Accordion
    }
});
</script>
