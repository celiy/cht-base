/**
 * Demo Tailwind utilities for the override-demo client.
 * Loaded by cht-base via `@plugin` when CLIENT=override-demo.
 */
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
