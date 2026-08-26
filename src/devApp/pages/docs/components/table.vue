<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Table
            </h1>

            <p>
                Tabela de dados com headers, alinhamento por coluna, seleção de linhas,
                escolha de colunas visíveis, badges (incluindo paleta <code>chart-*</code>) e ações por linha.
            </p>
        </section>

        <section>
            <h3>
                Alinhamento
            </h3>

            <p>
                Cada header tem <code>label</code>, <code>field</code> (chave do objeto na linha) e
                <code>position</code>: <code>start</code>, <code>center</code> ou <code>end</code>.
            </p>
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
                            { name: 'Herstal', phone: '51 9 12345678', role: 'Design' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Badges
            </h3>

            <p>
                Um campo pode ser <code>{ label, variant }</code> e renderiza um <code>Badge</code>.
                <code>variant</code> aceita as cores semânticas e <code>chart-1</code> … <code>chart-5</code>.
            </p>
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
            <h3>
                Seleção de linhas
            </h3>

            <p>
                <code>selectable</code> adiciona um checkbox por linha e um “selecionar todos” no header.
                Com linhas marcadas, aparece um rodapé com a contagem.
                <code>selectableActions</code> é a lista do Dropdown do rodapé; o clique emite
                <code>click:selectableAction</code> com o <code>value</code> e as linhas selecionadas.
            </p>
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
                        :selectableActions="selectableActions"

                        @click:selectableAction="onSelectableAction"
                    />

                    <p class="text-sm text-muted-foreground mt-2">
                        Última ação em lote: {{ lastSelectableAction || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Colunas visíveis
            </h3>

            <p>
                <code>selectCols</code> mostra um Select no canto do título para ligar e desligar colunas.
                Exige <code>title</code>. A escolha usa memo interno (<code>id="table-select-cols"</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Colunas visíveis">
                <div class="p-4">
                    <Table
                        title="Colunas"
                        :selectCols="true"
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
            <h3>
                Ações
            </h3>

            <p>
                <code>actions</code> é a mesma lista de opções do Dropdown
                (<code>label</code>, <code>value</code>, <code>icon</code>, <code>tooltip</code>, <code>separator</code>,
                <code>variant: "destructive"</code> para exclusão).
                Abre um menu por linha e emite <code>click:action</code> com o <code>value</code> e o objeto da linha.
            </p>
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
                            { id: '1', name: 'Celi', badge: { label: 'Aprovado', variant: 'success' } },
                            { id: '2', name: 'Herstal', badge: { label: 'Pendente', variant: 'warning' } }
                        ]"
                        :actions="rowActions"

                        @click:action="onRowAction"
                    />

                    <p class="text-sm text-muted-foreground mt-2">
                        Última ação: {{ lastRowAction || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Loading
            </h3>

            <p>
                
            </p>
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
                        :actions="rowActions"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@design/components/Table.vue";
import type { OptionItem } from "@design/components/internal/OptionsList.vue";

export default defineComponent({
    name: "ComponentsTable",

    components: {
        Table
    },

    data() {
        return {
            lastRowAction: "",
            lastSelectableAction: "",
            rowActions: [
                { label: "Visualizar", value: "inspect", icon: "fa-eye" },
                { label: "Editar", value: "edit", icon: "fa-pen" },
                { separator: true },
                { label: "Excluir", value: "delete", icon: "fa-trash", variant: "destructive" }
            ] as OptionItem[],
            selectableActions: [
                { label: "Exportar", value: "export", icon: "fa-download" },
                { separator: true },
                { label: "Excluir itens selecionados", value: "delete", icon: "fa-trash", variant: "destructive" }
            ] as OptionItem[]
        };
    },

    methods: {
        onRowAction(value: string, item: Record<string, unknown>) {
            this.lastRowAction = `${value} · ${item.name ?? item.id}`;
        },

        onSelectableAction(value: string, items: Record<string, unknown>[]) {
            const names = items.map((item) => item.name ?? item.id).join(", ");
            this.lastSelectableAction = `${value} · ${names}`;
        }
    }
});
</script>
