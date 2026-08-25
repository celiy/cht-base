<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Sidebar
            </h1>

            <p>
                Navegação lateral com seções, links e grupos. Atalho <code>s</code> abre e fecha
                (ignorado enquanto o foco está num input, textarea ou select).
                Esta página já está dentro da Sidebar da wiki.
            </p>
        </section>

        <section>
            <h3>
                Variantes
            </h3>

            <p>
                <code>variant="minimalist"</code> (esta wiki): fundo de página, scrollbar escondida,
                hamburger só no conteúdo. <code>variant="default"</code>: fundo <code>sidebar</code>,
                barra no topo do conteúdo com hamburger e um separator.
                Em ambos o header (título + descrição) fica fixo e só a lista de links rola.
            </p>
        </section>

        <section>
            <h3>
                Props
            </h3>

            <p>
                <code>title</code> e <code>description</code> no cabeçalho.
                <code>sidebarWidth</code> (padrão <code>300</code>) define a largura em desktop e a
                <code>margin-left</code> do conteúdo. Em mobile a nav ocupa 85% e fecha ao tocar no backdrop.
            </p>
        </section>

        <section>
            <h3>
                navItems
            </h3>

            <p>
                Array de <code>{ type, label, ... }</code> com três formas:
            </p>

            <p>
                <code>type: "section"</code> — rótulo de grupo, sem clique.
                Só precisa de <code>label</code>.
            </p>

            <p>
                <code>type: "link"</code> — item clicável. <code>label</code> e <code>link</code> (rota).
            </p>

            <p>
                <code>type: "group"</code> — accordion de sublinks. <code>label</code> e
                <code>links: [{ label, link }]</code> (não use <code>children</code>).
                O aberto/fechado é estado local; o primeiro clique abre na hora (animação CSS de
                <code>grid-template-rows</code>, sem <code>&lt;transition&gt;</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="navItems">
                <pre class="p-4 text-xs overflow-auto bg-muted/60 rounded-lg">{{ exampleNav }}</pre>
            </DocsExample>
        </section>

        <section>
            <h3>
                Atalho
            </h3>

            <p>
                <code>Keybind</code> com <code>key-name="s"</code> no conteúdo chama <code>toggleOpenClose</code>.
                Não dispara se você estiver digitando. O mesmo botão hamburger faz o toggle no clique.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsSidebar",

    data() {
        return {
            exampleNav: `{
  title: "CHT Docs",
  description: "The CHT documentation.",
  variant: "minimalist",
  sidebarWidth: 300,
  navItems: [
    { type: "section", label: "Form" },
    { type: "link", label: "Form renderer", link: "/docs/components/form-renderer" },
    { type: "section", label: "Custom" },
    {
      type: "group",
      label: "Charts",
      links: [
        { label: "Barras", link: "/docs/components/charts" },
        { label: "Onda", link: "/docs/components/charts" }
      ]
    }
  ]
}`
        };
    }
});
</script>
