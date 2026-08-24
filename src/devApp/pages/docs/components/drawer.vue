<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Drawer
            </h1>

            <p class="text-muted-foreground!">
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
                        :isOpen="right"

                        @update:value="right = $event"
                    >
                        <template #header>
                            Drawer right
                        </template>

                        <template #body>
                            Painel à direita.
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        variant="drawer"
                        side="left"
                        :isOpen="left"

                        @update:value="left = $event"
                    >
                        <template #header>
                            Drawer left
                        </template>

                        <template #body>
                            Painel à esquerda.
                        </template>
                    </Modal>

                    <Modal
                        size="medium"
                        variant="drawer"
                        side="bottom"
                        :isOpen="bottom"

                        @update:value="bottom = $event"
                    >
                        <template #header>
                            Drawer bottom
                        </template>

                        <template #body>
                            Arraste para baixo ou use Esc / backdrop.
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
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
