<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Modal
            </h1>

            <p>
                Painel sobreposto. Fecha com clique no backdrop, no X ou com <code>Esc</code>. Drawer tem página própria.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Modal">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Só header e body" @click="plain = true" />
                    <Button label="Com descrição" @click="withDescription = true" />
                    <Button label="Com footer" @click="withFooter = true" />

                    <Modal
                        size="small"
                        :isOpen="plain"

                        @update:value="plain = $event"
                    >
                        <template #header>
                            Sem footer
                        </template>

                        <template #body>
                            <p>Apenas cabeçalho e conteúdo. Esc fecha.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :isOpen="withDescription"

                        @update:value="withDescription = $event"
                    >
                        <template #header>
                            Com descrição
                        </template>

                        <template #description>
                            Texto auxiliar abaixo do título.
                        </template>

                        <template #body>
                            <p>Corpo do modal com descrição no topo.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :isOpen="withFooter"

                        @update:value="withFooter = $event"
                    >
                        <template #header>
                            Completo
                        </template>

                        <template #description>
                            Header, description, body e footer.
                        </template>

                        <template #body>
                            <p>Use os botões ou Esc para fechar.</p>
                        </template>

                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Cancelar"
                                    variant="secondary"

                                    @click="withFooter = false"
                                />

                                <Button
                                    label="Confirmar"
                                    variant="primary"

                                    @click="withFooter = false"
                                />
                            </div>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tamanho
            </h3>

            <p>
                <code>size="small / medium / large"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Small" @click="small = true" />
                    <Button label="Medium" @click="medium = true" />
                    <Button label="Large" @click="large = true" />

                    <Modal
                        size="small"
                        :isOpen="small"

                        @update:value="small = $event"
                    >
                        <template #header>
                            Small
                        </template>

                        <template #body>
                            <p>Largura reduzida.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="medium"
                        :isOpen="medium"

                        @update:value="medium = $event"
                    >
                        <template #header>
                            Medium
                        </template>

                        <template #body>
                            <p>Largura padrão.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="large"
                        :isOpen="large"

                        @update:value="large = $event"
                    >
                        <template #header>
                            Large
                        </template>

                        <template #body>
                            <p>Largura ampla para conteúdo maior.</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Cor da borda
            </h3>

            <p>
                <code>color="primary / success / warning / destructive"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cor da borda">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Warning" variant="warning" @click="warning = true" />
                    <Button label="Destructive" variant="destructive" @click="destructive = true" />
                    <Button label="Success" variant="success" @click="success = true" />

                    <Modal
                        size="small"
                        color="warning"
                        :isOpen="warning"

                        @update:value="warning = $event"
                    >
                        <template #header>
                            Warning
                        </template>

                        <template #body>
                            <p>Borda de aviso.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        color="destructive"
                        :isOpen="destructive"

                        @update:value="destructive = $event"
                    >
                        <template #header>
                            Destructive
                        </template>

                        <template #body>
                            <p>Borda destrutiva.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        color="success"
                        :isOpen="success"

                        @update:value="success = $event"
                    >
                        <template #header>
                            Success
                        </template>

                        <template #body>
                            <p>Borda de sucesso.</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Empilhamento
            </h3>

            <p>
                Vários modais abertos.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Empilhamento">
                <div class="p-4">
                    <Button label="Abrir dois modais" @click="openStacked" />

                    <Modal
                        size="medium"
                        :isOpen="outer"

                        @update:value="outer = $event"
                    >
                        <template #header>
                            Modal de baixo
                        </template>

                        <template #body>
                            <p class="mb-4">
                                Este fica atrás. Abra o segundo e pressione Esc: só o de cima fecha.
                            </p>

                            <Button label="Abrir o de cima" @click="inner = true" />
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :isOpen="inner"

                        @update:value="inner = $event"
                    >
                        <template #header>
                            Modal de cima
                        </template>

                        <template #body>
                            <p>Esc fecha este primeiro.</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Modal from "@design/components/Modal.vue";

export default defineComponent({
    name: "ComponentsModal",

    components: {
        Button,
        Modal
    },

    data() {
        return {
            plain: false,
            withDescription: false,
            withFooter: false,
            small: false,
            medium: false,
            large: false,
            warning: false,
            destructive: false,
            success: false,
            outer: false,
            inner: false
        };
    },

    methods: {
        openStacked() {
            this.outer = true;
            this.inner = true;
        }
    }
});
</script>
