const ROUNDED_SUFFIXES = [
    "",
    "-t",
    "-b",
    "-l",
    "-r",
    "-ss",
    "-se",
    "-ee",
    "-es",
    "-tl",
    "-tr",
    "-bl",
    "-br"
] as const;

/**
 * @param {string} radius Tailwind radius token (e.g. "xl", "lg", "0.75rem").
 */
export function generateRoundedUtilities(radius: string): string {
    const normalizedRadius = radius.trim() || "xl";

    return ROUNDED_SUFFIXES.map((suffix) => {
        const className = suffix ? `.rounded${suffix}` : ".rounded";
        const utility = suffix ? `rounded${suffix}-${normalizedRadius}` : `rounded-${normalizedRadius}`;

        return `${className} {\n    @apply ${utility};\n}`;
    }).join("\n");
}

/**
 * @param {string} radius
 */
export function generateThemeUtilities(radius: string): string {
    return generateRoundedUtilities(radius);
}
