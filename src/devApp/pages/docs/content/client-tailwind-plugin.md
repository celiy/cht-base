# Plugin Tailwind do cliente

A base já gera as utilities globais, como as bordas coloridas. Quando o cliente precisa de utilities que só ele usa, ele adiciona um plugin em `src/tailwind.plugin.js`.

O Vite troca o marcador `@plugin "virtual:client-tailwind-plugin"` do `cht-base/src/css/style.css` pelo caminho desse arquivo. Sem `CLIENT`, ou sem o arquivo, o marcador some e nada é injetado.

## Formato

O arquivo `src/tailwind.plugin.js` (crie se não existir) exporta um plugin Tailwind v4, do mesmo jeito que o da base:

```js
import plugin from "tailwindcss/plugin";

export default plugin(({ addUtilities }) => {
    addUtilities({
        ".demo-stripe": {
            "border-top-width": "3px",
            "border-top-style": "solid",
            "border-top-color": "var(--color-primary)"
        }
    });
});
```

Use tokens, como `var(--color-primary)`, para light e dark continuarem coerentes.

O nome da classe precisa aparecer como texto no `src/` do cliente, no template, num `:class` ou num mapa de strings. O scan do Tailwind não enxerga nomes montados em runtime, como `demo-${name}`.
