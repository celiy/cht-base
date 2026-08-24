import type { Plugin } from "vite";

const OPEN = "<DocsExample";
const CLOSE = "</DocsExample>";

type DocsExampleBlock = {
    gt: number;
    attrs: string;
    inner: string;
};

/**
 * Strips the shared leading indent from a template snippet.
 *
 * @param raw Inner markup of a DocsExample
 * @returns Dedented source for the Code tab
 */
export function dedentSource(raw: string): string {
    const trimmed = raw.replace(/^\n/, "").replace(/\s+$/, "");
    const lines = trimmed.split("\n");
    const indents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);
    const min = indents.length > 0 ? Math.min(...indents) : 0;

    return lines
        .map((line) => line.slice(min))
        .join("\n")
        .trimEnd();
}

/**
 * Whether the opening-tag attributes already bind `source`.
 *
 * @param attrs Text between `<DocsExample` and `>`
 * @returns True when the author (or a previous transform) set source
 */
export function hasSourceAttr(attrs: string): boolean {
    return /(?:^|\s)(?::|v-bind:)?source\s*=/.test(attrs);
}

/**
 * Encodes a source string as a Vue template expression for `:source`.
 *
 * Must survive HTML entity decoding (`&quot;` → `"`) inside a single-quoted
 * attribute, which would otherwise terminate the JSON string literal.
 *
 * @param source Dedented markup
 * @returns JS string literal safe inside a single-quoted HTML attribute
 */
export function toSourceExpr(source: string): string {
    return JSON.stringify(source)
        .replace(/&/g, "\\u0026")
        .replace(/'/g, "\\u0027")
        .replace(/</g, "\\u003c");
}

/**
 * Injects `:source` on every `<DocsExample>` from its inner template.
 *
 * @param code SFC file contents
 * @returns Transformed SFC
 */
export function injectDocsExampleSources(code: string): string {
    const blocks = findDocsExampleBlocks(code);
    let result = code;

    for (let index = blocks.length - 1; index >= 0; index -= 1) {
        const block = blocks[index];

        if (!block || hasSourceAttr(block.attrs)) {
            continue;
        }

        const source = dedentSource(block.inner);
        const insertion = ` :source='${toSourceExpr(source)}'`;
        result = `${result.slice(0, block.gt)}${insertion}${result.slice(block.gt)}`;
    }

    return result;
}

/**
 * Vite plugin: copies `<DocsExample>` inner markup into `:source` before Vue compiles the SFC.
 */
export function docsExampleSourcePlugin(): Plugin {
    return {
        name: "cht-docs-example-source",
        enforce: "pre",
        transform(code, id) {
            const file = id.split("?")[0] ?? id;

            if (!file.endsWith(".vue") || !file.includes("/devApp/pages/docs/")) {
                return null;
            }

            if (!code.includes(OPEN)) {
                return null;
            }

            const next = injectDocsExampleSources(code);

            if (next === code) {
                return null;
            }

            return {
                code: next,
                map: null
            };
        }
    };
}

/**
 * Finds the `>` that closes an HTML tag, ignoring `>` inside quotes.
 *
 * @param code Full file
 * @param from Index of `<`
 * @returns Index of `>`, or -1
 */
function findTagGt(code: string, from: number): number {
    let quote: '"' | "'" | null = null;

    for (let index = from; index < code.length; index += 1) {
        const char = code[index];

        if (quote) {
            if (char === quote && code[index - 1] !== "\\") {
                quote = null;
            }

            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }

        if (char === ">") {
            return index;
        }
    }

    return -1;
}

/**
 * Whether `index` sits inside an HTML comment.
 *
 * @param code Full file
 * @param index Candidate position
 * @returns True when inside `<!-- ... -->`
 */
function isInsideHtmlComment(code: string, index: number): boolean {
    const open = code.lastIndexOf("<!--", index);
    const close = code.lastIndexOf("-->", index);

    return open !== -1 && open > close;
}

/**
 * Index of the matching `</DocsExample>` for a nested-aware scan.
 *
 * @param code Full file
 * @param innerStart First index after the opening `>`
 * @returns Start index of the close tag, or -1
 */
function findMatchingClose(code: string, innerStart: number): number {
    let depth = 1;
    let index = innerStart;

    while (index < code.length && depth > 0) {
        const nextOpen = code.indexOf(OPEN, index);
        const nextClose = code.indexOf(CLOSE, index);

        if (nextClose === -1) {
            return -1;
        }

        if (nextOpen !== -1 && nextOpen < nextClose) {
            if (!isInsideHtmlComment(code, nextOpen)) {
                depth += 1;
            }

            index = nextOpen + OPEN.length;
            continue;
        }

        if (!isInsideHtmlComment(code, nextClose)) {
            depth -= 1;

            if (depth === 0) {
                return nextClose;
            }
        }

        index = nextClose + CLOSE.length;
    }

    return -1;
}

/**
 * Collects DocsExample open/inner pairs in the file.
 *
 * @param code SFC contents
 * @returns Blocks in document order
 */
function findDocsExampleBlocks(code: string): DocsExampleBlock[] {
    const blocks: DocsExampleBlock[] = [];
    let index = 0;

    while (index < code.length) {
        const open = code.indexOf(OPEN, index);

        if (open === -1) {
            break;
        }

        const afterName = code[open + OPEN.length];

        if (afterName && /[A-Za-z0-9-]/.test(afterName)) {
            index = open + OPEN.length;
            continue;
        }

        if (isInsideHtmlComment(code, open)) {
            index = open + OPEN.length;
            continue;
        }

        const gt = findTagGt(code, open);

        if (gt === -1) {
            break;
        }

        const attrs = code.slice(open + OPEN.length, gt);
        const selfClosing = code[gt - 1] === "/";

        if (selfClosing) {
            index = gt + 1;
            continue;
        }

        const innerStart = gt + 1;
        const closeStart = findMatchingClose(code, innerStart);

        if (closeStart === -1) {
            break;
        }

        blocks.push({
            gt,
            attrs,
            inner: code.slice(innerStart, closeStart)
        });

        index = closeStart + CLOSE.length;
    }

    return blocks;
}
