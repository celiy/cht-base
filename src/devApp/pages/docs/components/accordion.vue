<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Accordion
            </h1>

            <p class="text-muted-foreground!">
                Uma pilha ou conjunto independente de cabeçalhos que, quando clicados, revelam o conteúdo interno.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Accordion variant="bordered" header="Este é um accordion">
                            Qualquer conteúdo pode ser colocado dentro.
                        </Accordion>
                        <Accordion variant="bordered" header="Você pode ter eles empilhados">
                            E caber qualquer coisa que você quiser
                        </Accordion>
                        <Accordion variant="bordered" header="Este é o tipo bordado">
                            É o tipo apropriado para empilhar conteúdo
                        </Accordion>
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                Accordions atualmente têm duas variações; bordado e padrão. <br />
                <code>variant="default / bordered"</code>
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Accordion class="mb-4" variant="bordered" header="Variação bordada">
                            Conteúdo de exemplo
                        </Accordion>

                        <Accordion variant="default" header="Variação padrão">
                            Conteúdo de exemplo
                        </Accordion>
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Fixável
            </h3>

            <p>
                Um accordion pode ser "fixado" dado a prop <code>pinnable</code>. Quando um accordion é fixado, ele não fecha quando clicado em outros accordions ou fora dele.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-2">
                        <Accordion pinnable variant="default" header="Variação padrão fixável">
                            Conteúdo de exemplo
                        </Accordion>

                        <Accordion variant="default" header="Variação padrão não fixável">
                            Conteúdo de exemplo
                        </Accordion>

                        <Accordion variant="default" header="Variação padrão não fixável">
                            Conteúdo de exemplo
                        </Accordion>
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Accordion from "@design/components/Accordion.vue";

export default defineComponent({
    name: "ComponentsAccordion",

    components: {
        Card,
        Accordion
    }
});
</script>