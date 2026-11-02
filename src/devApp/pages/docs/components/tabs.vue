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
            <h3>Aba ativa</h3>

            <p>
                Ao trocar de aba, o componente emite <code>change</code> e
                <code>update:modelValue</code> com o índice da aba, começando em 0. Com
                <code>v-model</code>, você também controla a aba ativa de fora. Sem ele, as abas
                guardam o próprio estado, como antes.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Aba ativa">
                <div class="flex flex-col gap-3 p-4">
                    <Tabs v-model="activeTab">
                        <template #tab-title-0> Resumo </template>

                        <template #tab-content-0>
                            <p>Conteúdo do resumo.</p>
                        </template>

                        <template #tab-title-1> Pedidos </template>

                        <template #tab-content-1>
                            <p>Conteúdo dos pedidos.</p>
                        </template>

                        <template #tab-title-2> Faturas </template>

                        <template #tab-content-2>
                            <p>Conteúdo das faturas.</p>
                        </template>
                    </Tabs>

                    <div class="flex items-center gap-2">
                        <small-muted>Aba ativa: {{ activeTab }}</small-muted>

                        <Button
                            label="Ir para Faturas"
                            size="small"
                            variant="secondary"

                            @click="activeTab = 2"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Abrir ao passar o mouse</h3>

            <p>
                Com <code>open-on-hover</code>, a aba abre quando o mouse entra no botão dela. O
                clique continua funcionando, então em telas de toque nada muda. O padrão é
                <code>false</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Abrir ao passar o mouse">
                <div class="p-4">
                    <Tabs
                        variant="transparent"
                        open-on-hover
                    >
                        <template #tab-title-0> Produtos </template>

                        <template #tab-content-0>
                            <p>Lista de produtos.</p>
                        </template>

                        <template #tab-title-1> Serviços </template>

                        <template #tab-content-1>
                            <p>Lista de serviços.</p>
                        </template>

                        <template #tab-title-2> Contato </template>

                        <template #tab-content-2>
                            <p>Formas de contato.</p>
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Slot na barra</h3>

            <p>
                O slot <code>#tab-bar</code> coloca o que você quiser na barra das abas, depois dos
                botões, como um botão de adicionar. Na posição lateral ele fica embaixo dos botões.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slot na barra">
                <div class="p-4">
                    <Tabs>
                        <template #tab-title-0> Rascunho 1 </template>

                        <template #tab-content-0>
                            <p>Primeiro rascunho.</p>
                        </template>

                        <template #tab-title-1> Rascunho 2 </template>

                        <template #tab-content-1>
                            <p>Segundo rascunho.</p>
                        </template>

                        <template #tab-bar>
                            <Button
                                size="small"
                                variant="transparent"
                                left-icon="fa-plus"
                                aria-label="Novo rascunho"
                            />
                        </template>
                    </Tabs>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Posição</h3>

            <p>
                <code>position="top / bottom / left / right"</code> define o lado das abas em
                relação ao conteúdo. O padrão é <code>top</code>. Nas laterais, os botões ficam
                empilhados e o conteúdo ocupa o resto da largura. No <code>transparent</code>, o
                indicador fica sempre no lado da aba que encosta no conteúdo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Posição">
                <div class="flex flex-col gap-4 p-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <Button
                            label="top"
                            size="small"
                            :variant="tabsPosition === 'top' ? 'primary' : 'secondary'"

                            @click="tabsPosition = 'top'"
                        />

                        <Button
                            label="bottom"
                            size="small"
                            :variant="tabsPosition === 'bottom' ? 'primary' : 'secondary'"

                            @click="tabsPosition = 'bottom'"
                        />

                        <Button
                            label="left"
                            size="small"
                            :variant="tabsPosition === 'left' ? 'primary' : 'secondary'"

                            @click="tabsPosition = 'left'"
                        />

                        <Button
                            label="right"
                            size="small"
                            :variant="tabsPosition === 'right' ? 'primary' : 'secondary'"

                            @click="tabsPosition = 'right'"
                        />
                    </div>

                    <Tabs :position="tabsPosition">
                        <template #tab-title-0> Geral </template>

                        <template #tab-content-0>
                            <div class="rounded border p-4">
                                <p>Configurações gerais.</p>
                            </div>
                        </template>

                        <template #tab-title-1> Segurança </template>

                        <template #tab-content-1>
                            <div class="rounded border p-4">
                                <p>Senha e autenticação.</p>
                            </div>
                        </template>

                        <template #tab-title-2> Notificações </template>

                        <template #tab-content-2>
                            <div class="rounded border p-4">
                                <p>E-mail e push.</p>
                            </div>
                        </template>
                    </Tabs>

                    <Tabs
                        variant="transparent"
                        :position="tabsPosition"
                    >
                        <template #tab-title-0> Geral </template>

                        <template #tab-content-0>
                            <div class="rounded border p-4">
                                <p>Variação transparent.</p>
                            </div>
                        </template>

                        <template #tab-title-1> Segurança </template>

                        <template #tab-content-1>
                            <div class="rounded border p-4">
                                <p>O indicador acompanha o lado.</p>
                            </div>
                        </template>

                        <template #tab-title-2> Notificações </template>

                        <template #tab-content-2>
                            <div class="rounded border p-4">
                                <p>Terceira aba.</p>
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
            tabBCount: 10,
            activeTab: 0,
            tabsPosition: "top" as "top" | "bottom" | "left" | "right"
        };
    }
});
</script>
