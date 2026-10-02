/**
 * The theme types
 * This module is responsible for the types of the theme.
 */

/**
 * The name of the theme
 */
export type ThemeName = "light" | "dark";

/**
 * The color map of the theme
 */
export type ThemeColorMap = Record<string, string>;

/**
 * The variant config of the theme
 */
export interface ThemeVariantConfig {
    colors?: ThemeColorMap;
}

/**
 * The client theme config
 */
export interface ClientThemeConfig {
    default?: ThemeName;
    radius?: string;
    themes?: Partial<Record<ThemeName, ThemeVariantConfig>>;
}

/**
 * The resolved theme config
 */
export interface ResolvedThemeConfig {
    defaultTheme: ThemeName;
    radius: string;
    availableThemes: ThemeName[];
    themes: Record<ThemeName, ThemeColorMap>;
}
