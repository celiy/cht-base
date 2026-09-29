<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Tabs</h1>

            <p>Abas nomeadas por slots <code>#tab-title-n</code> e <code>#tab-content-n</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tabs">
                <div class="p-4">
                    <Tabs>
                        <template #tab-title-0> Tab A </template>

                        <template #tab-content-0>
                            <Card>
                                <template #body>
                                    <p>
                                        Conteúdo da primeira aba. O site está em mobile:
                                        {{ $project.device.isMobile }}
                                    </p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-1> Tab B </template>

                        <template #tab-content-1>
                            <Card>
                                <template #body>
                                    <p>Segunda aba, com um card dentro.</p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-2> Tab C </template>

                        <template #tab-content-2>
                            <Card>
                                <template #body>
                                    <p>Terceira aba.</p>
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-3> Tab D </template>

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
            <h3>Variações</h3>

            <p>
                <code>variant="secondary / transparent"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4">
                    <Tabs variant="transparent">
                        <template #tab-title-0> Visão geral </template>

                        <template #tab-content-0>
                            <div class="rounded border border-border p-4">
                                <p>Variação transparent: indicador em borda inferior.</p>
                            </div>
                        </template>

                        <template #tab-title-1> Detalhes </template>

                        <template #tab-content-1>
                            <div class="rounded border border-border p-4">
                                <p>Conteúdo da segunda aba transparent.</p>
                            </div>
                        </template>

                        <template #tab-title-2> Histórico </template>

                        <template #tab-content-2>
                            <div class="rounded border border-border p-4">
                                <p>Terceira aba transparent.</p>
                            </div>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>

        <section>
            <h1>Lembrar conteúdo</h1>

            <p>O conteúdo dos tabs permanece salvo e não some com troca de conteúdo</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tabs">
                <div class="p-4">
                    <Tabs>
                        <template #tab-title-0> Tab A </template>

                        <template #tab-content-0>
                            <Card>
                                <template #body>
                                    <p>Count da Tab A: {{ tabACount }}</p>

                                    <Button
                                        label="Incrementar A"
                                        class="mt-2"

                                        @click="tabACount = tabACount + 1"
                                    />
                                </template>
                            </Card>
                        </template>

                        <template #tab-title-1> Tab B </template>

                        <template #tab-content-1>
                            <Card>
                                <template #body>
                                    <p>Count da Tab B: {{ tabBCount }}</p>

                                    <Button
                                        label="Incrementar B"
                                        class="mt-2"

                                        @click="tabBCount = tabBCount + 1"
                                    />
                                </template>
                            </Card>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>
    </article>
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
    },

    data() {
        return {
            tabACount: 0,
            tabBCount: 10
        };
    }
});
</script>
