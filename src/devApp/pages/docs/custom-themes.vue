<template>
    <article class="container-sm docs-article">
        <section>
            <h1>simplicia e hodiernus</h1>

            <p>
                Estilos de superfície (sólido vs vidro), independentes de light/dark. Troca com
                <code>$project.style.setCustomTheme</code>. A navbar desta app já usa
                <code>Navigator</code> — muda o estilo e vê o chrome, o overlay e os painéis abaixo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Componentes">
                <div class="flex flex-col gap-4 p-4">
                    <div class="flex flex-wrap items-center gap-3">
                        <Button
                            :label="
                                $project.style.customTheme === 'hodiernus'
                                    ? 'Mudar para simplicia'
                                    : 'Mudar para hodiernus'
                            "

                            @click="toggleCustomTheme"
                        />
                    </div>

                    <Navigator>
                        <div class="flex items-center gap-2 px-3 py-2">
                            <small>Navigator</small>
                        </div>
                    </Navigator>

                    <div class="flex flex-wrap items-center gap-2">
                        <Dropdown
                            header="Dropdown"
                            :mobile-modal="false"
                            :options="[
                                { label: 'Perfil', value: 'user', icon: 'fa-user' },
                                { separator: true },
                                { label: 'Sair', value: 'exit', icon: 'fa-right-from-bracket' }
                            ]"
                        />

                        <Select
                            header="Select"
                            :mobile-modal="false"
                            :options="[
                                { label: 'Um', value: '1' },
                                { label: 'Dois', value: '2' }
                            ]"
                        />

                        <Popover :mobile-modal="false">
                            <template #button="{ toggle }">
                                <Button
                                    label="Popover"

                                    @click="toggle"
                                />
                            </template>

                            <p class="px-1 py-0.5 text-sm">Painel flutuante.</p>
                        </Popover>

                        <Button v-tooltip="'Tooltip'">Tooltip</Button>

                        <Button
                            label="Modal"

                            @click="modalOpen = true"
                        />

                        <Button
                            label="Toast"

                            @click="() => $toast.info('Toast.')"
                        />
                    </div>

                    <Item
                        class="max-w-sm"
                        label="Item"
                        description="Dados da conta e preferências."
                        icon="fa-layer-group"
                    />
                </div>
            </DocsExample>
        </section>

        <Modal
            :is-open="modalOpen"
            :url-sync="false"

            @update:value="modalOpen = $event"
        >
            <template #header>Modal</template>

            <template #description>O overlay muda com o estilo.</template>

            <template #body>
                <p>Fecha no X, Esc ou no fundo.</p>
            </template>
        </Modal>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "DocsCustomThemes",

    data() {
        return {
            modalOpen: false
        };
    },

    methods: {
        toggleCustomTheme() {
            const next =
                this.$project.style.customTheme === "hodiernus" ? "simplicia" : "hodiernus";

            this.$project.style.setCustomTheme(next);
        }
    }
});
</script>
