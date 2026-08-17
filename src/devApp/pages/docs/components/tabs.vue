<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Tabs
            </h1>

            <p class="text-muted-foreground!">
                Abas nomeadas por slots <code>#tab-title-n</code> e <code>#tab-content-n</code>.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Tabs>
                            <template #tab-title-0>
                                Tab A
                            </template>

                            <template #tab-content-0>
                                <Card>
                                    <template #body>
                                        Conteúdo da primeira aba. O site está em mobile: {{ $project.device.isMobile }}
                                    </template>
                                </Card>
                            </template>

                            <template #tab-title-1>
                                Tab B
                            </template>

                            <template #tab-content-1>
                                <Card>
                                    <template #body>
                                        Segunda aba, com um card dentro.
                                    </template>
                                </Card>
                            </template>

                            <template #tab-title-2>
                                Tab C
                            </template>

                            <template #tab-content-2>
                                <Card>
                                    <template #body>
                                        Terceira aba.
                                    </template>
                                </Card>
                            </template>

                            <template #tab-title-3>
                                Tab D
                            </template>

                            <template #tab-content-3>
                                <Card>
                                    <template #body>
                                        Quarta aba.
                                    </template>
                                </Card>
                            </template>
                        </Tabs>
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="secondary / transparent"</code>
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Tabs variant="transparent">
                            <template #tab-title-0>
                                Visão geral
                            </template>

                            <template #tab-content-0>
                                <div class="border border-border rounded-lg p-4">
                                    Variação transparent: indicador em borda inferior.
                                </div>
                            </template>

                            <template #tab-title-1>
                                Detalhes
                            </template>

                            <template #tab-content-1>
                                <div class="border border-border rounded-lg p-4">
                                    Conteúdo da segunda aba transparent.
                                </div>
                            </template>

                            <template #tab-title-2>
                                Histórico
                            </template>

                            <template #tab-content-2>
                                <div class="border border-border rounded-lg p-4">
                                    Terceira aba transparent.
                                </div>
                            </template>
                        </Tabs>
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Tabs from "@design/components/Tabs.vue";

export default defineComponent({
    name: "ComponentsTabs",

    components: {
        Card,
        Tabs
    }
});
</script>
