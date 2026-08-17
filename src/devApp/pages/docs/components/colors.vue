<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Colors
            </h1>

            <p class="text-muted-foreground!">
                Tokens CSS do tema, usados como <code>var(--color-&lt;nome&gt;)</code>.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex gap-2 flex-wrap">
                        <div
                            v-for="color of tokens"
                            :key="color.color"
                            class="w-24 h-24"
                        >
                            <div
                                class="border border-border rounded-lg h-14"
                                :style="{ backgroundColor: 'var(--color-' + color.color + ')' }"
                            />

                            <p class="text-xs h-fit leading-4!">
                                {{ color.label }}
                            </p>
                        </div>
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
    name: "ComponentsColors",

    components: {
        Card
    },

    data() {
        return {
            tokens: [
                { color: "background", label: "Background" },
                { color: "foreground", label: "Foreground" },
                { color: "card", label: "Card" },
                { color: "primary", label: "Primary" },
                { color: "secondary", label: "Secondary" },
                { color: "muted", label: "Muted" },
                { color: "accent", label: "Accent" },
                { color: "destructive", label: "Destructive" },
                { color: "success", label: "Success" },
                { color: "warning", label: "Warning" },
                { color: "info", label: "Info" },
                { color: "border", label: "Border" },
                { color: "sidebar", label: "Sidebar" },
                { color: "chart-1", label: "Chart 1" },
                { color: "chart-3", label: "Chart 3" }
            ]
        };
    }
});
</script>
