# CSS do cliente

O cliente pode ter dois arquivos de CSS próprios: `src/css/style.css` e `src/override.css`. Os dois carregam depois do CSS da base e das utilities Tailwind. A diferença está no caminho que cada um faz e na posição na cascata.

|                              | `src/css/style.css`                                                     | `src/override.css`                                  |
| ---------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| Como entra                   | Importado pelo Vite, junto com o CSS da base                            | Servido como um `<link>` separado, no fim do `body` |
| Posição                      | Logo depois do CSS global da base e antes dos `<style>` dos componentes | Por último, depois de tudo                          |
| `@import` e `url(./img.png)` | Funcionam, e o Vite põe hash nos assets                                 | Não funcionam, porque o caminho relativo quebra     |
| Minificação                  | Sim                                                                     | Não                                                 |
| Ao salvar em dev             | Troca o CSS sem recarregar a página                                     | Recarrega a página                                  |

## Qual usar

Comece pelo `style.css`. Ele é o CSS normal do cliente, com classes próprias, fontes e imagens.

Use o `override.css` quando precisar ganhar de um estilo que vem depois do `style.css`, sem recorrer a `!important`.

## Regras

- Não coloque `@import "tailwindcss"`, `@source`, `@plugin` ou `@custom-variant` no `style.css`. A base já gera o Tailwind com as classes do cliente, e repetir isso duplica o preflight e o tema.
- Não importe os dois arquivos no Vue nem no `bootstrap.ts`. A base já faz isso, e importar de novo carrega o arquivo duas vezes.
- Regras fora de `@layer` ganham das utilities. Se você colocar as regras dentro de `@layer`, perde essa vantagem.
- Use tokens do tema, como `var(--color-primary)`, em vez de cores fixas. Assim light e dark continuam coerentes.

## Exemplo

```css
.hover-ring {
    outline-color: var(--color-primary);
}

.container-sm {
    max-width: 42rem;
}

[data-theme="dark"] .btn-group {
    border-color: color-mix(in oklab, var(--color-border) 70%, transparent);
}
```

## Como o override.css é servido

O plugin `cht-base/vite-plugins/clientOverride.ts` procura o arquivo quando o servidor sobe. No dev, ele entra como `/__client-override.css`. No build, vai para `client-override.css` ao lado do `index.html`. Se você criar o arquivo com o `dev` rodando, reinicie o servidor.
