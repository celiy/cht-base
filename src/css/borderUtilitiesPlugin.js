/**
 * The border utilities plugin
 * This plugin is responsible for the border utilities of the theme.
 */

import plugin from "tailwindcss/plugin";

/** Named border widths (matches Tailwind’s default border scale + `1`). */
const BORDER_WIDTHS = {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
};

/**
 * Side specs: utility root → CSS properties for width / color / style.
 * `x` / `y` paint both edges of the axis.
 */
const BORDER_SIDES = [
    {
        name: "border",
        widths: ["border-width"],
        colors: ["border-color"],
        styles: ["border-style"]
    },
    {
        name: "border-t",
        widths: ["border-top-width"],
        colors: ["border-top-color"],
        styles: ["border-top-style"]
    },
    {
        name: "border-r",
        widths: ["border-right-width"],
        colors: ["border-right-color"],
        styles: ["border-right-style"]
    },
    {
        name: "border-b",
        widths: ["border-bottom-width"],
        colors: ["border-bottom-color"],
        styles: ["border-bottom-style"]
    },
    {
        name: "border-l",
        widths: ["border-left-width"],
        colors: ["border-left-color"],
        styles: ["border-left-style"]
    },
    {
        name: "border-x",
        widths: ["border-left-width", "border-right-width"],
        colors: ["border-left-color", "border-right-color"],
        styles: ["border-left-style", "border-right-style"]
    },
    {
        name: "border-y",
        widths: ["border-top-width", "border-bottom-width"],
        colors: ["border-top-color", "border-bottom-color"],
        styles: ["border-top-style", "border-bottom-style"]
    }
];

/**
 * Flatten nested color maps (`red.500` → `red-500`).
 * @param {Record<string, unknown>} obj
 * @param {string} [prefix]
 * @returns {Record<string, string>}
 */
function flattenColors(obj, prefix = "") {
    /** @type {Record<string, string>} */
    const out = {};

    for (const [key, value] of Object.entries(obj ?? {})) {
        const path = prefix ? `${prefix}-${key}` : key;

        if (typeof value === "string") {
            out[key === "DEFAULT" ? prefix || "DEFAULT" : path] = value;
            continue;
        }

        if (value && typeof value === "object") {
            Object.assign(out, flattenColors(/** @type {Record<string, unknown>} */ (value), path));
        }
    }

    return out;
}

/**
 * Creates an object with the given properties and values
 * @param {string[]} props
 * @param {string} value
 */
function propsObject(props, value) {
    /** @type {Record<string, string>} */
    const out = {};

    for (const prop of props) {
        out[prop] = value;
    }

    return out;
}

/**
 * Creates the CSS for the border
 * @param {{ widths: string[], colors: string[], styles: string[] }} side
 * @param {string} width
 * @param {string} color
 */
function borderCss(side, width, color) {
    return {
        ...propsObject(side.styles, "var(--tw-border-style)"),
        ...propsObject(side.widths, width),
        ...propsObject(side.colors, color)
    };
}

/**
 * Apply `/40`-style opacity to a color (sized borders are not `type: "color"`).
 * @param {string} color
 * @param {string | null} modifier
 */
function withOpacity(color, modifier) {
    if (!modifier) {
        return color;
    }

    const amount = /^\d+(\.\d+)?$/.test(modifier) ? `${modifier}%` : modifier;

    return `color-mix(in oklab, ${color} ${amount}, transparent)`;
}

/**
 * Colored `border-*` / `border-{t,r,b,l,x,y}-*` utilities also paint a 1px border.
 * Sized: `border-1-primary`, `border-b-2-red-500`, `border-2-primary/40`.
 * Arbitrary width + color: `border-[1rem]/muted`, `border-b-[4px]/primary`
 * (slash — tokens cannot follow `]`).
 */
export default plugin(({ matchUtilities, theme }) => {
    // `type: "color"` injects these automatically; sized values need them explicitly.
    const colors = {
        transparent: "transparent",
        current: "currentcolor",
        inherit: "inherit",
        ...flattenColors(/** @type {Record<string, unknown>} */ (theme("colors") ?? {}))
    };

    /** @type {Record<string, { width: string, color: string }>} */
    const sized = {};

    for (const [widthKey, widthValue] of Object.entries(BORDER_WIDTHS)) {
        for (const [colorKey, colorValue] of Object.entries(colors)) {
            if (!colorKey || typeof colorValue !== "string") {
                continue;
            }

            sized[`${widthKey}-${colorKey}`] = {
                width: widthValue,
                color: colorValue
            };
        }
    }

    for (const side of BORDER_SIDES) {
        matchUtilities(
            {
                [side.name]: (value) => borderCss(side, "1px", value)
            },
            { values: colors, type: "color" }
        );

        matchUtilities(
            {
                [side.name]: (value, { modifier }) =>
                    borderCss(side, value.width, withOpacity(value.color, modifier))
            },
            // `type: "url"` rejects arbitrary lengths so slash form can own `border-b-[4px]/muted`.
            // `modifiers: "any"` enables `/40`, `/50`, … on sized colors.
            { values: sized, type: "url", modifiers: "any" }
        );

        matchUtilities(
            {
                [side.name]: (value, { modifier }) => {
                    if (!modifier) {
                        // e.g. `border-b-2` — defer to core width utils.
                        return {};
                    }

                    return borderCss(side, value, modifier);
                }
            },
            {
                values: BORDER_WIDTHS,
                modifiers: colors
            }
        );
    }
});
