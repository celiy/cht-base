export type ThemeName = "light" | "dark";

export type ThemeColorMap = Record<string, string>;

export interface ThemeVariantConfig {
    colors?: ThemeColorMap;
}

export interface ClientThemeConfig {
    default?: ThemeName;
    radius?: string;
    themes?: Partial<Record<ThemeName, ThemeVariantConfig>>;
}

export interface ResolvedThemeConfig {
    defaultTheme: ThemeName;
    radius: string;
    availableThemes: ThemeName[];
    themes: Record<ThemeName, ThemeColorMap>;
}
