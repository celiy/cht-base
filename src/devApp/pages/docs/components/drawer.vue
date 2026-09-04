<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Drawer
            </h1>

            <p>
                O drawer é o <code>Modal</code> com <code>variant="drawer"</code>. Encosta em um lado da tela e pode ser arrastado para fechar.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Drawer">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Direita" @click="right = true" />
                    <Button label="Esquerda" @click="left = true" />
                    <Button label="Embaixo" @click="bottom = true" />

                    <Modal
                        size="small"
                        variant="drawer"
                        side="right"
                        :is-open="right"

                        @update:value="right = $event"
                    >
                        <template #header>
                            Drawer right
                        </template>

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
                        <template #header>
                            Drawer left
                        </template>

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
                        <template #header>
                            Drawer bottom
                        </template>

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

        <section>
            <h3>
                Props
            </h3>

            <p>
                <code>side="left / right / bottom"</code><br />
                <code>size="small / medium / large"</code>
            </p>
        </section>
    </main>
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
