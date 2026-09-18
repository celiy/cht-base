<template>
    <article class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Select
            </h1>

            <p>
                Campo de escolha com lista flutuante. Aceita pesquisa local, tooltips nas opções,
                seleção múltipla, persistência em <code>localStorage</code> e textos de ajuda dentro e fora do painel.
                <code>combobox</code> usa um input no gatilho para texto livre com sugestões.
                Uma opção com <code>options</code> abre um submenu ao lado (hover ou clique).
                O slot <code>#inside-empty-panel</code> aparece dentro do painel, abaixo de
                “Nenhum resultado encontrado.”, quando a lista visível está vazia (sem opções ou
                pesquisa sem resultado).
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
                Pesquisa externa
            </h3>

            <p>
                <code>:search="{ external: true, field: 'modelo' }"</code> não filtra a lista:
                a cada digitação (com debounce) emite <code>search:external</code> com
                <code>{ field, value }</code>. O pai usa <code>field</code> e <code>value</code>
                para procurar a entidade no backend, por exemplo
                <code>GET /api/veiculo?modelo=gol</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa externa">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        header="Modelo"
                        :search="{ external: true, field: 'modelo' }"
                        :options="externalOptions"

                        @search:external="onExternalSearch"
                    />

                    <p class="text-sm text-muted-foreground">
                        Última busca: {{ externalLast || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Combobox
            </h3>

            <p>
                <code>combobox</code> troca o botão do gatilho por um <code>Input</code>.
                O texto livre fica em <code>v-model:query</code>; escolher uma opção
                preenche o input com o label e emite o <code>value</code> da opção.
                Com <code>:search="{ external: true }"</code> a digitação emite
                <code>search:external</code> (com debounce), sem campo de busca dentro da lista.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combobox">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        combobox
                        header="Serviço"
                        :query="comboboxQuery"
                        :options="comboboxOptions"
                        :search="{ external: false }"

                        @update:query="comboboxQuery = $event"
                    />

                    <p class="text-sm text-muted-foreground">
                        Texto: {{ comboboxQuery || "—" }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Combobox com opção fixa
            </h3>

            <p>
                <code>combobox-option</code> junto com <code>combobox</code>: ao escolher na lista,
                o valor fica travado (como um select) e um X no input limpa a seleção.
                Texto livre só enquanto nenhuma opção está selecionada.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combobox option">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        combobox
                        combobox-option
                        header="Cliente"
                        :query="comboboxOptionQuery"
                        :model-value="comboboxOptionValue"
                        :options="comboboxOptions"

                        @update:query="comboboxOptionQuery = $event"
                        @update:value="comboboxOptionValue = $event"
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
                Seleção separada
            </h3>

            <p>
                <code>separateSelected</code> (padrão <code>false</code>) só vale com
                <code>selectMultiple</code>. As opções marcadas saem da lista e do gatilho:
                ficam abaixo, em um <code>flex-wrap</code> de grupos de botões
                (<code>variant="outline"</code>, <code>size="small"</code>).
                O botão do label emite <code>click:selected</code> com o valor da opção;
                o X devolve a opção à lista e emite <code>remove:selected</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Seleção separada">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        v-model="separateSelectedValues"
                        header="Veículos"
                        helper-text="Marque na lista; os selecionados saem dela e ficam abaixo"
                        :options="separateOptions"
                        :select-multiple="{ min: 0 }"
                        :separate-selected="true"

                        @click:selected="onSeparateSelectedClick"
                        @remove:selected="onSeparateSelectedRemove"
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

        <section>
            <h3>
                Painel vazio
            </h3>

            <p>
                Use o slot <code>#inside-empty-panel</code> para ações quando não há itens na lista
                (catálogo vazio ou filtro/pesquisa sem correspondência). O conteúdo fica centralizado
                logo abaixo do texto “Nenhum resultado encontrado.”. No Mecarvit, o cadastro de cliente
                usa esse slot nos selects de endereços e veículos com botões
                “Cadastrar endereço” / “Cadastrar veículo”.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Inside empty panel">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Select
                        ref="emptyPanelSelect"
                        header="Endereços"
                        placeholder="Selecione os endereços"
                        :search="{ external: false }"
                        :options="emptyPanelOptions"
                        :select-multiple="{ min: 0 }"
                        :separate-selected="true"
                        action-icon="fa-plus"
                        action-side="right"

                        @click:action="onEmptyPanelActionClick"
                    >
                        <template #inside-empty-panel>
                            <Button
                                type="button"
                                variant="outline"
                                size="small"
                                left-icon="fa-plus"
                                label="Cadastrar endereço"

                                @click="onEmptyPanelInsideClick"
                            />
                        </template>
                    </Select>

                    <p class="text-sm text-muted-foreground">
                        Abra o select sem opções ou pesquise por um texto inexistente para ver o slot.
                    </p>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Select from "@design/components/Select.vue";

type EmptyPanelSelectExpose = {
    close?: () => void;
};

export default defineComponent({
    name: "ComponentsSelect",

    components: {
        Button,
        Select
    },

    data() {
        return {
            separateSelectedValues: ["gol", "uno"],
            separateOptions: [
                { label: "Gol · ABC1D23", value: "gol" },
                { label: "Uno · XYZ1A23", value: "uno" },
                { label: "Onix · QWE2B34", value: "onix" },
                { label: "Civic · RTY3C45", value: "civic" }
            ],
            allExternalOptions: [
                { label: "Gol", value: "gol" },
                { label: "Uno", value: "uno" },
                { label: "Onix", value: "onix" },
                { label: "Civic", value: "civic" }
            ],
            externalOptions: [
                { label: "Gol", value: "gol" },
                { label: "Uno", value: "uno" },
                { label: "Onix", value: "onix" },
                { label: "Civic", value: "civic" }
            ],
            externalLast: "",
            comboboxQuery: "",
            comboboxOptionQuery: "",
            comboboxOptionValue: "",
            comboboxOptions: [
                { label: "Alinhamento", value: "1" },
                { label: "Balanceamento", value: "2" },
                { label: "Troca de óleo", value: "3" },
                { label: "Revisão", value: "4" }
            ],
            emptyPanelOptions: [] as Array<{ label: string; value: string }>
        };
    },

    methods: {
        emptyPanelSelectRef(): EmptyPanelSelectExpose | undefined {
            return this.$refs.emptyPanelSelect as EmptyPanelSelectExpose | undefined;
        },

        onActionClick() {
            this.$toast.info("Ação do select");
        },

        onEmptyPanelActionClick() {
            this.$toast.info("Ação ao lado do gatilho (click:action)");
        },

        onEmptyPanelInsideClick() {
            this.emptyPanelSelectRef()?.close?.();
            this.$toast.success("Slot inside-empty-panel (ex.: abrir cadastro)");
        },

        onSeparateSelectedClick(value: string) {
            this.$toast.info(`Opção: ${value}`);
        },

        onSeparateSelectedRemove(value: string) {
            this.$toast.info(`Removido: ${value}`);
        },

        onExternalSearch(payload: { field: string; value: string }) {
            this.externalLast = payload.field
                ? `${payload.field}:${payload.value || "(vazio)"}`
                : payload.value || "(vazio)";

            const query = payload.value.trim().toLowerCase();

            if (!query) {
                this.externalOptions = [...this.allExternalOptions];
                return;
            }

            this.externalOptions = this.allExternalOptions.filter((option) => {
                return Boolean(option.label && option.label.toLowerCase().includes(query));
            });
        }
    }
});
</script>
