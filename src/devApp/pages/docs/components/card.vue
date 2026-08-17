<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Card
            </h1>

            <p class="text-muted-foreground!">
                Superfície com slots de header, description, body e footer.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-4">
                        <Card>
                            <template #header>
                                Header
                            </template>

                            <template #description>
                                Header description
                            </template>

                            <template #body>
                                Conteúdo do card com todos os slots.
                            </template>

                            <template #footer>
                                Footer
                            </template>
                        </Card>
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="default / transparent"</code>
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 grid gap-4">
                        <Card variant="default">
                            <template #body>
                                Variação default (fundo de card).
                            </template>
                        </Card>

                        <Card variant="transparent">
                            <template #body>
                                Variação transparent.
                            </template>
                        </Card>
                    </div>
                </template>
            </Card>
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
