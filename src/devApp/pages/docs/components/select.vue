<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Select</h1>

            <p>Campo de escolha com lista flutuante. Tem pesquisa local, tooltip nas opções, seleção múltipla, persistência em <code>localStorage</code> e textos de ajuda. <code>combobox</code> troca o gatilho por um input de texto livre com sugestões. Uma opção com <code>options</code> abre submenu. <code>#inside-empty-panel</code> aparece com a lista vazia, e <code>#panel-footer</code> fica fixo no rodapé enquanto houver opções. No mobile, o painel vira modal, controlado por <code>mobileModal</code> e <code>forceModal</code>.</p>
        </section>

        <section>
            <h3>Helper texts</h3>

            <p>
                <code>inHelperText</code> aparece dentro do painel, acima da lista.
                <code>helperText</code> fica abaixo do botão, fora do menu. <code>header</code> é o
                rótulo do gatilho quando nada está selecionado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Helper texts">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Pesquisa e tooltips</h3>

            <p><code>:search="{ external: false }"</code> filtra a lista localmente. Ao abrir, o campo ganha foco e o primeiro item fica pré-selecionado. As setas navegam pela lista, Enter confirma e Esc fecha. Uma opção pode ter <code>tooltip</code>, que aparece ao lado no hover.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa e tooltips">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Pesquisa externa</h3>

            <p><code>:search="{ external: true, field: 'modelo' }"</code> não filtra a lista. A cada digitação, com debounce, o componente emite <code>search:external</code> com <code>{ field, value }</code>. O pai usa esses dados para buscar no backend, por exemplo em <code>GET /api/veiculo?modelo=gol</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa externa">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Combobox</h3>

            <p><code>combobox</code> troca o gatilho por um <code>Input</code>. O texto livre fica em <code>v-model:query</code>, e escolher uma opção preenche o input com o label e emite o <code>value</code>. Com <code>:search="{ external: true }"</code>, a digitação emite <code>search:external</code>, sem busca dentro da lista. <code>variant</code> vai para o <code>Input</code>, com padrão <code>secondary</code>. Use <code>transparent</code> em layouts densos, como células de tabela.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combobox">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Select
                        combobox
                        header="Serviço"
                        :query="comboboxQuery"
                        :options="[{ label: 'Alinhamento', value: '1' }, { label: 'Balanceamento', value: '2' }, { label: 'Troca de óleo', value: '3' }, { label: 'Revisão', value: '4' }]"
                        :search="{ external: false }"

                        @update:query="comboboxQuery = $event"
                    />

                    <p class="text-sm text-muted-foreground">Texto: {{ comboboxQuery || "—" }}</p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Combobox com opção fixa</h3>

            <p>Com <code>combobox-option</code>, a escolha na lista trava o valor, como num select. Um X no input limpa a seleção. Enquanto nada estiver selecionado, o texto livre continua valendo.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Combobox option">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Select
                        combobox
                        combobox-option
                        header="Cliente"
                        :query="comboboxOptionQuery"
                        :model-value="comboboxOptionValue"
                        :options="[{ label: 'Alinhamento', value: '1' }, { label: 'Balanceamento', value: '2' }, { label: 'Troca de óleo', value: '3' }, { label: 'Revisão', value: '4' }]"

                        @update:query="comboboxOptionQuery = $event"
                        @update:value="comboboxOptionValue = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Múltipla seleção</h3>

            <p>Use <code>selectMultiple="{ min, max, allSelected }"</code>. <code>min</code> e <code>max</code> limitam a quantidade marcada, e <code>allSelected: true</code> começa com tudo marcado. O valor é um array de strings. <code>showSelectedLabels</code>, que vem <code>true</code>, mostra os labels no gatilho, com reticências se não couberem. Com <code>false</code>, o gatilho mostra o <code>header</code> quando nada está pré-selecionado.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Múltipla seleção">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Seleção separada</h3>

            <p><code>separateSelected</code>, padrão <code>false</code>, só vale com <code>selectMultiple</code>. As opções marcadas saem da lista e aparecem abaixo, em grupos de botões (<code>variant="outline"</code>, <code>size="small"</code>). O clique no label emite <code>click:selected</code>. O X devolve a opção à lista e emite <code>remove:selected</code>. O painel abre para cima sempre que couber.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Seleção separada">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Select
                        v-model="separateSelectedValues"
                        header="Veículos"
                        helper-text="Marque na lista; os selecionados saem dela e ficam abaixo"
                        :options="[{ label: 'Gol · ABC1D23', value: 'gol' }, { label: 'Uno · XYZ1A23', value: 'uno' }, { label: 'Onix · QWE2B34', value: 'onix' }, { label: 'Civic · RTY3C45', value: 'civic' }]"
                        :select-multiple="{ min: 0 }"
                        :separate-selected="true"

                        @click:selected="onSeparateSelectedClick"
                        @remove:selected="onSeparateSelectedRemove"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Memo</h3>

            <p>
                Com <code>useMemo</code> e um <code>id</code> estável, a escolha é gravada em
                <code>localStorage</code> e restaurada no próximo carregamento.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Memo">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Panel footer</h3>

            <p>O slot <code>#panel-footer</code> fica no fim do painel e só aparece quando a lista tem opções visíveis. Se a mesma ação também fizer sentido com a lista vazia, combine com <code>#inside-empty-panel</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Panel footer">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Select
                        ref="panelFooterSelect"

                        header="Veículos"
                        :options="[
                            { label: 'Gol · ABC1D23', value: 'gol' },
                            { label: 'Uno · XYZ1A23', value: 'uno' },
                            { label: 'Onix · QWE2B34', value: 'onix' }
                        ]"
                    >
                        <template #panel-footer>
                            <Button
                                type="button"
                                variant="outline"
                                size="small"
                                left-icon="fa-plus"
                                label="Cadastrar veículo"
                                class="w-full"

                                @click="onPanelFooterClick"
                            />
                        </template>
                    </Select>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Painel vazio</h3>

            <p>Use <code>#inside-empty-panel</code> para ações quando não há itens, seja porque o catálogo está vazio, seja porque a pesquisa não achou nada. O conteúdo fica centralizado logo abaixo de “Nenhum resultado encontrado.”. No Mecarvit, o cadastro de cliente usa esse slot nos selects de endereço e veículo, com os botões “Cadastrar endereço” e “Cadastrar veículo”.</p>
        </section>

        <section class="mb-24">
            <DocsExample label="Inside empty panel">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Select
                        ref="emptyPanelSelect"

                        header="Endereços"
                        placeholder="Selecione os endereços"
                        :search="{ external: false }"
                        :options="emptyPanelOptions"
                        :select-multiple="{ min: 0 }"
                        :separate-selected="true"
                    >
                        <template #inside-empty-panel>
                            <Button
                                type="button"
                                variant="outline"
                                size="small"
                                left-icon="fa-plus"
                                label="Cadastrar endereço"
                                class="mt-2"

                                @click="onEmptyPanelInsideClick"
                            />
                        </template>
                    </Select>

                    <p class="text-sm text-muted-foreground">
                        Abra o select sem opções ou pesquise por um texto inexistente para ver o
                        slot.
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
            emptyPanelOptions: [] as Array<{ label: string; value: string }>
        };
    },

    methods: {
        emptyPanelSelectRef(): EmptyPanelSelectExpose | undefined {
            return this.$refs.emptyPanelSelect as EmptyPanelSelectExpose | undefined;
        },

        panelFooterSelectRef(): EmptyPanelSelectExpose | undefined {
            return this.$refs.panelFooterSelect as EmptyPanelSelectExpose | undefined;
        },

        onPanelFooterClick() {
            this.panelFooterSelectRef()?.close?.();
            this.$toast.success("Slot panel-footer (ex.: abrir cadastro)");
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
