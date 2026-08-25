<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Accordion
            </h1>

            <p>
                Uma pilha ou conjunto independente de cabeçalhos que, quando clicados, revelam o conteúdo interno.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Accordion">
                <div class="p-4">
                    <Accordion variant="bordered" header="Este é um accordion">
                        <p>Qualquer conteúdo pode ser colocado dentro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>
                    <Accordion variant="bordered" header="Você pode ter eles empilhados">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>
                    <Accordion variant="bordered" header="Este é o tipo bordado">
                        <p>É o tipo apropriado para empilhar conteúdo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                Accordions atualmente têm duas variações; bordado e padrão. <br />
                <code>variant="default / bordered"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4">
                    <Accordion class="mb-4" variant="bordered" header="Variação bordada">
                        <p>Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>

                    <Accordion variant="default" header="Variação padrão">
                        <p>Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Fixável
            </h3>

            <p>
                Um accordion pode ser "fixado" dado a prop <code>pinnable</code>. Quando um accordion é fixado, ele não fecha quando clicado em outros accordions ou fora dele.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fixável">
                <div class="p-4 flex flex-col gap-2">
                    <Accordion pinnable variant="default" header="Variação padrão fixável">
                        <p>Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>

                    <Accordion variant="default" header="Variação padrão não fixável">
                        <p>Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>

                    <Accordion variant="default" header="Variação padrão não fixável">
                        <p>Conteúdo de exemplo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro modi facere atque voluptates, minus officia aperiam commodi odio, voluptas amet esse adipisci placeat ut? Fuga quidem doloremque recusandae inventore distinctio.</p>
                    </Accordion>
                </div>
            </DocsExample>
        </section>
    </main>
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