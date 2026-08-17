<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Tooltip
            </h1>

            <p class="text-muted-foreground!">
                Diretiva <code>v-tooltip</code>. Aceita string ou objeto com <code>content</code>, <code>placement</code> e <code>html</code>.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2">
                        <Button v-tooltip="'Texto curto'">
                            Curto
                        </Button>

                        <Button v-tooltip="'Lorem ipsum dolor sit amet consectetur adipisicing elit.'">
                            Longo
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
    name: "ComponentsTooltip",

    components: {
        Card,
        Button
    }
});
</script>
