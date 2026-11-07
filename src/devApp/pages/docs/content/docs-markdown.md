# DocsMarkdown

`DocsMarkdown` transforma um texto em markdown em uma página de documentação já estilizada, com títulos, tabelas e código colorido. É o componente que renderiza as páginas desta documentação, e um cliente pode usá-lo para montar a documentação própria sem instalar nenhuma biblioteca de markdown.

## Usar no cliente

1. **Crie o arquivo `.md`** dentro do cliente, por exemplo `src/docs/guia.md`.
2. **Crie uma página** que importe o arquivo com `?raw`, que entrega o texto puro, e passe o texto para `<DocsMarkdown>`.
3. **Registre a rota** da página nas `routes` do cliente.

```vue
<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import guia from "../docs/guia.md?raw";

export default defineComponent({
    name: "GuiaPage",

    computed: {
        source(): string {
            return guia;
        }
    }
});
</script>
```

O estilo do código e as classes Tailwind que o componente usa já vêm com o design system. O cliente não precisa importar CSS.

## Props

| Prop     | Tipo      | Padrão      | Para quê                                                                                                                                      |
| -------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `source` | `string`  | obrigatória | O markdown a renderizar.                                                                                                                      |
| `bare`   | `boolean` | `false`     | Tira o `article` de página (largura `container-sm`, margem no topo e `pb-16`). Use para embutir o texto dentro de outra página ou de um card. |

## O que o markdown aceita

O renderizador entende só um subconjunto, o que a documentação precisa. O que não está na tabela aparece como texto comum. Dentro de uma célula de tabela, não use a barra vertical, nem mesmo entre crases: ela separa as colunas.

| Sintaxe                         | Resultado                                                 |
| ------------------------------- | --------------------------------------------------------- |
| `#` até `######`                | Títulos.                                                  |
| Linhas com `-` ou `*`           | Lista com marcadores.                                     |
| Linhas com `1.`                 | Lista numerada.                                           |
| Linhas com barras verticais     | Tabela com cabeçalho, em um bloco com rolagem horizontal. |
| Bloco de código com três crases | Código. Com uma linguagem conhecida, ganha cores.         |
| Texto entre crases simples      | Código no meio do texto.                                  |
| `**texto**`                     | Negrito.                                                  |
| `[texto](url)`                  | Link.                                                     |
| `![alt](url)`                   | Imagem com carregamento preguiçoso.                       |

As linguagens com cor são `vue`, `html`, `xml`, `js`, `ts`, `css`, `json`, `bash`, `sh`, `shell` e `powershell`. Qualquer outra, como `text`, mostra o código sem cor.

Fora do que está na tabela, nada é interpretado: não há citação (`>`), itálico, listas aninhadas, nem HTML dentro do texto. Um bloco de código também não pode conter outro bloco de código, porque o primeiro fecho de três crases encerra o bloco.

## Só texto de confiança

O resultado entra na página com `v-html`, e o texto comum não é escapado. Escrito dentro do projeto, como nos exemplos acima, não há problema. Nunca passe para `source` texto vindo de usuário, de um formulário ou de uma API, porque um `<script>` ali seria executado. O conteúdo de blocos de código e do código entre crases é escapado.

## Funções de apoio

Para renderizar sem o componente, importe de `@design/components/internal/markdown`:

- `renderMarkdown(markdown)` devolve o HTML como texto.
- `extractMarkdownFromHeading(source, inicio, fim?)` devolve o trecho entre dois títulos, útil para mostrar só uma seção de um `.md` grande. Os títulos são procurados pelo texto exato, como `## Props`.

Por exemplo, para mostrar só uma seção de um arquivo grande:

```ts
import guia from "../docs/guia.md?raw";
import { extractMarkdownFromHeading } from "@design/components/internal/markdown";

const instalacao = extractMarkdownFromHeading(guia, "## Instalação", "## Uso");
```
