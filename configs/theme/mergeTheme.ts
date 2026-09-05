import type { ClientConfig } from "../types";
import { AVAILABLE_THEMES, DEFAULT_RADIUS, SYSTEM_THEME_DEFAULTS } from "./defaults";
import type {
    ClientThemeConfig,
    ResolvedThemeConfig,
    ThemeColorMap,
    ThemeName,
    ThemeVariantConfig
} from "./types";

const STANDARD_COLOR_KEYS = new Set(
    Object.keys(SYSTEM_THEME_DEFAULTS.dark).map((key) => toCssColorVar(key))
);

/**
 * @param {string} key
 */
export function toCssColorVar(key: string): string {
    const normalized = key.startsWith("--color-") ? key.slice("--color-".length) : key;

    return `--color-${normalized}`;
}

/**
 * @param {ThemeColorMap | undefined} colors
 */
export function normalizeColorKeys(colors: ThemeColorMap | undefined): ThemeColorMap {
    if (!colors) {
        return {};
    }

    const normalized: ThemeColorMap = {};

    for (const [key, value] of Object.entries(colors)) {
        const cssKey = key.startsWith("--color-") ? key : toCssColorVar(key);

        normalized[cssKey] = value;
    }

    return normalized;
}

/**
 * @param {ThemeColorMap} system
 * @param {ThemeColorMap | undefined} clientPartial
 */
export function mergeThemeColors(
    system: ThemeColorMap,
    clientPartial: ThemeColorMap | undefined
): ThemeColorMap {
    const systemVars = normalizeColorKeys(system);
    const clientVars = normalizeColorKeys(clientPartial);

    return {
        ...systemVars,
        ...clientVars
    };
}

/**
 * @param {ThemeName} themeName
 * @param {ThemeVariantConfig | undefined} variant
 */
function resolveThemeVariant(themeName: ThemeName, variant: ThemeVariantConfig | undefined): ThemeColorMap {
    const system = SYSTEM_THEME_DEFAULTS[themeName];
    const systemVars = normalizeColorKeys(system);

    return mergeThemeColors(systemVars, variant?.colors);
}

/**
 * @param {ClientThemeConfig | undefined} themeConfig
 */
export function resolveClientThemeConfig(themeConfig: ClientThemeConfig | undefined): ResolvedThemeConfig {
    const defaultTheme = themeConfig?.default === "light" ? "light" : "dark";
    const radius = themeConfig?.radius?.trim() || DEFAULT_RADIUS;

    const themes = {
        dark: resolveThemeVariant("dark", themeConfig?.themes?.dark),
        light: resolveThemeVariant("light", themeConfig?.themes?.light)
    } satisfies Record<ThemeName, ThemeColorMap>;

    return {
        defaultTheme,
        radius,
        availableThemes: [...AVAILABLE_THEMES],
        themes
    };
}

/**
 * @param {ClientConfig | null} clientConfig
 * @param {ClientThemeConfig | undefined} devThemeConfig
 */
export function resolveThemeFromSources(
    clientConfig: ClientConfig | null,
    devThemeConfig?: ClientThemeConfig
): ResolvedThemeConfig {
    if (clientConfig?.theme) {
        return resolveClientThemeConfig(clientConfig.theme);
    }

    if (devThemeConfig) {
        return resolveClientThemeConfig(devThemeConfig);
    }

    return resolveClientThemeConfig(undefined);
}

/**
 * @param {Record<ThemeName, ThemeColorMap>} themes
 */
export function collectExtraColorVars(themes: Record<ThemeName, ThemeColorMap>): string[] {
    const extras = new Set<string>();

    for (const themeColors of Object.values(themes)) {
        for (const cssVar of Object.keys(themeColors)) {
            if (!STANDARD_COLOR_KEYS.has(cssVar)) {
                extras.add(cssVar);
            }
        }
    }

    return [...extras].sort();
}
