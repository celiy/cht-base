/**
 * The docs code highlight module
 * This module is responsible for the syntax highlighting of the docs code blocks of the project.
 */

import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import powershell from "highlight.js/lib/languages/powershell";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("vue", xml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("powershell", powershell);

const LANGUAGE_ALIASES: Record<string, string> = {
    vue: "xml",
    html: "xml",
    xml: "xml",
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    typescript: "typescript",
    css: "css",
    json: "json",
    bash: "bash",
    sh: "bash",
    shell: "bash",
    powershell: "powershell",
    ps1: "powershell"
};

/**
 * Maps a docs language name to a highlight.js grammar id.
 *
 * @param language Prop value such as `vue` or `js`
 * @returns Registered highlight.js language
 */
export function resolveHighlightLanguage(language: string): string {
    const key = language.trim().toLowerCase();

    return LANGUAGE_ALIASES[key] ?? "xml";
}

/**
 * Whether the language has a registered grammar (unknown ones fall back to `xml`).
 *
 * @param language Language hint such as `bash` or `text`
 * @returns True when the language is highlighted as itself
 */
export function hasHighlightLanguage(language: string): boolean {
    return Object.prototype.hasOwnProperty.call(LANGUAGE_ALIASES, language.trim().toLowerCase());
}

/**
 * Escapes text for a plain `<code>` fallback.
 *
 * @param text Raw source
 * @returns HTML-safe text
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Syntax-highlights source for the docs Code tab.
 *
 * @param source Formatted source text
 * @param language Language hint (`vue`, `js`, `ts`, …)
 * @returns HTML of highlighted spans
 */
export function highlightDocsCode(source: string, language: string): string {
    if (!source) {
        return "";
    }

    const lang = resolveHighlightLanguage(language);

    try {
        return hljs.highlight(source, { language: lang, ignoreIllegals: true }).value;
    } catch {
        return escapeHtml(source);
    }
}
