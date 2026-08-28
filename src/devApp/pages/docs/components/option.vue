<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Option
            </h1>

            <p>
                Linha de lista com <code>label</code>, <code>icon</code>,
                <code>separator</code> e checkmark opcional.
                Com <code>value</code> é clicável (tamanho de opção); sem
                <code>value</code>, cabeçalho. <code>variant="destructive"</code>
                pinta a ação. <code>showCheckmark</code> e <code>selected</code>
                mostram o visto.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Option">
                <div class="m-4 p-2 max-w-xs rounded border bg-popover">
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
            <h3>
                Checkmark
            </h3>

            <p>
                <code>showCheckmark</code> reserva a coluna do visto.
                <code>selected</code> torna-o visível.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Checkmark">
                <div class="m-4 p-2 max-w-xs rounded border bg-popover">
                    <Option
                        label="Não selecionado"
                        value="a"
                        showCheckmark
                        first
                    />

                    <Option
                        label="Selecionado"
                        value="b"
                        showCheckmark
                        selected
                        last
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsOption"
});
</script>
