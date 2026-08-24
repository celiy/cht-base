<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Table
            </h1>

            <p class="text-muted-foreground!">
                Tabela de dados com headers, alinhamento por coluna, seleção de linhas,
                escolha de colunas visíveis, badges (incluindo paleta <code>chart-*</code>) e ações por linha.
            </p>
        </section>

        <section>
            <h3 class="mb-2">
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
            <h3 class="mb-2">
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
            <h3 class="mb-2">
                Seleção de linhas
            </h3>

            <p>
                <code>selectable</code> adiciona um checkbox por linha e um “selecionar todos” no header.
                Com linhas marcadas, aparece um rodapé com a contagem e ações em lote.
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
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
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
            <h3 class="mb-2">
                Ações
            </h3>

            <p>
                <code>actions="{ inspect, edit, delete }"</code> adiciona uma coluna com um popover por linha.
                Os handlers <code>inspectItem</code>, <code>editItem</code> e <code>deleteItem</code> recebem o
                <code>id</code> da linha — passe <code>id</code> em cada objeto de <code>data</code>.
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
                        :actions="{ inspect: true, edit: true, delete: true }"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@design/components/Table.vue";

export default defineComponent({
    name: "ComponentsTable",

    components: {
        Table
    }
});
</script>
