import type { ThemeColorMap, ThemeName } from "./types";

const primaryColor = {
    primary: "oklch(0.48 0.25 265.5)",
    "primary-foreground": "oklch(0.97 0.014 254.604)",
}

const darkImportantColors = {
    destructive: "oklch(0.5959 0.2294 20.6)",
    "destructive-foreground": "oklch(0.985 0 0)",
    success: "oklch(0.7206 0.2301 144.46)",
    "success-foreground": "oklch(0.985 0 0)",
    warning: "oklch(0.7955 0.158 86.84)",
    "warning-foreground": "oklch(0.145 0 0)",
    info: "var(--color-sky-500)",
    "info-foreground": "oklch(0.985 0 0)"
}

const lightImportantColors = {
    destructive: "oklch(0.5959 0.2294 20.6)",
    "destructive-foreground": "oklch(0.985 0 0)",
    success: "oklch(0.6206 0.2301 144.46)",
    "success-foreground": "oklch(0.985 0 0)",
    warning: "oklch(0.7955 0.158 86.84)",
    "warning-foreground": "oklch(0.145 0 0)",
    info: "var(--color-sky-600)",
    "info-foreground": "oklch(0.985 0 0)"
}

/** System default dark palette (matches legacy style.css). */
export const SYSTEM_DARK_COLORS: ThemeColorMap = {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.95 0 0)",
    shadow: "rgba(0, 0, 0, 0.25)",
    card: "oklch(0.205 0 0)",
    "card-foreground": "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    "popover-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.274 0.006 286.033)",
    "secondary-foreground": "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    "muted-foreground": "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    "accent-foreground": "oklch(0.985 0 0)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
    "chart-1": "oklch(0.809 0.105 251.813)",
    "chart-2": "oklch(0.623 0.214 259.815)",
    "chart-3": "oklch(0.546 0.245 262.881)",
    "chart-4": "oklch(0.488 0.243 264.376)",
    "chart-5": "oklch(0.424 0.199 265.638)",
    sidebar: "oklch(0.205 0 0)",
    "sidebar-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.269 0 0)",
    "sidebar-accent-foreground": "oklch(0.985 0 0)",
    "sidebar-border": "oklch(1 0 0 / 10%)",
    "sidebar-ring": "oklch(0.556 0 0)",
    ...darkImportantColors,
    ...primaryColor
};

/** System default light palette. */
export const SYSTEM_LIGHT_COLORS: ThemeColorMap = {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    shadow: "rgba(0, 0, 0, 0.05)",
    card: "oklch(1 0 0)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    secondary: "oklch(0.967 0.001 286.375)",
    "secondary-foreground": "oklch(0.21 0.006 285.885)",
    muted: "oklch(0.97 0 0)",
    "muted-foreground": "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    "accent-foreground": "oklch(0.205 0 0)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    "chart-1": "oklch(0.809 0.105 251.813)",
    "chart-2": "oklch(0.623 0.214 259.815)",
    "chart-3": "oklch(0.546 0.245 262.881)",
    "chart-4": "oklch(0.488 0.243 264.376)",
    "chart-5": "oklch(0.424 0.199 265.638)",
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.708 0 0)",
    ...lightImportantColors,
    ...primaryColor
};

export const SYSTEM_THEME_DEFAULTS: Record<ThemeName, ThemeColorMap> = {
    dark: SYSTEM_DARK_COLORS,
    light: SYSTEM_LIGHT_COLORS
};

export const DEFAULT_RADIUS = "xl";

export const AVAILABLE_THEMES: ThemeName[] = ["dark", "light"];
