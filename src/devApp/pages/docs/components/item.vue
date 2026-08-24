<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Item
            </h1>

            <p class="text-muted-foreground!">
                Mini card no mesmo formato do radio/checkbox em <code>variant="card"</code>, com ícone e cores no lugar do controle.
                Título e descrição usam <code>select-none</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Item">
                <div class="p-4 flex flex-col gap-2 max-w-sm">
                    <Item
                        label="Perfil"
                        description="Dados da conta e preferências."
                        icon="fa-user"
                    />

                    <Item
                        label="Notificações"
                        description="E-mail e push."
                        icon="fa-bell"
                        variant="warning"
                        :selected="true"
                    />

                    <Item
                        label="Segurança"
                        icon="fa-shield-halved"
                        variant="success"
                        :hover-effect="true"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Cores
            </h3>

            <p>
                <code>variant="primary / secondary / success / warning / destructive / info"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cores">
                <div class="p-4 grid gap-2 sm:grid-cols-2">
                    <Item label="Primary" icon="fa-star" variant="primary" :selected="true" />
                    <Item label="Secondary" icon="fa-layer-group" variant="secondary" :selected="true" />
                    <Item label="Success" icon="fa-check" variant="success" :selected="true" />
                    <Item label="Warning" icon="fa-triangle-exclamation" variant="warning" :selected="true" />
                    <Item label="Destructive" icon="fa-trash" variant="destructive" :selected="true" />
                    <Item label="Info" icon="fa-circle-info" variant="info" :selected="true" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Estados
            </h3>

            <p>
                <code>selected</code> aplica o fundo da cor. <code>disabled</code> bloqueia o clique.
                <code>hoverEffect</code> (padrão <code>false</code>) clareia o card no hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados">
                <div class="p-4 flex flex-col gap-2 max-w-sm">
                    <Item
                        label="Clicável"
                        description="Emite @click."
                        icon="fa-hand-pointer"
                        :hover-effect="true"
                        @click="clicks += 1"
                    />

                    <Item
                        label="Desabilitado"
                        description="Sem interação."
                        icon="fa-ban"
                        :disabled="true"
                    />

                    <p class="text-sm text-muted-foreground">
                        Cliques: {{ clicks }}
                    </p>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "@design/components/Item.vue";

export default defineComponent({
    name: "ComponentsItem",

    components: {
        Item
    },

    data() {
        return {
            clicks: 0
        };
    }
});
</script>
