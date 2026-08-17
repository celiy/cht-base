<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Confirmation modal
            </h1>

            <p class="text-muted-foreground!">
                Modal de confirmação com ícone, texto e botões de cancelar / confirmar.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2">
                        <Button label="Warning" variant="warning" @click="open = true" />

                        <ConfirmationModal
                            variant="warning"
                            title="Confirmar ação"
                            description="Esta ação pode ser revertida."
                            body="Deseja continuar?"
                            confirmText="Confirmar"
                            cancelText="Cancelar"
                            :isOpen="open"

                            @update:isOpen="open = $event"
                            @confirm="open = false"
                            @cancel="open = false"
                        />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="destructive / success / warning / primary"</code>
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Button from "@design/components/Button.vue";
import ConfirmationModal from "@design/components/custom/ConfirmationModal.vue";

export default defineComponent({
    name: "ComponentsConfirmationModal",

    components: {
        Card,
        Button,
        ConfirmationModal
    },

    data() {
        return {
            open: false
        };
    }
});
</script>
