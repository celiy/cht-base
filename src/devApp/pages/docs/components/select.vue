<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Select
            </h1>

            <p class="text-muted-foreground!">
                Campo de escolha com lista flutuante. Aceita pesquisa local, tooltips nas opções,
                seleção múltipla, persistência em <code>localStorage</code> e textos de ajuda dentro e fora do painel.
            </p>
        </section>

        <section>
            <h3 class="mb-2">
                Helper texts
            </h3>

            <p>
                <code>inHelperText</code> aparece dentro do painel, acima da lista.
                <code>helperText</code> fica abaixo do botão, fora do menu.
                <code>header</code> é o rótulo do gatilho quando nada está selecionado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Helper texts">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Select"
                        inHelperText="Texto de ajuda dentro do painel"
                        helperText="Texto de ajuda abaixo do campo"

                        :options="options"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Pesquisa e tooltips
            </h3>

            <p>
                <code>:search="{ external: false }"</code> filtra a lista localmente.
                Uma opção pode ter <code>tooltip</code> — o texto aparece ao lado no hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa e tooltips">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Com pesquisa"
                        :search="{ external: false }"
                        :options="options"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Múltipla seleção
            </h3>

            <p>
                <code>selectMultiple="{ min, max, allSelected }"</code>.
                <code>min</code> e <code>max</code> limitam quantos itens cabem;
                <code>allSelected: true</code> começa com tudo marcado.
                O valor emitido é um array de strings.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Múltipla seleção">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Múltiplo"
                        helperText="Mínimo 0, máximo 3"
                        :options="options"
                        :selectMultiple="{ min: 0, max: 3 }"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Memo
            </h3>

            <p>
                Com <code>useMemo</code> e um <code>id</code> estável, a escolha é gravada em
                <code>localStorage</code> e restaurada no próximo carregamento.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Memo">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        id="docs-select-memo"
                        header="Com memo"
                        helperText="Recarregue a página: a escolha permanece"
                        :useMemo="true"
                        :options="options"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Select from "@design/components/Select.vue";

export default defineComponent({
    name: "ComponentsSelect",

    components: {
        Select
    },

    data() {
        return {
            options: [
                { label: "ABC", value: "abc", tooltip: "Este item tem um tooltip" },
                { label: "DEF", value: "def" },
                { label: "123", value: "unodunotres" }
            ]
        };
    }
});
</script>
