/**
 * Escapes text for HTML text nodes and code blocks.
 *
 * @param text Raw text
 * @returns Escaped HTML
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Renders inline markdown: code, bold, links.
 *
 * @param text Heading or paragraph text
 * @returns HTML
 */
function renderInline(text: string): string {
    const codes: string[] = [];
    const withCodePlaceholders = text.replace(/`([^`]+)`/g, (_, code: string) => {
        codes.push(`<code>${escapeHtml(code)}</code>`);

        return `%%CODE${codes.length - 1}%%`;
    });

    const html = withCodePlaceholders
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2">$1</a>');

    return html.replace(/%%CODE(\d+)%%/g, (_, index: string) => codes[Number(index)] ?? "");
}

/**
 * Extracts a slice of markdown from one heading up to (not including) another.
 *
 * @param source Full markdown
 * @param startHeading Heading line to start at (must match exactly at a line start)
 * @param endHeading Optional heading that ends the slice
 * @returns Trimmed markdown section
 */
export function extractMarkdownFromHeading(
    source: string,
    startHeading: string,
    endHeading?: string
): string {
    const start = source.indexOf(startHeading);

    if (start < 0) {
        return "";
    }

    if (!endHeading) {
        return source.slice(start).trim();
    }

    const end = source.indexOf(endHeading, start + startHeading.length);

    if (end < 0) {
        return source.slice(start).trim();
    }

    return source.slice(start, end).trim();
}

/**
 * Converts a subset of GitHub-flavored markdown (headings, lists, fences, inline)
 * into HTML for the docs wiki.
 *
 * @param markdown Source markdown
 * @returns HTML string
 */
export function renderMarkdown(markdown: string): string {
    const fences: string[] = [];
    const withFences = markdown.replace(/```([^\n]*)\n([\s\S]*?)```/g, (_, _lang: string, code: string) => {
        const token = `%%FENCE${fences.length}%%`;
        fences.push(
            `<pre class="overflow-x-auto rounded-lg border border-border bg-secondary/40 p-4 text-sm"><code>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`
        );

        return `\n${token}\n`;
    });

    const lines = withFences.split("\n");
    const html: string[] = [];
    let index = 0;

    const flushParagraph = (buffer: string[]) => {
        const text = buffer.join(" ").trim();

        if (text) {
            html.push(`<p class="text-muted-foreground">${renderInline(text)}</p>`);
        }

        buffer.length = 0;
    };

    while (index < lines.length) {
        const line = lines[index] ?? "";
        const trimmed = line.trim();

        if (!trimmed) {
            index += 1;
            continue;
        }

        const fenceMatch = trimmed.match(/^%%FENCE(\d+)%%$/);

        if (fenceMatch) {
            html.push(fences[Number(fenceMatch[1])] ?? "");
            index += 1;
            continue;
        }

        const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);

        if (headingMatch) {
            const marks = headingMatch[1] ?? "#";
            const level = marks.length;
            const tag = `h${level}`;
            const margin = level === 1 ? "mb-2" : "mt-8 mb-2";
            html.push(`<${tag} class="${margin}">${renderInline(headingMatch[2] ?? "")}</${tag}>`);
            index += 1;
            continue;
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const items: string[] = [];

            while (index < lines.length) {
                const item = (lines[index] ?? "").trim();

                if (!item.startsWith("- ") && !item.startsWith("* ")) {
                    break;
                }

                items.push(`<li class="leading-6">${renderInline(item.slice(2))}</li>`);
                index += 1;
            }

            html.push(`<ul class="list-disc pl-6 flex flex-col gap-2 text-muted-foreground">${items.join("")}</ul>`);
            continue;
        }

        if (/^\d+\.\s+/.test(trimmed)) {
            const items: string[] = [];

            while (index < lines.length) {
                const item = (lines[index] ?? "").trim();
                const ordered = item.match(/^\d+\.\s+(.*)$/);

                if (!ordered) {
                    break;
                }

                items.push(`<li class="leading-6">${renderInline(ordered[1] ?? "")}</li>`);
                index += 1;
            }

            html.push(`<ol class="list-decimal pl-6 flex flex-col gap-4 text-muted-foreground">${items.join("")}</ol>`);
            continue;
        }

        const paragraph: string[] = [trimmed];
        index += 1;

        while (index < lines.length) {
            const next = (lines[index] ?? "").trim();

            if (
                !next
                || next.startsWith("#")
                || next.startsWith("- ")
                || next.startsWith("* ")
                || /^\d+\.\s+/.test(next)
                || next.startsWith("%%FENCE")
            ) {
                break;
            }

            paragraph.push(next);
            index += 1;
        }

        flushParagraph(paragraph);
    }

    return html.join("\n");
}
