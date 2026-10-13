<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsOverrideCss",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# CSS do cliente: style.css e override.css

O cliente tem dois ficheiros opcionais para CSS próprio. Os dois carregam por cima do \`cht-base/src/css/style.css\` e das utilities Tailwind, sem abrir o design system. A diferença está no caminho que cada um faz no build e na posição na cascata.

| | \`src/css/style.css\` | \`src/override.css\` |
| --- | --- | --- |
| Como entra | Importado pelo Vite, vai no bundle junto com o CSS da base | Copiado tal como está, servido num \`<link>\` próprio no fim do \`body\` |
| Posição na cascata | Logo depois do CSS global da base, **antes** dos \`<style>\` dos componentes | **Último** do documento, depois de tudo |
| Ganha de utilities Tailwind e do CSS global da base | Sim | Sim |
| Ganha de \`<style>\` sem \`scoped\` de componentes, com a mesma especificidade | Não | Sim |
| \`@import\` relativo e \`url(./img.png)\` | Funcionam: o Vite resolve e põe hash nos assets | Não: o caminho relativo quebra e o asset não vai para o build |
| Minificação e autoprefixer | Sim | Não |
| Ao gravar em dev | HMR: troca o CSS sem recarregar | Full reload da página |
| \`@import "tailwindcss"\` no ficheiro | Gera um segundo Tailwind inteiro (não fazer) | Ignorado, o browser só dá 404 |

Nenhum dos dois ganha de \`<style scoped>\` sem especificidade maior: o atributo \`[data-v-…]\` soma especificidade. \`@apply\` não funciona em nenhum dos dois.

## Qual usar

- **\`style.css\`:** o CSS normal do cliente. Classes próprias, fontes, imagens, \`@import\` de outros ficheiros CSS do cliente.
- **\`override.css\`:** quando precisas da última palavra, por exemplo retocar o estilo de um componente que vem depois do \`style.css\` sem recorrer a \`!important\`.

Na dúvida, começa pelo \`style.css\`. O template de \`npx chtmain create\` já traz os dois ficheiros vazios. Sem \`CLIENT\` (docs / lab do \`cht-base\`) ou sem o ficheiro, nada é carregado.

Regras **sem** \`@layer\` ganham das utilities em \`@layer utilities\`, em qualquer um dos dois. Se meteres as regras dentro de \`@layer\`, perdes essa vantagem.

## style.css

Caminho fixo: \`<pasta-do-cliente>/src/css/style.css\`. O \`cht-base/src/main.ts\` importa \`cht-base/src/css/clientStyle.ts\` logo a seguir ao \`style.css\` da base. Esse módulo faz um \`import.meta.glob\` do ficheiro do cliente, que não resolve para nada quando o ficheiro não existe.

Só CSS puro. **Não** acrescentes \`@import "tailwindcss"\`, \`@source\`, \`@plugin\` nem \`@custom-variant\`: o \`style.css\` da base já gera o Tailwind com as classes do cliente. Repetir isso aqui duplica o preflight e o tema, e o tema padrão do Tailwind passa por cima dos tokens da base.

## override.css

Caminho fixo: \`<pasta-do-cliente>/src/override.css\`. Quem o carrega é o plugin \`cht-base/vite-plugins/clientOverride.ts\`.

- **Dev:** \`<link rel="stylesheet" href="/__client-override.css">\` no \`body\`, depois do CSS compilado.
- **Build:** o mesmo conteúdo vai para \`client-override.css\` ao lado do \`index.html\`.

O plugin só procura o ficheiro quando o servidor arranca. Se o criares com o \`dev\` a correr, reinicia.

## Exemplo

\`\`\`css
.hover-ring {
    outline-color: var(--color-primary);
}

.container-sm {
    max-width: 42rem;
}

[data-theme="dark"] .btn-group {
    border-color: color-mix(in oklab, var(--color-border) 70%, transparent);
}
\`\`\`

Usa tokens do tema (\`var(--color-primary)\`, etc.), não hex avulso, para light/dark continuarem coerentes. Ver [Temas](/docs/themes) e [Estilização](/docs/styling).

CSS extra **em runtime** (ligar/desligar ficheiros a pedido) não é nenhum destes: usa \`$project.style.loadCss\`, documentado em [Temas](/docs/themes).

Utilities Tailwind **novas** (não retocar classes existentes) usam [Plugin Tailwind do cliente](/docs/client-tailwind-plugin).

## O que não fazer

- Não copies componentes do \`cht-design-system\` para mudar 2px de hover; isso é CSS do cliente.
- Não importes \`style.css\` nem \`override.css\` no Vue ou no \`bootstrap.ts\`; a base já os liga, e importar de novo carrega o ficheiro duas vezes.
- Não dependas destes ficheiros no \`cht-base\`: são do cliente, e o núcleo não pode assumir que existem.
`;
        }
    }
});
</script>
