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
