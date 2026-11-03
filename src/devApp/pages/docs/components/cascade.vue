<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Cascade</h1>

            <p>
                Abre e fecha um conteúdo. O Cascade não traz nada pronto: o botão, a seta e o
                conteúdo só aparecem se você passar pelos slots, e ele não tem estilo, cor nem borda
                própria. Você decide o que entra e como fica cada parte. O grupo do Sidebar usa o
                Cascade com um <code>Chip</code> no header.
            </p>
        </section>

        <section>
            <h3>Slots</h3>

            <p>
                <code>#header</code> é o conteúdo do botão. <code>#icon</code> é a seta: o wrapper
                dela gira 180° quando o Cascade abre, e sem o slot não há seta. O slot padrão é o
                conteúdo que recolhe. Os três recebem <code>isOpen</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slots">
                <div class="flex max-w-xs flex-col gap-4 p-4">
                    <Cascade default-open>
                        <template #header
                            ><div class="rounded border p-2">Só texto, sem seta</div></template
                        >

                        <p class="py-1 text-sm text-muted-foreground">Qualquer conteúdo.</p>
                        <p class="py-1 text-sm text-muted-foreground">Em qualquer quantidade.</p>
                    </Cascade>

                    <Cascade default-open>
                        <template #header="{ isOpen }">
                            <i
                                class="fa-solid mr-2 text-xs"
                                :class="isOpen ? 'fa-folder-open' : 'fa-folder'"
                            />
                            <span class="min-w-0 truncate font-semibold">Projetos</span>
                        </template>

                        <template #icon="{ isOpen }">
                            <i :class="isOpen ? 'fa-solid fa-minus' : 'fa-solid fa-plus'" />
                        </template>

                        <p class="py-1 text-sm text-muted-foreground">Site novo</p>
                        <p class="py-1 text-sm text-muted-foreground">App mobile</p>
                        <p class="py-1 text-sm text-muted-foreground">API</p>
                    </Cascade>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Aberto e fechado</h3>

            <p>
                Sem <code>open</code>, o Cascade guarda o próprio estado e começa fechado, ou aberto
                com <code>default-open</code>. Com <code>open</code>, você controla o estado: o
                clique só emite <code>update:open</code> e <code>change</code> com o valor novo, e é
                você quem atualiza a prop. O Sidebar faz assim para manter aberto o grupo que tem um
                link ativo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Aberto e fechado">
                <div class="flex max-w-xs flex-col gap-4 p-4">
                    <Cascade v-model:open="controlledOpen">
                        <template #header>Controlado por v-model:open</template>

                        <template #icon>
                            <i class="fa-solid fa-chevron-down text-xs" />
                        </template>

                        <p class="py-1 text-sm text-muted-foreground">Primeiro item</p>
                        <p class="py-1 text-sm text-muted-foreground">Segundo item</p>
                    </Cascade>

                    <small-muted>Estado: {{ controlledOpen ? "aberto" : "fechado" }}</small-muted>

                    <Button
                        label="Alternar de fora"
                        size="small"
                        variant="secondary"

                        @click="controlledOpen = !controlledOpen"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estilo</h3>

            <p>
                <code>header-class</code> estiliza o botão, <code>icon-class</code> o wrapper da
                seta e <code>content-class</code> o wrapper do conteúdo. Todos aceitam string, array
                ou objeto de classes, como o <code>:class</code> do Vue. Sem eles, o botão é
                transparente e sem borda.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estilo">
                <div class="flex max-w-xs flex-col gap-4 p-4">
                    <Cascade
                        default-open
                        header-class="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        content-class="px-4 py-2"
                    >
                        <template #header>Fundo e texto</template>

                        <p class="text-sm text-muted-foreground">Conteúdo com o seu recuo.</p>
                    </Cascade>

                    <Cascade
                        default-open
                        header-class="px-4 py-2 text-sm font-semibold"
                        content-class="border-t px-4 py-2"
                        class="rounded border bg-card"
                    >
                        <template #header>Cartão com borda</template>

                        <p class="text-sm text-muted-foreground">Borda e fundo no wrapper.</p>
                    </Cascade>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Com Chip</h3>

            <p>
                O Sidebar passa um <code>Chip</code> pelo <code>#header</code>. A borda de baixo do
                Chip é <code>border-b-2-transparent</code> fechado e
                <code>border-b-2-border</code> aberto, e a seta fica no <code>#right-side</code> do
                Chip, girando com <code>isOpen</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Com Chip">
                <div class="max-w-xs p-4">
                    <Cascade v-model:open="chipOpen">
                        <template #header="{ isOpen }">
                            <Chip
                                class="hover:bg-accent"
                                :class="isOpen ? 'border-b-2-border' : 'border-b-2-transparent'"
                                label="Relatórios"
                                label-icon="fa-chart-line"
                                variant="transparent"
                            >
                                <template #right-side>
                                    <i
                                        class="fa-solid fa-chevron-down mr-4 text-xs transition-transform duration-300"
                                        :class="{ 'rotate-180': isOpen }"
                                    />
                                </template>
                            </Chip>
                        </template>

                        <p class="px-4 py-2 text-sm text-muted-foreground">Vendas</p>
                        <p class="px-4 py-2 text-sm text-muted-foreground">Estoque</p>
                    </Cascade>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cascade from "@design/components/Cascade.vue";
import Button from "@design/components/Button.vue";
import Chip from "@design/components/Chip.vue";

export default defineComponent({
    name: "ComponentsCascade",

    components: {
        Cascade,
        Button,
        Chip
    },

    data() {
        return {
            controlledOpen: false,
            chipOpen: false
        };
    }
});
</script>
