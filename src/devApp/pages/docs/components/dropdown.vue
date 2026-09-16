<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Dropdown
            </h1>

            <p>
                Menu de ações a partir de um botão. Opções podem ter ícone, valor, tooltip e separadores.
                Emite <code>@click:value</code> com o <code>value</code> da opção.
                Em ecrãs estreitos abre um <code>Modal</code> <code>blank</code> por omissão
                (<code>mobileModal</code>; <code>forceModal</code> força no desktop).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Dropdown">
                <div class="p-4 max-w-xs flex flex-col gap-2">
                    <Dropdown
                        header="Ações"

                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope', tooltip: 'Abrir caixa de entrada' },
                            { separator: true },
                            { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket', variant: 'destructive' }
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
            <h3>
                Pesquisa
            </h3>

            <p>
                <code>:search="{ external: false }"</code> mostra um campo no topo da lista e filtra por
                <code>label</code> (e por <code>value</code> se nada bater no label).
                Ao abrir, o campo recebe foco e o primeiro item fica pré-selecionado; setas navegam, Enter confirma, Esc fecha.
                <code>:search="{ external: true, field: 'modelo' }"</code> deixa a filtragem a cargo do pai
                e emite <code>search:external</code> com <code>{ field, value }</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa">
                <div class="p-4 max-w-xs">
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
            <h3>
                Fechar ao selecionar
            </h3>

            <p>
                <code>closeOnSelect</code> (padrão <code>true</code>) fecha o painel depois do clique.
                Passe <code>false</code> para menus que precisam de vários cliques seguidos.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fechar ao selecionar">
                <div class="p-4 max-w-xs">
                    <Dropdown
                        header="Permanece aberto"
                        :close-on-select="false"
                        :mobile-modal="false"
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope', tooltip: 'Abrir caixa de entrada' },
                            { separator: true },
                            { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket', variant: 'destructive' }
                        ]"

                        @click:value="lastClicked = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Modal
            </h3>

            <p>
                <code>mobileModal</code> (padrão <code>true</code>) usa um modal blank abaixo de
                <code>768px</code>. <code>:mobileModal="false"</code> mantém o painel flutuante.
                <code>forceModal</code> abre o modal também no desktop.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Modal no desktop">
                <div class="p-4 max-w-xs">
                    <Dropdown
                        header="Forçar modal"
                        force-modal

                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope' },
                            { separator: true },
                            { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket', variant: 'destructive' }
                        ]"

                        @click:value="lastClicked = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Botão customizado
            </h3>

            <p>
                O slot <code>#button</code> recebe <code>isOpen</code>, <code>toggle</code>, <code>open</code> e <code>close</code>.
                <code>buttonVariant</code> e <code>buttonAtributes</code> valem só para o botão padrão.
                <code>hideDropdownArrow</code> esconde a seta desse botão.
                O painel tem largura mínima de <code>192px</code> (<code>minWidthPx</code>); o valor final é o maior entre o trigger e esse mínimo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Botão customizado">
                <div class="p-4 max-w-xs">
                    <Dropdown
                        :options="[
                            { label: 'Conta' },
                            { label: 'Perfil', value: 'user', icon: 'fa-user' },
                            { label: 'Email', value: 'email', icon: 'fa-envelope' },
                            { separator: true },
                            { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket', variant: 'destructive' }
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
            <h3>
                Aberto controlado
            </h3>

            <p>
                <code>v-model:open</code> controla o painel com um boolean.
                Sem slot <code>#button</code>, o trigger interno some: use um botão à parte.
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
                                { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket', variant: 'destructive' }
                            ]"

                            @click:value="lastClicked = $event"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Submenu
            </h3>

            <p>
                Uma opção com <code>options</code> abre um painel ao lado no hover ou no clique.
                <code>openOn="click"</code> restringe a abertura ao clique.
                O submenu pode ter mais <code>options</code> (aninhamento).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Submenu">
                <div class="p-4 max-w-xs">
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
            <h3>
                Opções
            </h3>

            <p>
                Cada item: <code>label</code>, <code>value</code> (obrigatório para ser clicável),
                <code>icon</code> (classe Font Awesome, ex. <code>fa-user</code>),
                <code>tooltip</code>, <code>separator: true</code> para uma linha divisória e
                <code>variant: "destructive"</code> para ações de exclusão (texto vermelho).
                Itens só com <code>label</code> (sem <code>value</code>) viram cabeçalhos de grupo.
                <code>options</code> no item abre um submenu ao lado; <code>disabled</code> impede o clique.
            </p>
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
