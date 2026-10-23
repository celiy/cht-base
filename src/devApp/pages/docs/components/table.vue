<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Table</h1>

            <p>Tabela de dados com headers, alinhamento por coluna, seleção de linhas, escolha de colunas visíveis, badges e ações por linha. Uma célula pode ter <code>value</code> e <code>altValue</code>, com <code>buttonProps</code>, que são as mesmas props do <code>Button</code>. Assim, um botão troca entre os dois valores.</p>
        </section>

        <section>
            <h3>Alinhamento</h3>

            <p>Cada header tem <code>label</code>, <code>field</code>, que é a chave do objeto na linha, e <code>position</code>. As posições são <code>start</code>, <code>center</code> e <code>end</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Alinhamento">
                <div class="p-4">
                    <Table
                        title="Clients"
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Celular', field: 'phone', position: 'center' },
                            { label: 'Cargo', field: 'role', position: 'end' }
                        ]"
                        :data="[
                            { name: 'Celi', phone: '51 9 99329196', role: 'Dev' },
                            { name: 'Herstal', phone: '51 9 12345678', role: 'Design' },
                            { name: 'Luna', phone: '51 9 11223344', role: 'QA' },
                            { name: 'João', phone: '51 9 99887766', role: 'DevOps' },
                            { name: 'Ana', phone: '51 9 88776655', role: 'PO' },
                            { name: 'Carlos', phone: '51 9 77665544', role: 'Manager' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Valor oculto</h3>

            <p>Passe <code>{ value, altValue, buttonProps }</code> na célula. <code>value</code> é o texto inicial. O botão à direita, com as props de <code>Button</code>, mostra o <code>altValue</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Valor oculto">
                <div class="p-4">
                    <Table
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'CPF', field: 'cpf', position: 'start' }
                        ]"
                        :data="[
                            {
                                name: 'Celi',
                                cpf: {
                                    value: '***.***.***-25',
                                    altValue: '529.982.247-25',
                                    buttonProps: { variant: 'transparent', size: 'small' }
                                }
                            }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Badges</h3>

            <p>Um campo pode ser <code>{ label, variant }</code>, e aí vira um <code>Badge</code>. <code>variant</code> aceita as cores semânticas e <code>chart-1</code> a <code>chart-5</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Badges">
                <div class="p-4">
                    <Table
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Status', field: 'badge', position: 'center' }
                        ]"
                        :data="[
                            { name: 'Celi', badge: { label: 'Aprovado', variant: 'success' } },
                            { name: 'Herstal', badge: { label: 'Pendente', variant: 'warning' } },
                            { name: 'Luna', badge: { label: 'Série A', variant: 'chart-3' } }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Seleção de linhas</h3>

            <p>Com <code>selectable</code>, cada linha ganha um checkbox, e o header ganha um “selecionar todos”. Com linhas marcadas, aparece um rodapé com a contagem. <code>selectableActions</code> é a lista do Dropdown desse rodapé. O clique emite <code>click:selectableAction</code> com o <code>value</code> e as linhas selecionadas.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Seleção de linhas">
                <div class="p-4">
                    <Table
                        :selectable="true"
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Cargo', field: 'role', position: 'end' }
                        ]"
                        :data="[
                            { id: '1', name: 'Celi', role: 'Dev' },
                            { id: '2', name: 'Herstal', role: 'Design' },
                            { id: '3', name: 'Luna', role: 'PM' }
                        ]"
                        :selectable-actions="[
                            { label: 'Exportar', value: 'export', icon: 'fa-download' },
                            { separator: true },
                            {
                                label: 'Excluir itens selecionados',
                                value: 'delete',
                                icon: 'fa-trash',
                                variant: 'destructive'
                            }
                        ]"

                        @click:selectable-action="onSelectableAction"
                    />

                    <p class="mt-2 text-sm text-muted-foreground">
                        Última ação em lote: {{ lastSelectableAction || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Colunas visíveis</h3>

            <p><code>selectCols</code> mostra um Select no canto do título, para ligar e desligar colunas. Ele exige <code>title</code>. A escolha fica num memo interno, com o <code>id="table-select-cols"</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Colunas visíveis">
                <div class="p-4">
                    <Table
                        title="Colunas"
                        :select-cols="true"
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Celular', field: 'phone', position: 'center' },
                            { label: 'Cargo', field: 'role', position: 'end' }
                        ]"
                        :data="[
                            { name: 'Celi', phone: '51 9 99329196', role: 'Dev' },
                            { name: 'Herstal', phone: '51 9 12345678', role: 'Design' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Ações</h3>

            <p><code>actions</code> é a mesma lista de opções do Dropdown: <code>label</code>, <code>value</code>, <code>icon</code>, <code>tooltip</code>, <code>separator</code> e <code>variant: "destructive"</code> para exclusão. Cada linha abre o próprio menu. O clique emite <code>click:action</code> com o <code>value</code> e o objeto da linha.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ações">
                <div class="p-4">
                    <Table
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Status', field: 'badge', position: 'center' }
                        ]"
                        :data="[
                            {
                                id: '1',
                                name: 'Celi',
                                badge: { label: 'Aprovado', variant: 'success' }
                            },
                            {
                                id: '2',
                                name: 'Herstal',
                                badge: { label: 'Pendente', variant: 'warning' }
                            }
                        ]"
                        :actions="[
                            { label: 'Visualizar', value: 'inspect', icon: 'fa-eye' },
                            { label: 'Editar', value: 'edit', icon: 'fa-pen' },
                            { separator: true },
                            { label: 'Excluir', value: 'delete', icon: 'fa-trash', variant: 'destructive' }
                        ]"

                        @click:action="onRowAction"
                    />

                    <p class="mt-2 text-sm text-muted-foreground">
                        Última ação: {{ lastRowAction || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Sort de colunas</h3>

            <p>Com <code>canSort</code>, a coluna ganha um ícone de seta. Clique no header para ordenar. O evento <code>sort:field</code> traz o <code>field</code> e a direção, <code>asc</code> ou <code>desc</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Sort de colunas">
                <div class="p-4">
                    <Table
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start', canSort: true },
                            { label: 'Idade', field: 'age', position: 'center', canSort: true },
                            { label: 'Status', field: 'badge', position: 'center' }
                        ]"
                        :data="[
                            {
                                name: 'Celi',
                                age: 25,
                                badge: { label: 'Aprovado', variant: 'success' }
                            },
                            {
                                name: 'Herstal',
                                age: 30,
                                badge: { label: 'Pendente', variant: 'warning' }
                            },
                            {
                                name: 'Luna',
                                age: 28,
                                badge: { label: 'Série A', variant: 'chart-3' }
                            },
                            {
                                name: 'João',
                                age: 32,
                                badge: { label: 'Série B', variant: 'chart-4' }
                            }
                        ]"

                        @sort:field="onSortField"
                    />

                    <p class="mt-2 text-sm text-muted-foreground">
                        Última coluna ordenada: {{ lastSortField || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estado vazio</h3>

            <p>O slot <code>empty</code> aparece quando a tabela não tem registros. Use-o para mostrar um estado próprio, como um botão de ação, uma chamada ou um texto explicativo.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estado vazio">
                <div class="p-4">
                    <Table
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Status', field: 'badge', position: 'center' }
                        ]"
                        :data="[]"
                    >
                        <template #empty>
                            <div class="flex flex-col items-center gap-2 py-4">
                                <span class="font-medium text-foreground"
                                    >Nenhuma linha cadastrada</span
                                >
                                <button
                                    class="rounded bg-primary px-3 py-2 text-sm text-primary-foreground"
                                >
                                    Novo registro
                                </button>
                            </div>
                        </template>
                    </Table>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Loading</h3>

            <p></p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ações">
                <div class="p-4">
                    <Table
                        :selectable="true"
                        :headers="[
                            { label: 'Nome', field: 'name', position: 'start' },
                            { label: 'Status', field: 'badge', position: 'center' }
                        ]"
                        :loading="true"
                        :actions="[
                            { label: 'Visualizar', value: 'inspect', icon: 'fa-eye' },
                            { label: 'Editar', value: 'edit', icon: 'fa-pen' },
                            { separator: true },
                            { label: 'Excluir', value: 'delete', icon: 'fa-trash', variant: 'destructive' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@design/components/Table.vue";

export default defineComponent({
    name: "ComponentsTable",

    components: {
        Table
    },

    data() {
        return {
            lastSortField: "",
            lastRowAction: "",
            lastSelectableAction: "",
        };
    },

    methods: {
        onRowAction(value: string, item: Record<string, unknown>) {
            this.lastRowAction = `${value} · ${item.name ?? item.id}`;
        },

        onSelectableAction(value: string, items: Record<string, unknown>[]) {
            const names = items.map((item) => item.name ?? item.id).join(", ");
            this.lastSelectableAction = `${value} · ${names}`;
        },

        onSortField(field: { field: string; direction: "asc" | "desc" }) {
            this.lastSortField = `${field.field} · ${field.direction}`;
        }
    }
});
</script>
