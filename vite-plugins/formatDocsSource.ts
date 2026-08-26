import * as prettier from "prettier";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginPostcss from "prettier/plugins/postcss";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import { dedentSource } from "./dedentSource";

const PRETTIER_PLUGINS = [
    prettierPluginEstree,
    prettierPluginBabel,
    prettierPluginHtml,
    prettierPluginPostcss,
    prettierPluginTypescript
];

const PRETTIER_BASE = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    plugins: PRETTIER_PLUGINS
};

/**
 * Reads a static `language` / `lang` attribute from a DocsExample opening tag.
 *
 * @param attrs Text between `<DocsExample` and `>`
 * @returns Language id, default `vue`
 */
export function getDocsExampleLanguage(attrs: string): string {
    if (/(?:^|\s)(?::|v-bind:)(?:lang|language)\s*=/.test(attrs)) {
        return "vue";
    }

    const match = attrs.match(/(?:^|\s)(?:lang|language)\s*=\s*["']([^"']+)["']/i);

    return (match?.[1] ?? "vue").trim().toLowerCase();
}

/**
 * Whether the snippet looks like a Vue SFC instead of a template fragment.
 *
 * @param source Dedented markup
 * @returns True when `<template>`, `<script>` or `<style>` is present
 */
function looksLikeSfc(source: string): boolean {
    return /<(script|style)\b/i.test(source);
}

/**
 * Formats DocsExample inner markup with Prettier.
 *
 * @param source Dedented source
 * @param language Language hint
 * @returns Formatted source, or the original snippet when Prettier cannot parse it
 */
export async function formatDocsSource(source: string, language: string): Promise<string> {
    if (!source.trim()) {
        return source;
    }

    try {
        if (language === "js" || language === "javascript") {
            return stripTrailingNewline(
                await prettier.format(source, { ...PRETTIER_BASE, parser: "babel" })
            );
        }

        if (language === "ts" || language === "typescript") {
            return stripTrailingNewline(
                await prettier.format(source, { ...PRETTIER_BASE, parser: "typescript" })
            );
        }

        if (language === "css") {
            return stripTrailingNewline(
                await prettier.format(source, { ...PRETTIER_BASE, parser: "css" })
            );
        }

        if (language === "json") {
            return stripTrailingNewline(
                await prettier.format(source, { ...PRETTIER_BASE, parser: "json" })
            );
        }

        if (language === "bash" || language === "sh" || language === "shell") {
            return source;
        }

        if (looksLikeSfc(source)) {
            return stripTrailingNewline(
                await prettier.format(source, { ...PRETTIER_BASE, parser: "vue" })
            );
        }

        const wrapped = `<template>\n${source}\n</template>\n`;
        const formatted = await prettier.format(wrapped, { ...PRETTIER_BASE, parser: "vue" });

        return unwrapVueTemplate(formatted);
    } catch {
        return source;
    }
}

/**
 * Removes a wrapping `<template>` added only for Prettier.
 *
 * @param formatted Prettier output
 * @returns Inner template markup
 */
function unwrapVueTemplate(formatted: string): string {
    const trimmed = formatted.trim();
    const open = "<template>";
    const close = "</template>";

    if (!trimmed.startsWith(open) || !trimmed.endsWith(close)) {
        return stripTrailingNewline(trimmed);
    }

    const inner = trimmed.slice(open.length, trimmed.length - close.length);

    return dedentSource(inner);
}

/**
 * Drops a single trailing newline Prettier always adds.
 *
 * @param text Formatted text
 * @returns Text without a final newline
 */
function stripTrailingNewline(text: string): string {
    return text.replace(/\n$/, "");
}
