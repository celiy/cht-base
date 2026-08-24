<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Tooltip
            </h1>

            <p class="text-muted-foreground!">
                Diretiva <code>v-tooltip</code>. Aceita string ou objeto com <code>content</code>, <code>placement</code>, <code>html</code>, <code>offset</code> e <code>maxWidth</code>.
            </p>
        </section>

        <section>
            <h3 class="mb-2">
                String
            </h3>

            <p>
                Atalho: <code>v-tooltip="'texto'"</code>. Placement padrão é <code>top</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="String">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button v-tooltip="'Texto curto'">
                        Curto
                    </Button>

                    <Button v-tooltip="'Lorem ipsum dolor sit amet consectetur adipisicing elit.'">
                        Longo
                    </Button>

                    <Button
                        v-tooltip="'Botão desabilitado ainda mostra tooltip no wrapper'"
                        variant="secondary"
                    >
                        Secundário
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Placement
            </h3>

            <p>
                <code>placement="top / bottom / left / right / center"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Placement">
                <div class="p-8 flex flex-wrap gap-3 justify-center items-center">
                    <Button
                        v-tooltip="{ content: 'Acima do alvo', placement: 'top' }"
                        variant="secondary"
                    >
                        Top
                    </Button>

                    <Button
                        v-tooltip="{ content: 'Abaixo do alvo', placement: 'bottom' }"
                        variant="secondary"
                    >
                        Bottom
                    </Button>

                    <Button
                        v-tooltip="{ content: 'À esquerda', placement: 'left' }"
                        variant="secondary"
                    >
                        Left
                    </Button>

                    <Button
                        v-tooltip="{ content: 'À direita', placement: 'right' }"
                        variant="secondary"
                    >
                        Right
                    </Button>

                    <Button
                        v-tooltip="{ content: 'Sobre o alvo', placement: 'center' }"
                        variant="secondary"
                    >
                        Center
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                HTML
            </h3>

            <p>
                <code>html: true</code> interpreta <code>content</code> como HTML.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="HTML">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button
                        v-tooltip="htmlTooltip"
                        variant="secondary"
                    >
                        Com ênfase
                    </Button>

                    <Button
                        v-tooltip="htmlListTooltip"
                        variant="secondary"
                    >
                        Lista
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Offset e maxWidth
            </h3>

            <p>
                <code>offset</code> é o espaço em pixels. <code>maxWidth</code> limita a largura do balão.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Offset e maxWidth">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button
                        v-tooltip="{ content: 'Offset 4', placement: 'bottom', offset: 4 }"
                        variant="outline"
                    >
                        Offset 4
                    </Button>

                    <Button
                        v-tooltip="{ content: 'Offset 20', placement: 'bottom', offset: 20 }"
                        variant="outline"
                    >
                        Offset 20
                    </Button>

                    <Button
                        v-tooltip="narrowTooltip"
                        variant="outline"
                    >
                        maxWidth 8rem
                    </Button>

                    <Button
                        v-tooltip="wideTooltip"
                        variant="outline"
                    >
                        maxWidth 24rem
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Em outros elementos
            </h3>

            <p>
                Qualquer elemento com hover: ícone, texto, input ou opção de select.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Em outros elementos">
                <div class="p-4 flex flex-col gap-6">
                    <div class="flex flex-wrap items-center gap-4">
                        <i
                            v-tooltip="'Ajuda sobre este ícone'"

                            class="fa-solid fa-circle-info text-muted-foreground cursor-help"
                        />

                        <span
                            v-tooltip="'Texto truncado com dica completa'"

                            class="underline decoration-dotted cursor-help"
                        >
                            Passe o mouse aqui
                        </span>

                        <Badge
                            v-tooltip="{ content: 'Status do pedido', placement: 'right' }"

                            label="Ativo"
                            variant="success"
                        />
                    </div>

                    <Input
                        v-tooltip="{ content: 'Informe o e-mail corporativo', placement: 'right' }"

                        id="tooltip-docs-email"
                        type="email"
                        label="E-mail"
                        placeholder="nome@exemplo.com"
                        class="max-w-sm"
                    />

                    <Select
                        class="max-w-sm"
                        header="Opções com tooltip"

                        :options="selectOptions"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Input from "@design/components/Input.vue";
import Select from "@design/components/Select.vue";
import Badge from "@design/components/Badge.vue";

export default defineComponent({
    name: "ComponentsTooltip",

    components: {
        Button,
        Input,
        Select,
        Badge
    },

    data() {
        return {
            htmlTooltip: {
                content: "<strong>Negrito</strong> e <em>itálico</em>",
                html: true,
                placement: "top" as const
            },
            htmlListTooltip: {
                content: "<div>Atalhos:</div><div><b>S</b> sidebar</div><div><b>Esc</b> fechar</div>",
                html: true,
                placement: "bottom" as const
            },
            narrowTooltip: {
                content: "Texto longo forçado a quebrar em uma coluna estreita.",
                placement: "top" as const,
                maxWidth: "8rem"
            },
            wideTooltip: {
                content: "Texto longo com mais espaço horizontal antes de quebrar a linha.",
                placement: "top" as const,
                maxWidth: "24rem"
            },
            selectOptions: [
                { label: "ABC", value: "abc", tooltip: "Esta opção tem tooltip à direita" },
                { label: "DEF", value: "def", tooltip: "Outra dica nesta linha" },
                { label: "123", value: "unodunotres" }
            ]
        };
    }
});
</script>
