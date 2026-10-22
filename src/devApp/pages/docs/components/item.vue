<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Item</h1>

            <p>
                Mini card com ícone, título e descrição opcional. A cor do ícone e da superfície vem
                de <code>variant</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Item">
                <div class="flex max-w-sm flex-col gap-2 p-4">
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
            <h3>Tipos</h3>

            <p><code>type="card"</code> ou <code>type="alert"</code>. <code>card</code>, o padrão, usa um recorte colorido atrás do ícone. <code>alert</code> deixa o ícone solto, no estilo de aviso.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="grid gap-4 p-4">
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
            <h3>Cores</h3>

            <p>
                <code>variant="primary / secondary / success / warning / destructive / info"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cores">
                <div class="grid gap-2 p-4 sm:grid-cols-2">
                    <Item
                        label="Primary"
                        icon="fa-star"
                        variant="primary"
                        description="Variante primary"
                    />

                    <Item
                        label="Secondary"
                        icon="fa-layer-group"
                        variant="secondary"
                        description="Variante secondary"
                    />

                    <Item
                        label="Success"
                        icon="fa-check"
                        variant="success"
                        description="Variante success"
                    />

                    <Item
                        label="Warning"
                        icon="fa-triangle-exclamation"
                        variant="warning"
                        description="Variante warning"
                    />

                    <Item
                        label="Destructive"
                        icon="fa-trash"
                        variant="destructive"
                        description="Variante destructive"
                    />

                    <Item
                        label="Info"
                        icon="fa-circle-info"
                        variant="info"
                        description="Variante info"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Ícone</h3>

            <p><code>icon</code> aceita o nome do Font Awesome com ou sem prefixo, como <code>user</code> ou <code>fa-user</code>. Classes extras, como <code>fa-regular</code>, podem ir na própria string. O padrão é <code>fa-circle</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ícone">
                <div class="flex max-w-sm flex-col gap-2 p-4">
                    <Item
                        label="Só o nome"
                        icon="user"
                        description="user"
                    />
                    <Item
                        label="Com prefixo"
                        icon="fa-bell"
                        description="fa-bell"
                    />
                    <Item
                        label="Regular"
                        icon="fa-regular fa-star"
                        description="fa-regular fa-star"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanho e posição</h3>

            <p><code>itemIconSize="sm"</code>, <code>"md"</code> ou <code>"lg"</code> ajusta o tamanho do ícone. O padrão é <code>md</code>. <code>position="start"</code>, <code>"center"</code> ou <code>"end"</code> alinha o ícone e o conteúdo no eixo transversal. O padrão é <code>center</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex max-w-sm flex-col gap-2 p-4">
                    <Item
                        label="Pequeno"
                        description="itemIconSize sm"
                        icon="fa-user"
                        item-icon-size="sm"
                    />

                    <Item
                        label="Médio"
                        description="itemIconSize md (padrão)"
                        icon="fa-user"
                    />

                    <Item
                        label="Grande"
                        description="itemIconSize lg"
                        icon="fa-user"
                        item-icon-size="lg"
                    />
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Posição">
                <div class="flex max-w-sm flex-col gap-2 p-4">
                    <Item
                        label="Start"
                        description="Descrição longa para mostrar o alinhamento do ícone com o texto em múltiplas linhas."
                        icon="fa-align-left"
                        position="start"
                    />

                    <Item
                        label="Center"
                        description="Descrição longa para mostrar o alinhamento do ícone com o texto em múltiplas linhas."
                        icon="fa-align-center"
                        position="center"
                    />

                    <Item
                        label="End"
                        description="Descrição longa para mostrar o alinhamento do ícone com o texto em múltiplas linhas."
                        icon="fa-align-right"
                        position="end"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estados</h3>

            <p>
                <code>disabled</code> bloqueia o clique e esmaece o card. Clique emite
                <code>@click</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados">
                <div class="flex max-w-sm flex-col gap-2 p-4">
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

                    <p class="text-sm text-muted-foreground">Cliques: {{ clicks }}</p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customizações</h3>

            <p>A superfície do item aceita <code>backgroundStyle</code>, <code>borderStyle</code> e <code>hoverStyle</code>. Para o ícone, use <code>itemBackgroundStyle</code>, que pinta o fundo do recorte, e <code>itemIconStyle</code>, que recebe classes do próprio ícone.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customizações">
                <div class="flex max-w-sm flex-col gap-2 p-4">
                    <Item
                        label="Fundo"
                        description='background-style="bg-muted"'
                        icon="fa-palette"
                        background-style="bg-muted"
                    />

                    <Item
                        label="Borda"
                        description='border-style="border-2-yellow-500"'
                        icon="fa-border-all"
                        border-style="border-2-yellow-500"
                    />

                    <Item
                        label="Hover"
                        description='hover-style="hover:opacity-50"'
                        icon="fa-hand-pointer"
                        hover-style="hover:opacity-50"
                    />

                    <Item
                        label="Combinado"
                        description="fundo + borda + hover"
                        icon="fa-star"
                        background-style="bg-blue-700 text-white"
                        border-style="border-2-green-500"
                        hover-style="hover:opacity-50"
                    />

                    <Item
                        label="Ícone"
                        description='item-background-style="bg-green-600" item-icon-style="text-white"'
                        icon="fa-check"
                        item-background-style="bg-green-600"
                        item-icon-style="text-white"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
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
