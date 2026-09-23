<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Modal</h1>

            <p>
                Painel sobreposto. Fecha com clique no backdrop, no X ou com <code>Esc</code>.
                Com <code>keep-open</code>, o backdrop e cliques fora do painel não fecham
                (o X e <code>Esc</code> continuam a fechar).                 Ao abrir, a URL ganha
                <code>?modal=[id,...]</code> (cada instância recebe um id numérico automático;
                vários abertos: <code>[1,2]</code>) com uma entrada no histórico — no mobile,
                <strong>Voltar</strong> remove a query e fecha o modal. Remover um id da URL
                manualmente também fecha o modal correspondente.
                <code>variant="blank"</code> é só um card com <code>p-4</code> e o
                <code>#body</code>, sem header nem botão de fechar. Drawer tem página própria.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Modal">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Só header e body"

                        @click="plain = true"
                    />
                    <Button
                        label="Com descrição"

                        @click="withDescription = true"
                    />
                    <Button
                        label="Com footer"

                        @click="withFooter = true"
                    />

                    <Modal
                        size="small"
                        :is-open="plain"

                        @update:value="plain = $event"
                    >
                        <template #header> Sem footer </template>

                        <template #body>
                            <p>Apenas cabeçalho e conteúdo. Esc fecha.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :is-open="withDescription"

                        @update:value="withDescription = $event"
                    >
                        <template #header> Com descrição </template>

                        <template #description> Texto auxiliar abaixo do título. </template>

                        <template #body>
                            <p>Corpo do modal com descrição no topo.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :is-open="withFooter"

                        @update:value="withFooter = $event"
                    >
                        <template #header> Completo </template>

                        <template #description> Header, description, body e footer. </template>

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
            <h3>Variantes</h3>

            <p>
                <code>variant="modal / blank / preview"</code>. <code>blank</code> não tem X nem
                título: só o conteúdo no card.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Modal"

                        @click="modal = true"
                    />
                    <Button
                        label="Blank"

                        @click="blank = true"
                    />
                    <Button
                        label="Preview"

                        @click="preview = true"
                    />

                    <Modal
                        variant="modal"
                        size="small"
                        :is-open="modal"

                        @update:value="modal = $event"
                    >
                        <template #header> Modal comum </template>

                        <template #description> Default </template>

                        <template #body>
                            <p>Variante default usado</p>
                        </template>
                    </Modal>

                    <Modal
                        variant="blank"
                        size="small"
                        :is-open="blank"

                        @update:value="blank = $event"
                    >
                        <template #body>
                            <p class="p-4">
                                Modal blank <br /><br />
                                Neste variante o modal só é um card comum.
                            </p>
                        </template>
                    </Modal>

                    <Modal
                        variant="preview"
                        size="large"
                        :is-open="preview"

                        @update:value="preview = $event"
                    >
                        <template #body>
                            <div
                                class="flex flex-col items-center justify-center gap-2 rounded bg-accent p-4"
                            >
                                <p>Modal preview</p>

                                <p>
                                    Neste variante o modal é vazio visualmente. E totalmente
                                    customizável.
                                </p>

                                <Button>Click me</Button>
                            </div>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanho</h3>

            <p>
                <code>size="extra-small / small / medium / large / extra-large"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Extra-Small"

                        @click="extrasmall = true"
                    />
                    <Button
                        label="Small"

                        @click="small = true"
                    />
                    <Button
                        label="Medium"

                        @click="medium = true"
                    />
                    <Button
                        label="Large"

                        @click="large = true"
                    />
                    <Button
                        label="Extra-large"

                        @click="extralarge = true"
                    />

                    <Modal
                        size="extra-small"
                        :is-open="extrasmall"

                        @update:value="extrasmall = $event"
                    >
                        <template #header> Extra-Small </template>

                        <template #body>
                            <p>Largura super reduzida.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :is-open="small"

                        @update:value="small = $event"
                    >
                        <template #header> Small </template>

                        <template #body>
                            <p>Largura reduzida.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="medium"
                        :is-open="medium"

                        @update:value="medium = $event"
                    >
                        <template #header> Medium </template>

                        <template #body>
                            <p>Largura padrão.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="large"
                        :is-open="large"

                        @update:value="large = $event"
                    >
                        <template #header> Large </template>

                        <template #body>
                            <p>Largura ampla para conteúdo maior.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="extra-large"
                        :is-open="extralarge"

                        @update:value="extralarge = $event"
                    >
                        <template #header> Large </template>

                        <template #body>
                            <p>Modal para conteúdos grandes</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Cor da borda</h3>

            <p>
                <code>color="info / success / warning / destructive"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cor da borda">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Warning"
                        variant="warning"

                        @click="warning = true"
                    />
                    <Button
                        label="Destructive"
                        variant="destructive"

                        @click="destructive = true"
                    />
                    <Button
                        label="Success"
                        variant="success"

                        @click="success = true"
                    />

                    <Modal
                        size="small"
                        color="warning"
                        :is-open="warning"

                        @update:value="warning = $event"
                    >
                        <template #header> Warning </template>

                        <template #body>
                            <p>Borda de aviso.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        color="destructive"
                        :is-open="destructive"

                        @update:value="destructive = $event"
                    >
                        <template #header> Destructive </template>

                        <template #body>
                            <p>Borda destrutiva.</p>
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        color="success"
                        :is-open="success"

                        @update:value="success = $event"
                    >
                        <template #header> Success </template>

                        <template #body>
                            <p>Borda de sucesso.</p>
                        </template>
                    </Modal>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Empilhamento</h3>

            <p>Vários modais abertos.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Empilhamento">
                <div class="p-4">
                    <Button
                        label="Abrir dois modais"

                        @click="openStacked"
                    />

                    <Modal
                        size="medium"
                        :is-open="outer"

                        @update:value="outer = $event"
                    >
                        <template #header> Modal de baixo </template>

                        <template #body>
                            <p class="mb-4">
                                Este fica atrás. Abra o segundo e pressione Esc: só o de cima fecha.
                            </p>

                            <Button
                                label="Abrir o de cima"

                                @click="inner = true"
                            />
                        </template>
                    </Modal>

                    <Modal
                        size="small"
                        :is-open="inner"

                        @update:value="inner = $event"
                    >
                        <template #header> Modal de cima </template>

                        <template #body>
                            <p>Esc fecha este primeiro.</p>
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
            modal: false,
            blank: false,
            preview: false,
            extrasmall: false,
            small: false,
            medium: false,
            large: false,
            extralarge: false,
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
