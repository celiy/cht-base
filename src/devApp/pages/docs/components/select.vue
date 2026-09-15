<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Select
            </h1>

            <p>
                Campo de escolha com lista flutuante. Aceita pesquisa local, tooltips nas opções,
                seleção múltipla, persistência em <code>localStorage</code> e textos de ajuda dentro e fora do painel.
                Uma opção com <code>options</code> abre um submenu ao lado (hover ou clique).
                Em mobile abre um modal blank (<code>mobileModal</code> / <code>forceModal</code>).
            </p>
        </section>

        <section>
            <h3>
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
                        in-helper-text="Texto de ajuda dentro do painel"
                        helper-text="Texto de ajuda abaixo do campo"

                        :options="[
                            { label: 'ABC', value: 'abc', tooltip: 'Este item tem um tooltip' },
                            { label: 'DEF', value: 'def' },
                            { label: '123', value: 'unodunotres' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Pesquisa e tooltips
            </h3>

            <p>
                <code>:search="{ external: false }"</code> filtra a lista localmente.
                Ao abrir, o campo recebe foco e o primeiro item fica pré-selecionado;
                as setas sobem e descem na lista. Enter confirma. Esc fecha o painel.
                Uma opção pode ter <code>tooltip</code> — o texto aparece ao lado no hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa e tooltips">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Com pesquisa"
                        :search="{ external: false }"
                        :options="[
                            { label: 'ABC', value: 'abc', tooltip: 'Este item tem um tooltip' },
                            { label: 'DEF', value: 'def' },
                            { label: '123', value: 'unodunotres' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Múltipla seleção
            </h3>

            <p>
                <code>selectMultiple="{ min, max, allSelected }"</code>.
                <code>min</code> e <code>max</code> limitam quantos itens cabem;
                <code>allSelected: true</code> começa com tudo marcado.
                O valor emitido é um array de strings.
                <code>showSelectedLabels</code> (padrão <code>true</code>) mostra os labels
                selecionados no gatilho, com reticências se não couberem.
                Com <code>false</code>, o gatilho usa o <code>header</code> (placeholder)
                quando nada está pré-selecionado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Múltipla seleção">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Múltiplo"
                        helper-text="Labels no gatilho; mínimo 0, máximo 4"
                        :options="[
                            { label: 'Português', value: 'pt' },
                            { label: 'Inglês', value: 'en' },
                            { label: 'Espanhol', value: 'es' },
                            { label: 'Francês', value: 'fr' },
                            { label: 'Alemão', value: 'de' }
                        ]"
                        :select-multiple="{ min: 0, max: 4 }"
                    />

                    <Select
                        header="Só placeholder"
                        helper-text="showSelectedLabels false"
                        :show-selected-labels="false"
                        :options="[
                            { label: 'Português', value: 'pt' },
                            { label: 'Inglês', value: 'en' },
                            { label: 'Espanhol', value: 'es' }
                        ]"
                        :select-multiple="{ min: 0, max: 3 }"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
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
                        helper-text="Recarregue a página: a escolha permanece"
                        :use-memo="true"
                        :options="[
                            { label: 'ABC', value: 'abc' },
                            { label: 'DEF', value: 'def' },
                            { label: '123', value: 'unodunotres' }
                        ]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Botão de ação
            </h3>

            <p>
                <code>actionIcon</code> e <code>actionLabel</code> renderizam um botão no mesmo estilo
                do gatilho, à direita por padrão (<code>actionSide</code> aceita
                <code>left</code> ou <code>right</code>). O clique emite
                <code>click:action</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Botão de ação">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Com ação"
                        action-icon="fa-plus"
                        action-side="right"
                        :options="[
                            { label: 'ABC', value: 'abc' },
                            { label: 'DEF', value: 'def' },
                            { label: '123', value: 'unodunotres' }
                        ]"

                        @click:action="onActionClick"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Select from "@design/components/Select.vue";

export default defineComponent({
    name: "ComponentsSelect",

    components: {
        Select
    },

    methods: {
        onActionClick() {
            this.$toast.info("Ação do select");
        }
    }
});
</script>
