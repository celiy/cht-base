<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Sidebar</h1>

            <p>
                Shell de navegação: painel à esquerda e conteúdo à direita. Esta wiki já usa uma
                instância <code>variant="minimalist"</code> no layout. Os quadros abaixo são o
                componente de verdade, isolado — o atalho <code>s</code> continua a controlar só a
                sidebar da wiki.
            </p>
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

            <p><code>type: "section"</code> — rótulo, sem clique. Só <code>label</code>.</p>

            <p>
                <code>type: "link"</code> — <code>label</code>, <code>link</code> (rota) e
                <code>leftIcon</code> opcional (classe Font Awesome, ex. <code>fa-user</code>).
            </p>

            <p>
                <code>type: "group"</code> — accordion. <code>label</code>,
                <code>leftIcon</code> opcional, <code>links: [{ label, link, leftIcon }]</code>.
                Aberto/fechado é estado local; um sublink ativo ou <code>openByDefault</code> /
                <code>open</code> começam abertos. A animação é <code>grid-template-rows</code>.
            </p>
        </section>

        <section>
            <h3>Slots</h3>

            <p>
                <code>#header</code> e <code>#footer</code> ficam fora da lista que rola.
                <code>#sidebar-body</code> entra no <code>&lt;nav&gt;</code> depois dos links. O
                slot default é o conteúdo da página. <code>#top-bar</code> só existe na variante
                default (ao lado do hamburger).
            </p>

            <p>
                As props <code>title</code> e <code>description</code> existem na API mas o
                cabeçalho visível vem do slot <code>#header</code>.
            </p>
        </section>

        <section>
            <h3>Desktop, resize e mobile</h3>

            <p>
                Em desktop o painel empurra o conteúdo (<code>margin-left</code> = largura).
                <code>sidebarWidth</code> (padrão <code>300</code>) é o valor inicial; arraste a
                borda direita entre <code>minSidebarWidth</code> (250) e
                <code>maxSidebarWidth</code> (350).
            </p>

            <p>
                Em mobile o painel é overlay (<code>min-w-[80%]</code>,
                <code>sm:min-w-[60%]</code>), fecha no backdrop, no swipe para a esquerda e ao
                clicar num link. Com o painel fechado, swipe para a direita reabre.
                <code>startOpen</code> (padrão <code>true</code>) — nesta wiki começa fechado no
                telemóvel.
            </p>
        </section>

        <section>
            <h3>Atalho</h3>

            <p>
                Com <code>toggleKeybind</code> (padrão <code>true</code>), um <code>Keybind</code>
                <code>s</code> chama <code>toggleOpenClose</code>. Não dispara enquanto o foco está
                num input, textarea ou select. O hamburger faz o mesmo no clique. Passe
                <code>:toggle-keybind="false"</code> se outra Sidebar já usar o <code>s</code>.
            </p>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsSidebar"
});
</script>
