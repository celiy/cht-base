/**
 * The docs component props module
 * This module is responsible for turning Vue component props into docs table rows of the project.
 */

export type DocsPropRow = {
    name: string;
    type: string;
    values: string;
    default: string;
    required: string;
};

export type DocsComponentPropsTable = {
    name: string;
    rows: DocsPropRow[];
};

const SKIP_SLUGS = new Set(["tooltip", "colors", "typography"]);

const SLUG_COMPONENT_NAMES: Record<string, string[]> = {
    "custom-tooltip": ["Tooltip"],
    checkbox: ["Checkbox", "CheckboxSwitch"],
    charts: ["BarChart", "WaveChart"],
    drawer: ["Modal"]
};

/**
 * Converts PascalCase / camelCase to kebab-case.
 *
 * @param value Identifier
 * @returns Kebab-case slug
 */
export function toKebabName(value: string): string {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

/**
 * Picks registered component names that belong to a docs slug.
 *
 * @param slug Docs route slug
 * @param registeredNames Component `name` values
 * @returns Matching names, possibly empty
 */
export function resolveDocsComponentNames(slug: string, registeredNames: string[]): string[] {
    if (!slug || SKIP_SLUGS.has(slug)) {
        return [];
    }

    const byName = new Map(registeredNames.map((name) => [name, name]));
    const aliased = SLUG_COMPONENT_NAMES[slug];

    if (aliased) {
        return aliased.filter((name) => byName.has(name));
    }

    const byKebab = new Map(registeredNames.map((name) => [toKebabName(name), name]));
    const exact = byKebab.get(slug);

    if (exact) {
        return [exact];
    }

    const compactSlug = slug.replace(/-/g, "");
    const compactHit = registeredNames.find((name) => {
        return toKebabName(name).replace(/-/g, "") === compactSlug;
    });

    if (compactHit) {
        return [compactHit];
    }

    if (slug.endsWith("s") && !slug.endsWith("ss")) {
        const singular = byKebab.get(slug.slice(0, -1));

        if (singular) {
            return [singular];
        }
    }

    return [];
}

/**
 * Reads `export type Name = "a" | "b"` (and non-export) string unions from source.
 *
 * @param source TypeScript or Vue SFC text
 * @returns Type name → literal members
 */
export function parseNamedStringUnions(source: string): Record<string, string[]> {
    const out: Record<string, string[]> = {};
    const re = /(?:export\s+)?type\s+(\w+)\s*=\s*([^;]+);/g;
    let match: RegExpExecArray | null = re.exec(source);

    while (match) {
        const name = match[1];
        const members = parseStringUnionMembers(match[2] ?? "");

        if (name && members) {
            out[name] = members;
        }

        match = re.exec(source);
    }

    return out;
}

/**
 * Parses a string-literal union (`"a" | "b"`).
 *
 * @param typeExpr TypeScript type text
 * @returns Members, or null if not a pure string union
 */
export function parseStringUnionMembers(typeExpr: string): string[] | null {
    const parts = typeExpr
        .split("|")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

    if (parts.length === 0) {
        return null;
    }

    const values: string[] = [];

    for (const part of parts) {
        const quoted = part.match(/^["']([^"']*)["']$/);

        if (!quoted) {
            return null;
        }

        values.push(quoted[1] ?? "");
    }

    return values;
}

/**
 * Builds docs table rows from a Vue component options object.
 *
 * @param component Component with a `props` option
 * @param source Optional SFC/TS source for PropType unions
 * @param namedUnions Extra named unions (`ButtonVariants`, …)
 * @returns Rows for the Props table
 */
export function propsTableRows(
    component: { props?: unknown } | null | undefined,
    source?: string,
    namedUnions: Record<string, string[]> = {}
): DocsPropRow[] {
    const raw = component?.props;

    if (!raw) {
        return [];
    }

    if (Array.isArray(raw)) {
        return raw
            .filter((name): name is string => typeof name === "string" && name.length > 0)
            .map((name) => emptyPropRow(name));
    }

    if (typeof raw !== "object") {
        return [];
    }

    const localUnions = {
        ...namedUnions,
        ...(source ? parseNamedStringUnions(source) : {})
    };

    return Object.entries(raw as Record<string, unknown>).map(([name, def]) => {
        const spec = normalizeProp(def);
        const values = source
            ? formatAcceptedValues(propTypeArgFromSource(source, name), localUnions)
            : "—";

        return {
            name,
            type: formatPropType(spec.type),
            values,
            default: spec.hasDefault ? formatPropDefault(spec.default, spec.type) : "—",
            required: spec.required ? "sim" : "não"
        };
    });
}

/**
 * Builds a dash-filled prop row.
 *
 * @param name Prop name
 * @returns Empty docs row
 */
function emptyPropRow(name: string): DocsPropRow {
    return {
        name,
        type: "—",
        values: "—",
        default: "—",
        required: "não"
    };
}

type NormalizedProp = {
    type: unknown;
    default: unknown;
    required: boolean;
    hasDefault: boolean;
};

/**
 * Normalizes Vue prop shorthand (`String`) and object form.
 *
 * @param def Raw prop definition
 * @returns Normalized fields
 */
function normalizeProp(def: unknown): NormalizedProp {
    if (def == null || def === true) {
        return { type: undefined, default: undefined, required: false, hasDefault: false };
    }

    if (typeof def === "function" || Array.isArray(def)) {
        return { type: def, default: undefined, required: false, hasDefault: false };
    }

    if (typeof def === "object") {
        const rec = def as { type?: unknown; default?: unknown; required?: boolean };

        return {
            type: rec.type,
            default: rec.default,
            required: Boolean(rec.required),
            hasDefault: Object.prototype.hasOwnProperty.call(rec, "default")
        };
    }

    return { type: undefined, default: undefined, required: false, hasDefault: false };
}

/**
 * Formats a Vue prop `type` for the docs table.
 *
 * @param type Constructor or list of constructors
 * @returns Display type
 */
function formatPropType(type: unknown): string {
    if (type == null) {
        return "—";
    }

    if (Array.isArray(type)) {
        const parts = type
            .map((item) => constructorName(item))
            .filter((name) => name !== "—");

        return parts.length > 0 ? parts.join(" | ") : "—";
    }

    return constructorName(type);
}

/**
 * Reads a constructor display name.
 *
 * @param value Maybe a constructor
 * @returns Name or dash
 */
function constructorName(value: unknown): string {
    if (typeof value !== "function") {
        return "—";
    }

    const name = (value as { name?: string }).name;

    return name && name.length > 0 ? name : "—";
}

/**
 * Formats a Vue prop default for the docs table.
 *
 * @param value Default option
 * @param type Prop type (factories are called for Object/Array)
 * @returns Display default
 */
function formatPropDefault(value: unknown, type: unknown): string {
    if (typeof value === "function" && !typeIncludesFunction(type)) {
        try {
            return formatPropValue(value());
        } catch {
            return "—";
        }
    }

    return formatPropValue(value);
}

/**
 * Checks whether Function is an allowed prop type.
 *
 * @param type Prop type
 * @returns True if Function is listed
 */
function typeIncludesFunction(type: unknown): boolean {
    if (type === Function) {
        return true;
    }

    return Array.isArray(type) && type.includes(Function);
}

/**
 * Stringifies a resolved default value.
 *
 * @param value Runtime default
 * @returns Display value
 */
function formatPropValue(value: unknown): string {
    if (value === undefined) {
        return "—";
    }

    if (typeof value === "function") {
        return "Function";
    }

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

/**
 * Turns a PropType argument into a docs Values cell.
 *
 * @param typeExpr Inner `PropType<…>` text
 * @param namedUnions Named string unions
 * @returns Display values
 */
export function formatAcceptedValues(
    typeExpr: string | null,
    namedUnions: Record<string, string[]>
): string {
    if (!typeExpr) {
        return "—";
    }

    const literals = parseStringUnionMembers(typeExpr);

    if (literals) {
        return formatLiteralUnion(literals);
    }

    const ident = typeExpr.trim();

    if (/^\w+$/.test(ident)) {
        const named = namedUnions[ident];

        if (named) {
            return formatLiteralUnion(named);
        }
    }

    return "—";
}

/**
 * Formats string-union members for the table.
 *
 * @param members Literal values
 * @returns Quoted union
 */
function formatLiteralUnion(members: string[]): string {
    return members.map((member) => JSON.stringify(member)).join(" | ");
}

/**
 * Reads `PropType<…>` from the object literal of one prop.
 *
 * ponytail: brace match ignores `{` inside strings; prop blocks are plain objects.
 *
 * @param source SFC/TS text
 * @param propName Prop key
 * @returns Inner PropType text
 */
export function propTypeArgFromSource(source: string, propName: string): string | null {
    const escaped = propName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const marker = new RegExp(`\\b${escaped}\\s*:\\s*\\{`);
    const hit = marker.exec(source);

    if (!hit) {
        return null;
    }

    const braceAt = (hit.index ?? 0) + hit[0].length - 1;
    const block = sliceBalancedBrace(source, braceAt);

    if (!block) {
        return null;
    }

    return extractPropTypeArg(block);
}

/**
 * Slices `{ … }` from `start` (the opening brace).
 *
 * @param source Full text
 * @param start Index of `{`
 * @returns Block including braces
 */
function sliceBalancedBrace(source: string, start: number): string | null {
    if (source[start] !== "{") {
        return null;
    }

    let depth = 0;

    for (let i = start; i < source.length; i += 1) {
        const ch = source[i];

        if (ch === "{") {
            depth += 1;
            continue;
        }

        if (ch === "}") {
            depth -= 1;

            if (depth === 0) {
                return source.slice(start, i + 1);
            }
        }
    }

    return null;
}

/**
 * Reads the first `PropType<…>` argument in a prop block.
 *
 * @param block `{ type: String as PropType<…>, … }`
 * @returns Inner type text
 */
function extractPropTypeArg(block: string): string | null {
    const idx = block.search(/PropType\s*</);

    if (idx < 0) {
        return null;
    }

    const start = block.indexOf("<", idx) + 1;
    let depth = 1;

    for (let i = start; i < block.length; i += 1) {
        const ch = block[i];

        if (ch === "<") {
            depth += 1;
            continue;
        }

        if (ch === ">") {
            depth -= 1;

            if (depth === 0) {
                return block.slice(start, i).trim();
            }
        }
    }

    return null;
}
