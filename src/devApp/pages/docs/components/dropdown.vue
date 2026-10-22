<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Dropdown</h1>

            <p>Menu de ações a partir de um botão. As opções podem ter ícone, valor, tooltip e separadores. Ao escolher uma opção, o componente emite <code>@click:value</code> com o <code>value</code> dela. Em telas estreitas, abre um <code>Modal</code> do tipo <code>blank</code> por padrão, controlado por <code>mobileModal</code>. Use <code>forceModal</code> para forçar o modal no desktop.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Dropdown">
                <div class="flex max-w-xs flex-col gap-2 p-4">
                    <Dropdown
                        header="Ações"
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            {
                                label: 'Email',
                                value: 'email',
                                icon: 'fa-envelope',
                                tooltip: 'Abrir caixa de entrada'
                            },
                            { separator: true },
                            {
                                label: 'Sair',
                                value: 'exit',
                                icon: 'fa-right-from-bracket',
                                variant: 'destructive'
                            }
                        ]"

                        @click:value="lastClicked = $event"
                    />

                    <p class="text-sm text-muted-foreground">
                        Último valor: {{ lastClicked || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Pesquisa</h3>

            <p><code>:search="{ external: false }"</code> mostra um campo no topo e filtra por <code>label</code>, ou por <code>value</code> se o label não bater. Ao abrir, o campo ganha foco e o primeiro item fica pré-selecionado. Setas navegam, Enter confirma e Esc fecha. Com <code>:search="{ external: true, field: 'modelo' }"</code>, o pai faz a filtragem e recebe <code>search:external</code> com <code>{ field, value }</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa">
                <div class="max-w-xs p-4">
                    <Dropdown
                        header="Com pesquisa"
                        :search="{ external: false }"
                        :options="[
                            { label: 'Account', value: 'account' },
                            { label: 'Billing', value: 'billing' },
                            { label: 'Team', value: 'team' },
                            { label: 'Integrations', value: 'integrations' },
                            { label: 'API keys', value: 'api' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Fechar ao selecionar</h3>

            <p><code>closeOnSelect</code>, com padrão <code>true</code>, fecha o painel depois do clique. Passe <code>false</code> para menus que pedem vários cliques seguidos.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fechar ao selecionar">
                <div class="max-w-xs p-4">
                    <Dropdown
                        header="Permanece aberto"
                        :close-on-select="false"
                        :mobile-modal="false"
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            {
                                label: 'Email',
                                value: 'email',
                                icon: 'fa-envelope',
                                tooltip: 'Abrir caixa de entrada'
                            },
                            { separator: true },
                            {
                                label: 'Sair',
                                value: 'exit',
                                icon: 'fa-right-from-bracket',
                                variant: 'destructive'
                            }
                        ]"

                        @click:value="lastClicked = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Modal</h3>

            <p><code>mobileModal</code>, com padrão <code>true</code>, usa um modal do tipo <code>blank</code> abaixo de <code>768px</code>. Com <code>:mobileModal="false"</code>, o painel continua flutuante. <code>forceModal</code> abre o modal também no desktop.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Modal no desktop">
                <div class="max-w-xs p-4">
                    <Dropdown
                        header="Forçar modal"
                        force-modal
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope' },
                            { separator: true },
                            {
                                label: 'Sair',
                                value: 'exit',
                                icon: 'fa-right-from-bracket',
                                variant: 'destructive'
                            }
                        ]"

                        @click:value="lastClicked = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Botão customizado</h3>

            <p>O slot <code>#button</code> recebe <code>isOpen</code>, <code>toggle</code>, <code>open</code> e <code>close</code>. <code>buttonVariant</code> e <code>buttonAtributes</code> valem só para o botão padrão, e <code>hideDropdownArrow</code> esconde a seta dele. O painel tem largura mínima de <code>192px</code>, em <code>minWidthPx</code>, e usa a maior entre a do gatilho e esse mínimo.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Botão customizado">
                <div class="max-w-xs p-4">
                    <Dropdown
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope' },
                            { separator: true },
                            {
                                label: 'Sair',
                                value: 'exit',
                                icon: 'fa-right-from-bracket',
                                variant: 'destructive'
                            }
                        ]"
                    >
                        <template #button="{ toggle, isOpen }">
                            <Button
                                variant="primary"
                                :label="isOpen ? 'Fechar menu' : 'Abrir menu'"

                                @click="toggle"
                            />
                        </template>
                    </Dropdown>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Aberto controlado</h3>

            <p>
                <code>v-model:open</code> controla o painel com um boolean. Sem slot
                <code>#button</code>, o trigger interno some: use um botão à parte.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Aberto controlado">
                <div class="p-4">
                    <div class="relative w-fit">
                        <Button
                            class="p-2.5"
                            aria-label="Filtros"

                            @click.stop="externalOpen = !externalOpen"
                        >
                            <span class="fa-solid fa-filter text-xs" />
                        </Button>

                        <Dropdown
                            v-model:open="externalOpen"
                            hide-dropdown-arrow
                            :options="[
                                { label: 'Conta' },
                                { label: 'Perfil', value: 'user', icon: 'fa-user' },
                                { label: 'Email', value: 'email', icon: 'fa-envelope' },
                                { separator: true },
                                {
                                    label: 'Sair',
                                    value: 'exit',
                                    icon: 'fa-right-from-bracket',
                                    variant: 'destructive'
                                }
                            ]"

                            @click:value="lastClicked = $event"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Submenu</h3>

            <p>Uma opção com <code>options</code> abre um painel ao lado, no hover ou no clique. <code>openOn="click"</code> limita a abertura ao clique. O submenu também pode ter <code>options</code>, então há aninhamento.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Submenu">
                <div class="max-w-xs p-4">
                    <Dropdown
                        header="Com submenu"
                        :close-on-select="false"
                        :options="[
                            { label: 'Exportar', value: 'export' },
                            {
                                label: 'Status',
                                value: 'status',
                                options: [
                                    { label: 'Ativo', value: 'ativo' },
                                    { label: 'Inativo', value: 'inativo' }
                                ]
                            },
                            { label: 'Arquivar', value: 'archive' }
                        ]"

                        @click:value="lastClicked = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Opções</h3>

            <p>Cada item tem <code>label</code>, <code>value</code>, obrigatório para ser clicável, <code>icon</code>, que é a classe Font Awesome, como <code>fa-user</code>, <code>tooltip</code>, <code>separator: true</code> para uma linha divisória, e <code>variant: "destructive"</code>, que deixa o texto vermelho. Item só com <code>label</code> vira cabeçalho de grupo. <code>options</code> abre submenu ao lado, e <code>disabled</code> impede o clique.</p>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Dropdown from "@design/components/Dropdown.vue";

export default defineComponent({
    name: "ComponentsDropdown",

    components: {
        Button,
        Dropdown
    },

    data() {
        return {
            lastClicked: "",
            externalOpen: false
        };
    }
});
</script>
