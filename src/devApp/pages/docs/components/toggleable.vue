<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Toggleable
            </h1>

            <p>
                Grupo de <code>Toggle</code> a partir de <code>options</code>
                (<code>label</code> + <code>value</code>). Fundo
                <code>bg-input/30</code>; a borda segue o
                <code>variant</code> (padrão <code>default</code>). A opção
                ativa usa o mesmo variant no botão; as demais ficam transparentes.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Toggleable">
                <div class="p-4 flex flex-col gap-4">
                    <Toggleable
                        v-model="status"
                        label="Status"
                        :options="statusOptions"
                    />

                    <p class="text-sm text-muted-foreground">
                        Selecionado: {{ status ?? "(nenhum)" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variantes
            </h3>

            <p>
                A borda do grupo e o toggle ativo usam
                <code>variant="default / primary / success / info / warning / destructive"</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variantes">
                <div class="p-4 flex flex-col gap-4">
                    <Toggleable
                        v-model="priority"
                        label="Prioridade"
                        variant="warning"
                        :options="priorityOptions"
                    />

                    <Toggleable
                        v-model="channel"
                        label="Canal"
                        variant="info"
                        size="small"
                        :options="channelOptions"
                    />

                    <Toggleable
                        v-model="health"
                        label="Saúde"
                        variant="success"
                        :options="healthOptions"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toggleable from "@design/components/Toggleable.vue";

export default defineComponent({
    name: "DocsToggleable",

    components: {
        Toggleable
    },

    data() {
        return {
            status: "open" as string | null,
            priority: "medium" as string | null,
            channel: "email" as string | null,
            health: "ok" as string | null,
            statusOptions: [
                { label: "Aberto", value: "open" },
                { label: "Em andamento", value: "progress" },
                { label: "Fechado", value: "closed" }
            ],
            priorityOptions: [
                { label: "Baixa", value: "low" },
                { label: "Média", value: "medium" },
                { label: "Alta", value: "high" }
            ],
            channelOptions: [
                { label: "Email", value: "email" },
                { label: "Chat", value: "chat" },
                { label: "Telefone", value: "phone" }
            ],
            healthOptions: [
                { label: "OK", value: "ok" },
                { label: "Atenção", value: "warn" },
                { label: "Crítico", value: "critical" }
            ]
        };
    }
});
</script>
