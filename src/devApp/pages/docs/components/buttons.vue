<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Button</h1>

            <p>Botão de ação com variantes de cor, tamanho e forma.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Button">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button label="Default" />
                    <Button
                        label="Primary"
                        variant="primary"
                    />
                    <Button
                        label="Secondary"
                        variant="secondary"
                    />
                    <Button
                        label="Success"
                        variant="success"
                    />
                    <Button
                        label="Warning"
                        variant="warning"
                    />
                    <Button
                        label="Info"
                        variant="info"
                    />
                    <Button
                        label="Destructive"
                        variant="destructive"
                    />
                    <Button
                        label="Transparent-Destructive"
                        variant="transparent-destructive"
                    />
                    <Button
                        label="Outline"
                        variant="outline"
                    />
                    <Button
                        label="Bordered"
                        variant="bordered"
                    />
                    <Button
                        label="Transparent"
                        variant="transparent"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Variações</h3>

            <p>
                <code
                    >variant="primary / default / secondary / success / warning / destructive /
                    outline / transparent / bordered / transparent-destructive"</code
                >
            </p>
        </section>

        <section>
            <h3>Tamanho</h3>

            <p>
                <code>size="small / medium / large"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button
                        label="Small"
                        size="small"
                        variant="secondary"
                    />
                    <Button
                        label="Medium"
                        size="medium"
                        variant="secondary"
                    />
                    <Button
                        label="Large"
                        size="large"
                        variant="secondary"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Forma e grupo</h3>

            <p>
                <code>shape="rounded"</code> para botão circular. Classe <code>btn-group</code> une
                bordas.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Forma e grupo">
                <div class="flex flex-col gap-4 p-4">
                    <div class="btn-group">
                        <Button
                            label="Um"
                            variant="bordered"
                            :hover-effect="false"
                        />
                        <Button
                            label="Dois"
                            variant="bordered"
                            :hover-effect="false"
                        />
                        <Button
                            label="Três"
                            variant="bordered"
                            :hover-effect="false"
                        />
                    </div>

                    <Button
                        variant="secondary"
                        class="rounded-full!"
                        shape="rounded"
                        size="medium"
                    >
                        <span class="fa-solid fa-search text-sm" />
                    </Button>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customização</h3>

            <p>
                <code>background-style</code> para mudar a cor de fundo.
                <code>border-style</code> para mudar a cor da borda. <code>hover-style</code> para
                mudar o estilo do hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customização">
                <div class="flex flex-col gap-4 p-4">
                    <div class="flex flex-col gap-2">
                        <label> background-style="bg-orange-700 text-white" </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-orange-700 text-white"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-red-700 text-white" <br />
                            border-style="border-2-yellow-500"
                        </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-red-700 text-white"
                            border-style="border-2-yellow-500"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-blue-700 text-white" <br />
                            border-style="border-2-green-500" <br />
                            hover-style="hover:opacity-50"
                        </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-blue-700 text-white"
                            border-style="border-4-green-500"
                            hover-style="hover:opacity-50"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label> radius-style="rounded-full" </label>

                        <Button
                            label="Exemplo"
                            radius-style="rounded-full"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
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
