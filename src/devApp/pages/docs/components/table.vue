<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Table
            </h1>

            <p class="text-muted-foreground!">
                Tabela de dados com headers, alinhamento, seleção, badges e ações.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
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
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Ações e seleção
            </h3>

            <p>
                <code>selectable</code> marca linhas. <code>actions="{ inspect, edit, delete }"</code> adiciona botões.
                Um campo pode ser um objeto de Badge.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Table
                            :headers="[
                                { label: 'Nome', field: 'name', position: 'start' },
                                { label: 'Status', field: 'badge', position: 'center' }
                            ]"
                            :data="[
                                { name: 'Celi', badge: { label: 'Aprovado', variant: 'success' } },
                                { name: 'Herstal', badge: { label: 'Pendente', variant: 'warning' } }
                            ]"
                            :actions="{ inspect: true, edit: true, delete: true }"
                        />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Table from "@design/components/Table.vue";

export default defineComponent({
    name: "ComponentsTable",

    components: {
        Card,
        Table
    }
});
</script>
