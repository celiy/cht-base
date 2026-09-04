<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Button
            </h1>

            <p>
                Botão de ação com variantes de cor, tamanho e forma.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Button">
                <div class="p-4 flex flex-wrap gap-2 items-center">
                    <Button label="Default" />
                    <Button label="Primary" variant="primary" />
                    <Button label="Secondary" variant="secondary" />
                    <Button label="Success" variant="success" />
                    <Button label="Warning" variant="warning" />
                    <Button label="Destructive" variant="destructive" />
                    <Button label="Outline" variant="outline" />
                    <Button label="Bordered" variant="bordered" />
                    <Button label="Transparent" variant="transparent" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant="primary / default / secondary / success / warning / destructive / outline / transparent / bordered / transparent-destructive"</code>
            </p>
        </section>

        <section>
            <h3>
                Tamanho
            </h3>

            <p>
                <code>size="small / medium / large"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="p-4 flex flex-wrap gap-2 items-center">
                    <Button label="Small" size="small" variant="secondary" />
                    <Button label="Medium" size="medium" variant="secondary" />
                    <Button label="Large" size="large" variant="secondary" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Forma e grupo
            </h3>

            <p>
                <code>shape="rounded"</code> para botão circular. Classe <code>btn-group</code> une bordas.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Forma e grupo">
                <div class="p-4 flex flex-col gap-4">
                    <div class="btn-group">
                        <Button label="Um" variant="bordered" :hover-effect="false" />
                        <Button label="Dois" variant="bordered" :hover-effect="false" />
                        <Button label="Três" variant="bordered" :hover-effect="false" />
                    </div>

                    <Button variant="secondary" class="rounded-full!" shape="rounded" size="medium">
                        <span class="fa-solid fa-search text-sm" />
                    </Button>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: "ComponentsButtons",

    components: {
        Button
    }
});
</script>
