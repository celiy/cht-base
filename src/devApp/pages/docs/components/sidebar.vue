<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Sidebar</h1>

            <p>Shell de navegação, com painel à esquerda e conteúdo à direita. A documentação já usa uma instância com <code>variant="minimalist"</code> no layout. Os quadros abaixo mostram o componente isolado. O atalho <code>s</code> continua controlando só a sidebar da documentação.</p>
        </section>

        <section>
            <h3>Variante default</h3>

            <p>
                Fundo <code>sidebar</code>, barra no topo do conteúdo com o hamburger e o slot
                <code>#top-bar</code>. Arraste a borda direita do painel para redimensionar.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Default">
                <div class="relative isolate h-[28rem] overflow-hidden rounded">
                    <Sidebar
                        :toggle-keybind="false"
                        :sidebar-width="300"
                        :min-sidebar-width="250"
                        :max-sidebar-width="300"
                        :nav-items="[
                            { type: 'section', label: 'Secção' },
                            {
                                type: 'link',
                                label: 'Esta página',
                                link: '/docs/components/sidebar',
                                leftIcon: 'fa-bars'
                            },
                            { type: 'section', label: 'Group' },
                            {
                                type: 'group',
                                label: 'Grupo',
                                leftIcon: 'fa-folder',
                                openByDefault: true,
                                links: [
                                    {
                                        label: 'Variante default',
                                        link: '/docs/components/sidebar#variante-default',
                                        leftIcon: 'fa-table-columns'
                                    },
                                    {
                                        label: 'Slots',
                                        link: '/docs/components/sidebar#slots',
                                        leftIcon: 'fa-layer-group'
                                    }
                                ]
                            }
                        ]"
                    >
                        <template #header>
                            <div class="px-4 pt-3 pb-2">
                                <h4>App</h4>

                                <small class="text-muted-foreground"> Variante default. </small>
                            </div>
                        </template>

                        <template #top-bar>
                            <div
                                class="flex flex-1 items-center px-2 text-sm text-muted-foreground"
                            >
                                Slot top-bar
                            </div>
                        </template>

                        <template #footer>
                            <small class="block px-4 py-3 text-muted-foreground!">
                                Slot footer
                            </small>
                        </template>

                        <div class="p-4">
                            <p class="text-sm">Conteúdo. O hamburger abre e fecha o painel.</p>
                        </div>
                    </Sidebar>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Variante minimalist</h3>

            <p>
                Fundo de página, scrollbar dos links escondida, hamburger flutuante no conteúdo (sem
                barra nem <code>#top-bar</code>). É o que esta documentação usa.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Minimalist">
                <div class="relative isolate h-[28rem] overflow-hidden rounded border">
                    <Sidebar
                        variant="minimalist"
                        :toggle-keybind="false"
                        :sidebar-width="300"
                        :min-sidebar-width="250"
                        :max-sidebar-width="300"
                        :nav-items="[
                            { type: 'section', label: 'Secção' },
                            {
                                type: 'link',
                                label: 'Esta página',
                                link: '/docs/components/sidebar',
                                leftIcon: 'fa-bars'
                            },
                            { type: 'section', label: 'Group' },
                            {
                                type: 'group',
                                label: 'Grupo',
                                leftIcon: 'fa-folder',
                                openByDefault: true,
                                links: [
                                    {
                                        label: 'Variante default',
                                        link: '/docs/components/sidebar#variante-default',
                                        leftIcon: 'fa-table-columns'
                                    },
                                    {
                                        label: 'Slots',
                                        link: '/docs/components/sidebar#slots',
                                        leftIcon: 'fa-layer-group'
                                    }
                                ]
                            }
                        ]"
                    >
                        <template #header>
                            <div class="px-4 pt-3 pb-2">
                                <h4>Docs</h4>
                            </div>
                        </template>

                        <div class="p-4">
                            <p class="text-sm">Mesmos <code>navItems</code>, chrome mais leve.</p>
                        </div>
                    </Sidebar>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>navItems</h3>

            <p>
                Array de <code>{ type, label, … }</code>. Três formas. Grupo usa <code>links</code>,
                não <code>children</code>.
            </p>

            <p><code>type: "section"</code> é um rótulo, sem clique. Usa só <code>label</code>.</p>

            <p>
                <code>type: "link"</code> usa <code>label</code>, <code>link</code>, que é a rota, e
                <code>leftIcon</code> opcional (classe Font Awesome, ex. <code>fa-user</code>).
            </p>

            <p><code>type: "group"</code> vira um accordion. Ele usa <code>label</code>, <code>leftIcon</code>, que é opcional, e <code>links: [{ label, link, leftIcon }]</code>. Aberto ou fechado é estado local. Um grupo começa aberto se tiver um sublink ativo, ou se usar <code>openByDefault</code> ou <code>open</code>. A animação usa <code>grid-template-rows</code>.</p>
        </section>

        <section>
            <h3>Slots</h3>

            <p><code>#header</code> e <code>#footer</code> ficam fora da lista que rola. <code>#sidebar-body</code> entra no <code>&lt;nav&gt;</code>, depois dos links. O slot padrão é o conteúdo da página. <code>#top-bar</code> só existe na variante padrão, ao lado do hambúrguer.</p>

            <p>
                As props <code>title</code> e <code>description</code> existem na API mas o
                cabeçalho visível vem do slot <code>#header</code>.
            </p>
        </section>

        <section>
            <h3>Conteúdo dinâmico nos slots</h3>

            <p>Os slots são renderizados pelo próprio componente, então aceitam qualquer conteúdo reativo, com <code>v-for</code>, <code>v-if</code> ou valores do estado da página. Quando o estado muda, o slot atualiza sem precisar reabrir a Sidebar. Isso vale para <code>#header</code>, <code>#sidebar-body</code> e <code>#footer</code>.</p>

            <p><code>#sidebar-body</code> não rola sozinho. Ele fica depois da lista de links, que é o único trecho com scroll. Se a lista puder ficar longa, envolva o conteúdo numa <code>div</code> com <code>max-h-*</code> e <code>overflow-y-auto</code>.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slot dinâmico">
                <div class="relative isolate h-[28rem] overflow-hidden rounded border">
                    <Sidebar
                        variant="minimalist"
                        :toggle-keybind="false"
                        :sidebar-width="300"
                        :min-sidebar-width="250"
                        :max-sidebar-width="300"
                        :nav-items="[
                            { type: 'section', label: 'Navegação' },
                            {
                                type: 'link',
                                label: 'Esta página',
                                link: '/docs/components/sidebar',
                                leftIcon: 'fa-bars'
                            }
                        ]"
                    >
                        <template #header>
                            <div class="px-4 pt-3 pb-2">
                                <h4>Recentes ({{ recentItems.length }})</h4>
                            </div>
                        </template>

                        <template #sidebar-body>
                            <div class="flex flex-col gap-1 px-2 pt-2">
                                <p
                                    v-if="recentItems.length === 0"

                                    class="px-2 text-sm text-muted-foreground"
                                >
                                    Nenhum item ainda.
                                </p>

                                <span
                                    v-for="item in recentItems"
                                    :key="item"

                                    class="truncate rounded px-2 py-1 text-sm"
                                >
                                    {{ item }}
                                </span>
                            </div>
                        </template>

                        <template #footer>
                            <div class="px-4 pb-3">
                                <Button
                                    label="Adicionar item"
                                    variant="secondary"
                                    size="small"

                                    @click="addRecentItem"
                                />
                            </div>
                        </template>

                        <div class="p-4">
                            <p class="text-sm">
                                Os itens do slot mudam ao clicar no botão do rodapé.
                            </p>
                        </div>
                    </Sidebar>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Desktop, resize e mobile</h3>

            <p>No desktop, o painel empurra o conteúdo, com <code>margin-left</code> igual à largura. <code>sidebarWidth</code>, com padrão <code>300</code>, é o valor inicial. Arraste a borda direita entre <code>minSidebarWidth</code>, de 250, e <code>maxSidebarWidth</code>, de 350.</p>

            <p>No mobile, o painel vira overlay, com <code>min-w-[80%]</code> e <code>sm:min-w-[60%]</code>. Ele fecha ao clicar no fundo, com swipe para a esquerda e ao clicar num link. Com o painel fechado, swipe para a direita reabre. <code>startOpen</code>, com padrão <code>true</code>, define o estado inicial. Na documentação, ele começa fechado no celular.</p>
        </section>

        <section>
            <h3>Atalho</h3>

            <p>Com <code>toggleKeybind</code>, que vem <code>true</code>, o <code>Keybind</code> <code>s</code> chama <code>toggleOpenClose</code>. O atalho não dispara com o foco num input, textarea ou select. O hambúrguer faz o mesmo no clique. Passe <code>:toggle-keybind="false"</code> se outra Sidebar já usar o <code>s</code>.</p>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsSidebar",

    data() {
        return {
            recentItems: ["Relatório Q1", "Cliente Acme"],
            nextItemNumber: 1
        };
    },

    methods: {
        /**
         * Appends a new item to the dynamic sidebar body.
         * @returns {void}
         */
        addRecentItem() {
            this.nextItemNumber += 1;
            this.recentItems.push(`Item ${this.nextItemNumber}`);
        }
    }
});
</script>
