<template>
    <article class="container-sm docs-article">
        <section>
            <h1>OptionsList</h1>

            <p>
                Lista de opções usada por Select, Dropdown e Context menu. Importa de
                <code>@design/components/internal/OptionsList.vue</code>. Cada item segue
                <code>OptionItem</code>: <code>label</code>, <code>value</code>, <code>icon</code>,
                <code>separator</code>, <code>disabled</code>, <code>variant</code>,
                <code>tooltip</code>, <code>indicator</code>, <code>options</code> (filhos) e
                <code>openOn</code> (<code>hover</code> ou <code>click</code>).
            </p>
        </section>

        <section>
            <h3>Lista e select</h3>

            <p>
                <code>select</code> emite o item clicado. Separadores não são clicáveis.
                <code>showCheckmark</code> reserva a coluna do visto;
                <code>isOptionSelected</code> decide quais estão marcados.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Lista">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <OptionsList
                        :options="plainOptions"
                        :show-checkmark="true"
                        :is-option-selected="isSelected"
                        :max-height-px="240"

                        @select="onSelect"
                    />
                </div>

                <p class="px-4 pb-4 text-sm text-muted-foreground">
                    Seleccionado:
                    <code class="text-foreground">{{ selectedLabel }}</code>
                </p>
            </DocsExample>
        </section>

        <section>
            <h3>Pesquisa local</h3>

            <p>
                <code>search="{ external: false }"</code> filtra por label (e por value se a label
                não bater). <code>searchQuery</code> sincroniza com <code>update:searchQuery</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa">
                <div class="m-4 w-full max-w-xs overflow-hidden rounded border bg-popover">
                    <OptionsList
                        :options="plainOptions"
                        :search="{ external: false }"
                        :search-query="query"

                        @update:search-query="query = $event"
                        @select="onSelect"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Pesquisa externa</h3>

            <p>
                <code>search.external</code> não filtra a lista: emite
                <code>search:external</code> (<code>{ field, value }</code>, debounce 100&nbsp;ms).
                <code>externalSearchLoading</code> troca o ícone por um spinner.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pesquisa externa">
                <div class="m-4 w-full max-w-xs overflow-hidden rounded border bg-popover">
                    <OptionsList
                        :options="filteredRemote"
                        :search="{ external: true, field: 'nome' }"
                        :external-search-loading="remoteLoading"

                        @search:external="onRemoteSearch"
                        @select="onSelect"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Aninhado</h3>

            <p>
                Itens com <code>options</code> abrem um painel ao lado (hover, ou só clique se
                <code>openOn="click"</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Aninhado">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <OptionsList
                        :options="nestedOptions"

                        @select="onSelect"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionsList, {
    type OptionItem,
    type SearchExternalPayload
} from "@design/components/internal/OptionsList.vue";

const ALL_REMOTE: OptionItem[] = [
    { label: "Ana", value: "ana" },
    { label: "Bruno", value: "bruno" },
    { label: "Carla", value: "carla" }
];

export default defineComponent({
    name: "ComponentsOptionsList",

    components: {
        OptionsList
    },

    data() {
        return {
            selected: null as OptionItem | null,
            query: "",
            remoteLoading: false,
            remoteQuery: "",
            remoteTimer: null as ReturnType<typeof setTimeout> | null,
            plainOptions: [
                { label: "Editar", value: "edit", icon: "fa-pen" },
                { label: "Duplicar", value: "dup", icon: "fa-copy" },
                { separator: true },
                { label: "Eliminar", value: "del", icon: "fa-trash", variant: "destructive" }
            ] as OptionItem[],
            nestedOptions: [
                {
                    label: "Ficheiro",
                    value: "file",
                    options: [
                        { label: "Novo", value: "new" },
                        { label: "Abrir", value: "open" }
                    ]
                },
                { label: "Fechar", value: "close" }
            ] as OptionItem[]
        };
    },

    computed: {
        selectedLabel() {
            return this.selected?.label ?? "nenhum";
        },

        filteredRemote(): OptionItem[] {
            const q = this.remoteQuery.trim().toLowerCase();

            if (!q) {
                return ALL_REMOTE;
            }

            return ALL_REMOTE.filter((item) => item.label?.toLowerCase().includes(q));
        }
    },

    beforeUnmount() {
        if (this.remoteTimer !== null) {
            clearTimeout(this.remoteTimer);
            this.remoteTimer = null;
        }
    },

    methods: {
        isSelected(value: string | undefined) {
            if (value === undefined || this.selected === null) {
                return false;
            }

            return this.selected.value === value;
        },

        onSelect(_value: string | undefined, item: OptionItem) {
            this.selected = item;
        },

        onRemoteSearch(payload: SearchExternalPayload) {
            this.remoteLoading = true;

            if (this.remoteTimer !== null) {
                clearTimeout(this.remoteTimer);
            }

            this.remoteTimer = setTimeout(() => {
                this.remoteQuery = payload.value;
                this.remoteLoading = false;
                this.remoteTimer = null;
            }, 200);
        }
    }
});
</script>
