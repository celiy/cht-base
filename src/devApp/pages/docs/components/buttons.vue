<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Button
            </h1>

            <p class="text-muted-foreground!">
                Botão de ação com variantes de cor, tamanho e forma.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2 items-center">
                        <Button label="Default" />
                        <Button label="Primary" variant="primary" />
                        <Button label="Secondary" variant="secondary" />
                        <Button label="Success" variant="success" />
                        <Button label="Warning" variant="warning" />
                        <Button label="Destructive" variant="destructive" />
                        <Button label="Outline" variant="outline" />
                        <Button label="Bordered" variant="bordered" />
                        <Button label="Transparent" variant="transparent" />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="primary / default / secondary / success / warning / destructive / outline / transparent / bordered / transparent-destructive"</code>
            </p>
        </section>

        <section>
            <h3 class="mb-2">
                Tamanho
            </h3>

            <p>
                <code>size="extra-small / small / medium / large"</code>
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2 items-center">
                        <Button label="Extra small" size="extra-small" variant="secondary" />
                        <Button label="Small" size="small" variant="secondary" />
                        <Button label="Medium" size="medium" variant="secondary" />
                        <Button label="Large" size="large" variant="secondary" />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Forma e grupo
            </h3>

            <p>
                <code>shape="rounded"</code> para botão circular. Classe <code>btn-group</code> une bordas.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-col gap-4">
                        <div class="btn-group">
                            <Button label="Um" variant="bordered" :hoverEffect="false" />
                            <Button label="Dois" variant="bordered" :hoverEffect="false" />
                            <Button label="Três" variant="bordered" :hoverEffect="false" />
                        </div>

                        <Button variant="secondary" class="rounded-full!" shape="rounded" size="medium">
                            <span class="fa-solid fa-search text-sm" />
                        </Button>
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: "ComponentsButtons",

    components: {
        Card,
        Button
    }
});
</script>
