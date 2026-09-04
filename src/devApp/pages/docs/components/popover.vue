<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Popover
            </h1>

            <p>
                Painel flutuante com conteúdo livre. Pode abrir no clique ou no hover.
                Ao contrário do Dropdown, <b>não</b> abre o modal do <code>FloatingPanel</code> no mobile.
                Use <code>mobileModal</code> ou <code>forceModal</code> se quiser esse comportamento.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Popover">
                <div class="p-4 flex flex-wrap gap-4">
                    <Popover header="Popover">
                        <small>Conteúdo no clique.</small>
                    </Popover>

                    <Popover header="Hover" openOnHover>
                        <small>Conteúdo no hover.</small>
                    </Popover>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Slot de botão
            </h3>

            <p>
                Use <code>#button</code> para substituir o gatilho padrão.
                O slot recebe <code>toggle</code>, <code>open</code>, <code>close</code> e <code>isOpen</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slot de botão">
                <div class="p-4 flex flex-wrap gap-4 items-center">
                    <Popover header="Custom">
                        <template #button="{ toggle, isOpen }">
                            <Button
                                :label="isOpen ? 'Fechar' : 'Abrir'"
                                variant="primary"
                                @click="toggle"
                            />
                        </template>

                        <small>Painel com gatilho customizado.</small>
                    </Popover>

                    <Popover header="Ícone">
                        <template #button="{ toggle }">
                            <Button variant="secondary" shape="rounded" size="small" @click="toggle">
                                <span class="fa-solid fa-ellipsis" />
                            </Button>
                        </template>

                        <small>Ações extras no painel.</small>
                    </Popover>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Fechar ao clicar no conteúdo
            </h3>

            <p>
                <code>closeOnContentClick</code> fecha o painel depois de um clique interno.<br>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fechar ao clicar no conteúdo">
                <div class="p-4 flex flex-wrap gap-4">
                    <Popover header="Permanece aberto">
                        <div class="flex flex-col gap-2 min-w-40">
                            <Button label="Ação 1" variant="transparent"/>
                            <Button label="Ação 2" variant="transparent"/>
                        </div>
                    </Popover>

                    <Popover header="Fecha no clique" closeOnContentClick>
                        <div class="flex flex-col gap-2 min-w-40">
                            <Button label="Ação 1" variant="transparent"/>
                            <Button label="Ação 2" variant="transparent"/>
                        </div>
                    </Popover>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Seta e largura
            </h3>

            <p>
                <code>hideDropdownArrow</code> (padrão <code>true</code>) esconde o chevron.
                <code>minWidthPx</code> define a largura mínima do painel.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Seta e largura">
                <div class="p-4 flex flex-wrap gap-4">
                    <Popover header="Com seta" :hideDropdownArrow="false">
                        <small>Chevron visível no gatilho.</small>
                    </Popover>

                    <Popover header="Largo" :minWidthPx="280">
                        <small>Painel com largura mínima de 280px.</small>
                    </Popover>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Conteúdo rico
            </h3>

            <p>
                O slot padrão aceita formulário, texto ou ações. Use <code>close</code> para fechar pelo conteúdo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Conteúdo rico">
                <div class="p-4">
                    <Popover header="Filtros">
                        <template #default="{ close }">
                            <div class="flex flex-col gap-3 p-1 min-w-56">
                                <Input
                                    id="docs-popover-filter"
                                    label="Busca"
                                    type="text"
                                    placeholder="Filtrar..."
                                />

                                <div class="flex justify-end gap-2">
                                    <Button label="Cancelar" variant="secondary" @click="close" />
                                    <Button label="Aplicar" variant="primary" @click="close" />
                                </div>
                            </div>
                        </template>
                    </Popover>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Popover from "@design/components/Popover.vue";
import Button from "@design/components/Button.vue";
import Input from "@design/components/Input.vue";

export default defineComponent({
    name: "ComponentsPopover",

    components: {
        Popover,
        Button,
        Input
    }
});
</script>
