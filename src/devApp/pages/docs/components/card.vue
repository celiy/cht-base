<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Card
            </h1>

            <p>
                Superfície com slots de header, description, body e footer.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Card">
                <div class="p-4 flex flex-col gap-4">
                    <Card>
                        <template #header>
                            <h4>Header</h4>
                            <p class="text-muted-foreground!">Header description</p>
                        </template>

                        <template #body>
                            <p>Conteúdo do card com todos os slots. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae accusamus expedita iusto laborum corporis porro corrupti ipsum nihil optio molestiae pariatur ullam, at quia rerum sed nulla? Accusantium, veniam ea!</p>
                        </template>

                        <template #footer>
                            <p>Footer</p>
                        </template>
                    </Card>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant="default / transparent"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4 grid gap-4">
                    <Card variant="default">
                        <template #body>
                            <p>Variação default (fundo de card).</p>
                        </template>
                    </Card>

                    <Card variant="transparent">
                        <template #body>
                            <p>Variação transparent.</p>
                        </template>
                    </Card>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";

export default defineComponent({
    name: "ComponentsCard",

    components: {
        Card
    }
});
</script>
