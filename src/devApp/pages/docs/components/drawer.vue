<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Drawer</h1>

            <p>
                O drawer é o <code>Modal</code> com <code>variant="drawer"</code>. Encosta em um
                lado da tela e pode ser arrastado para fechar.
            </p>
        </section>

        <section>
            <h3>Arrastar para fechar</h3>

            <p>No toque, o drawer segue o dedo quando o gesto vai na direção de fechar. Essa direção é para a esquerda, para a direita ou para baixo, conforme o <code>side</code>. Soltar depois de cerca de 12% da tela, ou com um movimento rápido, fecha o drawer. Antes disso, ele volta ao lugar. Ao fechar, ele continua deslizando a partir do ponto em que foi solto.</p>

            <p>O gesto fica com o conteúdo quando faz sentido. No drawer de baixo, arrastar com o corpo já rolado faz a rolagem voltar ao topo. Nos laterais, áreas com arrasto horizontal próprio, como carrossel, slider ou rolagem lateral, não fecham o drawer. Botões, links e campos nunca iniciam o arrasto. No mouse, o arrasto começa pelo cabeçalho ou pela alça, para o texto do corpo continuar selecionável.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Drawer">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Direita"

                        @click="right = true"
                    />
                    <Button
                        label="Esquerda"

                        @click="left = true"
                    />
                    <Button
                        label="Embaixo"

                        @click="bottom = true"
                    />

                    <Modal
                        size="small"
                        variant="drawer"
                        side="right"
                        :is-open="right"

                        @update:value="right = $event"
                    >
                        <template #header> Drawer right </template>

                        <template #description>
                            Arraste para direita ou use Esc / backdrop.
                        </template>

                        <template #body>
                            <p>Painel à direita.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        variant="drawer"
                        side="left"
                        :is-open="left"

                        @update:value="left = $event"
                    >
                        <template #header> Drawer left </template>

                        <template #description>
                            Arraste para esquerda ou use Esc / backdrop.
                        </template>

                        <template #body>
                            <p>Painel à esquerda.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="medium"
                        variant="drawer"
                        side="bottom"
                        :is-open="bottom"

                        @update:value="bottom = $event"
                    >
                        <template #header> Drawer bottom </template>

                        <template #description>
                            Arraste para baixo ou use Esc / backdrop.
                        </template>

                        <template #body>
                            <p>Arraste para baixo ou use Esc / backdrop.</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Modal from "@design/components/Modal.vue";

export default defineComponent({
    name: "ComponentsDrawer",

    components: {
        Button,
        Modal
    },

    data() {
        return {
            right: false,
            left: false,
            bottom: false
        };
    }
});
</script>
