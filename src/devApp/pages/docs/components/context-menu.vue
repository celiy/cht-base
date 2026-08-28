<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Context menu
            </h1>

            <p>
                Wrapper: clique direito (ou pressione no telemóvel) abre o menu no cursor.
                As opções são as mesmas do Dropdown. Emite <code>@click:value</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Context menu">
                <div class="p-4">
                    <ContextMenu
                        :options="actionOptions"

                        @click:value="lastClicked = $event"
                    >
                        <div class="rounded border border-dashed border-border bg-muted/30 p-8 text-center select-none">
                            <p class="font-medium">
                                Clique direito aqui
                            </p>

                            <p class="mt-1 text-sm text-muted-foreground">
                                No telemóvel, pressione e segure.
                            </p>
                        </div>
                    </ContextMenu>

                    <p class="mt-3 text-sm text-muted-foreground">
                        Último valor: {{ lastClicked || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContextMenu from "@design/components/custom/ContextMenu.vue";
import type { OptionItem } from "@design/components/internal/OptionsList.vue";

export default defineComponent({
    name: "ComponentsContextMenu",

    components: {
        ContextMenu
    },

    data() {
        return {
            lastClicked: "",
            actionOptions: [
                { label: "Conta" },
                { label: "Perfil", value: "user", icon: "fa-user" },
                { label: "Email", value: "email", icon: "fa-envelope" },
                { separator: true },
                { label: "Excluir", value: "delete", icon: "fa-trash", variant: "destructive" }
            ] as OptionItem[]
        };
    }
});
</script>
