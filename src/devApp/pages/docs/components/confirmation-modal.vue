<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Confirmation modal</h1>

            <p>
                Modal de confirmação com ícone, título, descrição, corpo e botões de cancelar /
                confirmar. Empilha com outros modais: só o do topo fecha com backdrop, X ou Escape.
            </p>
        </section>

        <section>
            <h3>Variações</h3>

            <p>
                <code>variant</code> pinta o ícone e o botão de confirmar: <code>destructive</code>,
                <code>success</code>, <code>warning</code> e <code>primary</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="flex flex-wrap gap-2 p-4">
                    <Button
                        label="Info"
                        variant="info"

                        @click="open.info = true"
                    />

                    <Button
                        label="Warning"
                        variant="warning"

                        @click="open.warning = true"
                    />

                    <Button
                        label="Success"
                        variant="success"

                        @click="open.success = true"
                    />

                    <Button
                        label="Destructive"
                        variant="destructive"

                        @click="open.destructive = true"
                    />

                    <ConfirmationModal
                        variant="info"
                        title="Confirmar ação"
                        description="Variante info."
                        confirm-text="Confirmar"
                        cancel-text="Cancelar"
                        :is-open="open.info"

                        @update:is-open="open.info = $event"
                        @confirm="open.info = false"
                        @cancel="open.info = false"
                    >
                        <template #body>
                            <p class="pb-2 text-center">Body customizado.</p>
                        </template>
                    </ConfirmationModal>

                    <ConfirmationModal
                        variant="warning"
                        title="Atenção"
                        description="Variante warning."
                        confirm-text="Continuar"
                        cancel-text="Cancelar"
                        :is-open="open.warning"

                        @update:is-open="open.warning = $event"
                        @confirm="open.warning = false"
                        @cancel="open.warning = false"
                    />

                    <ConfirmationModal
                        variant="success"
                        title="Tudo certo"
                        description="Variante success."
                        confirm-text="Aplicar"
                        cancel-text="Voltar"
                        :is-open="open.success"

                        @update:is-open="open.success = $event"
                        @confirm="open.success = false"
                        @cancel="open.success = false"
                    />

                    <ConfirmationModal
                        variant="destructive"
                        title="Excluir registro"
                        description="Variante destructive."
                        confirm-text="Excluir"
                        cancel-text="Cancelar"
                        :is-open="open.destructive"

                        @update:is-open="open.destructive = $event"
                        @confirm="open.destructive = false"
                        @cancel="open.destructive = false"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import ConfirmationModal from "@design/components/custom/ConfirmationModal.vue";

export default defineComponent({
    name: "ComponentsConfirmationModal",

    components: {
        Button,
        ConfirmationModal
    },

    data() {
        return {
            open: {
                info: false,
                warning: false,
                success: false,
                destructive: false,
                small: false,
                medium: false,
                large: false
            }
        };
    }
});
</script>
