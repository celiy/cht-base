<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Toggleable</h1>

            <p>
                Grupo de <code>Toggle</code> a partir de <code>options</code> (<code>label</code> +
                <code>value</code>). Fundo <code>bg-input/30</code>; a borda segue o
                <code>variant</code> (padrão <code>default</code>). A opção ativa usa o mesmo
                variant no botão; as demais ficam transparentes.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Toggleable">
                <div class="flex flex-col gap-4 p-4">
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
            <h3>Variantes</h3>

            <p>
                A borda do grupo e o toggle ativo usam
                <code>variant="default / primary / success / info / warning / destructive"</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variantes">
                <div class="flex flex-col gap-4 p-4">
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

        <section>
            <h3>Posição</h3>

            <p>
                A posição do <code>label</code> e do toggle dentro do grupo pode ser
                <code>left</code>, <code>center</code> ou <code>right</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Posição">
                <div class="flex flex-col gap-4 p-4">
                    <Toggleable
                        v-model="toggleablePosition"
                        label="Toggleable Position Left"
                        label-position="left"
                        toggleable-position="left"
                        :options="toggleablePositionOptions"
                    />

                    <Toggleable
                        v-model="toggleablePosition"
                        label="Toggleable Position Center"
                        label-position="center"
                        toggleable-position="center"
                        :options="toggleablePositionOptions"
                    />

                    <Toggleable
                        v-model="toggleablePosition"
                        label="Toggleable Position Right"
                        label-position="right"
                        toggleable-position="right"
                        :options="toggleablePositionOptions"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customização</h3>

            <p>
                <code>background-style</code> para mudar a cor de fundo.
                <code>border-style</code> para mudar a cor da borda. <code>radius-style</code> para
                mudar o raio da borda.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customização">
                <div class="flex flex-col gap-4 p-4">
                    <div class="flex flex-col gap-2">
                        <label> background-style="bg-orange-700" </label>

                        <Toggleable
                            label="Exemplo"
                            background-style="bg-orange-700"
                            :options="statusOptions"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-red-700" <br />
                            border-style="border-2 border-yellow-500"
                        </label>

                        <Toggleable
                            label="Exemplo"
                            background-style="bg-red-700"
                            border-style="border-2 border-yellow-500"
                            :options="statusOptions"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-blue-700" <br />
                            border-style="border-4 border-green-500"
                        </label>

                        <Toggleable
                            label="Exemplo"
                            background-style="bg-blue-700"
                            border-style="border-4 border-green-500"
                            :options="statusOptions"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label> radius-style="rounded" </label>

                        <Toggleable
                            label="Exemplo"
                            radius-style="rounded"
                            :options="statusOptions"
                        />
                    </div>
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
            ],
            toggleablePosition: "left" as "left" | "center" | "right",
            toggleablePositionOptions: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" }
            ]
        };
    }
});
</script>
