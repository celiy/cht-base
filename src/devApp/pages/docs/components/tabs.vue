<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Tabs
            </h1>

            <p>
                Abas nomeadas por slots <code>#tab-title-n</code> e <code>#tab-content-n</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tabs">
                <div class="p-4">
                    <Tabs>
                        <template #tab-title-0>
                            Tab A
                        </template>

                        <template #tab-content-0>
                            <Card>
                                <template #body>
                                    <p>Conteúdo da primeira aba. O site está em mobile: {{ $project.device.isMobile }}</p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-1>
                            Tab B
                        </template>

                        <template #tab-content-1>
                            <Card>
                                <template #body>
                                    <p>Segunda aba, com um card dentro.</p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-2>
                            Tab C
                        </template>

                        <template #tab-content-2>
                            <Card>
                                <template #body>
                                    <p>Terceira aba.</p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-3>
                            Tab D
                        </template>

                        <template #tab-content-3>
                            <Card>
                                <template #body>
                                    <p>Quarta aba.</p>
                                </template>
                            </Card>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant="secondary / transparent"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4">
                    <Tabs variant="transparent">
                        <template #tab-title-0>
                            Visão geral
                        </template>

                        <template #tab-content-0>
                            <div class="border border-border rounded-lg p-4">
                                <p>Variação transparent: indicador em borda inferior.</p>
                            </div>
                        </template>

                        <template #tab-title-1>
                            Detalhes
                        </template>

                        <template #tab-content-1>
                            <div class="border border-border rounded-lg p-4">
                                <p>Conteúdo da segunda aba transparent.</p>
                            </div>
                        </template>

                        <template #tab-title-2>
                            Histórico
                        </template>

                        <template #tab-content-2>
                            <div class="border border-border rounded-lg p-4">
                                <p>Terceira aba transparent.</p>
                            </div>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
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
