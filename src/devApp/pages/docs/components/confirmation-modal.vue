<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Confirmation modal
            </h1>

            <p>
                Modal de confirmação com ícone, título, descrição, corpo e botões de cancelar / confirmar.
                Empilha com outros modais: só o do topo fecha com backdrop, X ou Escape.
            </p>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant</code> pinta o ícone e o botão de confirmar:
                <code>destructive</code>, <code>success</code>, <code>warning</code> e <code>primary</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Primary" variant="primary" @click="open.primary = true" />
                    <Button label="Warning" variant="warning" @click="open.warning = true" />
                    <Button label="Success" variant="success" @click="open.success = true" />
                    <Button label="Destructive" variant="destructive" @click="open.destructive = true" />

                    <ConfirmationModal
                        variant="primary"
                        title="Confirmar ação"
                        description="Variante primary."
                        body="Deseja continuar?"
                        confirm-text="Confirmar"
                        cancel-text="Cancelar"
                        :is-open="open.primary"

                        @update:is-open="open.primary = $event"
                        @confirm="open.primary = false"
                        @cancel="open.primary = false"
                    />

                    <ConfirmationModal
                        variant="warning"
                        title="Atenção"
                        description="Variante warning."
                        body="Esta ação pode ser revertida."
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
                        body="Confirme para aplicar as alterações."
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
                        body="Esta ação não pode ser desfeita."
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

        <section>
            <h3>
                Tamanho
            </h3>

            <p>
                <code>size="small / medium / large"</code> (padrão <code>small</code>), o mesmo contrato do <code>Modal</code>.
                <code>confirmText</code> e <code>cancelText</code> aceitam string ou <code>false</code> para omitir o botão.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button label="Small" variant="secondary" @click="open.small = true" />
                    <Button label="Medium" variant="secondary" @click="open.medium = true" />
                    <Button label="Large" variant="secondary" @click="open.large = true" />

                    <ConfirmationModal
                        size="small"
                        variant="primary"
                        title="Small"
                        description="size=&quot;small&quot;"
                        body="Largura compacta, padrão do componente."
                        :is-open="open.small"

                        @update:is-open="open.small = $event"
                        @confirm="open.small = false"
                        @cancel="open.small = false"
                    />

                    <ConfirmationModal
                        size="medium"
                        variant="primary"
                        title="Medium"
                        description="size=&quot;medium&quot;"
                        body="Mais espaço para o texto do corpo."
                        :is-open="open.medium"

                        @update:is-open="open.medium = $event"
                        @confirm="open.medium = false"
                        @cancel="open.medium = false"
                    />

                    <ConfirmationModal
                        size="large"
                        variant="primary"
                        title="Large"
                        description="size=&quot;large&quot;"
                        body="Use quando o texto de confirmação for longo ou precisar de mais respiro."
                        :is-open="open.large"

                        @update:is-open="open.large = $event"
                        @confirm="open.large = false"
                        @cancel="open.large = false"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
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
                primary: false,
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
