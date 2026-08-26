<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Item
            </h1>

            <p>
                Mini card com ícone, título e descrição opcional.
                A cor do ícone e da superfície vem de <code>variant</code>.
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
                    />

                    <Item
                        label="Segurança"
                        icon="fa-shield-halved"
                        variant="success"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tipos
            </h3>

            <p>
                <code>type="card / alert"</code>.
                <code>card</code> (padrão) usa um recorte colorido atrás do ícone.
                <code>alert</code> deixa o ícone solto, no estilo de aviso.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="p-4 grid gap-4">
                    <Item
                        label="Card"
                        icon="fa-star"
                        variant="secondary"
                        description="type padrão, com fundo no ícone."
                    />

                    <Item
                        icon="fa-circle-info"
                        variant="info"
                        type="alert"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Use para avisos e mensagens longas."
                    />

                    <Item
                        icon="fa-check"
                        variant="success"
                        type="alert"
                        description="Mensagem de sucesso — variante success para avisos positivos."
                    />

                    <Item
                        icon="fa-circle-exclamation"
                        variant="warning"
                        type="alert"
                        description="Mensagem de aviso — variante warning para alertas e cautelas."
                    />

                    <Item
                        icon="fa-circle-xmark"
                        variant="destructive"
                        type="alert"
                        description="Mensagem destrutiva — variante destructive para erros ou bloqueios."
                    />
        
                    <Item
                        icon="fa-home"
                        variant="secondary"
                        type="alert"
                        description="Mensagem secondary — variante secondary para texto comuns."
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Cores
            </h3>

            <p>
                <code>variant="primary / secondary / success / warning / destructive / info"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cores">
                <div class="p-4 grid gap-2 sm:grid-cols-2">
                    <Item label="Primary" icon="fa-star" variant="primary" />
                    <Item label="Secondary" icon="fa-layer-group" variant="secondary" />
                    <Item label="Success" icon="fa-check" variant="success" />
                    <Item label="Warning" icon="fa-triangle-exclamation" variant="warning" />
                    <Item label="Destructive" icon="fa-trash" variant="destructive" />
                    <Item label="Info" icon="fa-circle-info" variant="info" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Ícone
            </h3>

            <p>
                <code>icon</code> aceita o nome Font Awesome com ou sem prefixo
                (<code>user</code> ou <code>fa-user</code>).
                Classes extras como <code>fa-regular</code> podem ir na string inteira.
                O padrão é <code>fa-circle</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ícone">
                <div class="p-4 flex flex-col gap-2 max-w-sm">
                    <Item label="Só o nome" icon="user" description="user" />
                    <Item label="Com prefixo" icon="fa-bell" description="fa-bell" />
                    <Item label="Regular" icon="fa-regular fa-star" description="fa-regular fa-star" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Estados
            </h3>

            <p>
                <code>disabled</code> bloqueia o clique e esmaece o card.
                Clique emite <code>@click</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados">
                <div class="p-4 flex flex-col gap-2 max-w-sm">
                    <Item
                        label="Clicável"
                        description="Emite @click."
                        icon="fa-hand-pointer"
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
