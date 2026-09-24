<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Option</h1>

            <p>
                Linha de lista com <code>label</code>, <code>icon</code>, <code>separator</code> e
                checkmark opcional. Com <code>value</code> é clicável (tamanho de opção); sem
                <code>value</code>, cabeçalho. <code>variant="destructive"</code> pinta a ação.
                <code>showCheckmark</code> e <code>selected</code>
                mostram o visto.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Option">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <Option
                        label="Secção"
                        first
                    />

                    <Option
                        label="Editar"
                        icon="fa-pen"
                        value="edit"
                        highlighted
                    />

                    <Option separator />

                    <Option
                        label="Eliminar"
                        icon="fa-trash"
                        value="delete"
                        variant="destructive"
                        last
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Checkmark</h3>

            <p>
                <code>showCheckmark</code> reserva a coluna do visto. <code>selected</code> torna-o
                visível.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Checkmark">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <Option
                        label="Não selecionado"
                        value="a"
                        show-checkmark
                        first
                    />

                    <Option
                        label="Selecionado"
                        value="b"
                        show-checkmark
                        selected
                        last
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Checkbox Switch</h3>

            <p>
                <code>showCheckboxSwitch</code> reserva a coluna do interruptor.
                <code>selected</code> deixa o switch ligado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Checkbox Switch">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <Option
                        label="Não selecionado"
                        value="ab"
                        show-checkbox-switch
                        first
                    />

                    <Option
                        label="Selecionado"
                        value="bc"
                        show-checkbox-switch
                        selected
                        last
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Label Helper</h3>

            <p>
                <code>labelHelper</code> adiciona um texto de ajuda ao label.
                <code>labelHelperPosition</code> define a posição do texto de ajuda.
                <code>optionHelperText</code> adiciona um texto de ajuda ao option.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Label Helper">
                <div class="m-4 max-w-xs rounded border bg-popover p-1">
                    <Option
                        label="Label Helper"
                        label-helper="Texto de ajuda"
                        label-helper-position="left"
                        option-helper-text="Texto de ajuda do helper"
                        value="ab"
                        first
                    />

                    <Option
                        label="Label Helper"
                        label-helper="Texto de ajuda"
                        label-helper-position="right"
                        option-helper-text="Texto de ajuda do helper"
                        value="bc"
                        selected
                        show-checkmark
                        last
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsOption"
});
</script>
