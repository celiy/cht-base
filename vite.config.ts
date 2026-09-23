import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { loadConfig, resolveClientDir, loadDevAppVersion } from "./configs";
import { docsExampleSourcePlugin } from "./vite-plugins/docsExampleSource";
import { clientThemePlugin } from "./vite-plugins/clientTheme";
import { clientSourcePlugin } from "./vite-plugins/clientSource";
import { clientFaviconPlugin } from "./vite-plugins/clientFavicon";
import { clientOverridePlugin } from "./vite-plugins/clientOverride";
import {
    DEFAULT_API_PORT_SCAN_LIMIT,
    pickApiBaseUrl,
    resolveApiTarget
} from "../cht-shared/src/net/portScan";

const isDevAppServer = process.env.CHT_DEVAPP === "1";
const clientName = isDevAppServer ? undefined : process.env.CLIENT;
const clientConfig = loadConfig(clientName);
const devVersionInfo = loadDevAppVersion();
const devappUrl = process.env.CHT_DEVAPP_URL || "";

function isDevToolsEnabled(): boolean {
    if (!devappUrl) {
        return false;
    }

    const flag = clientConfig?.devTools;

    if (flag === false) {
        return false;
    }

    if (flag && typeof flag === "object" && flag.enabled === false) {
        return false;
    }

    return true;
}

const clientRoot = clientConfig
    ? path.resolve(__dirname, "..", resolveClientDir(clientConfig), "src")
    : path.resolve(__dirname, "src/devApp");

const siteTitle = clientConfig?.siteTitle ?? "CHT-Base";
const appVersion = clientConfig?.version ?? devVersionInfo.version ?? "1.0.0";
const versionCheckUrl = clientConfig?.versionCheckUrl ?? devVersionInfo.versionCheckUrl ?? "";
const hasBackend = Boolean(clientConfig?.backend);
const electronBuild = process.env.ELECTRON_BUILD === "1";

const alias: Record<string, string> = {
    "@": path.resolve(__dirname, "src"),
    "@base": path.resolve(__dirname, "src"),
    "@design": path.resolve(__dirname, "../cht-design-system/src"),
    "@shared": path.resolve(__dirname, "../cht-shared/src"),
    "@client": clientRoot,
    "@repo": path.resolve(__dirname, "..")
};

/**
 * Every package in the workspace installs its own `vue`/`vue-router` copy for
 * type-checking. Without dedupe, a component living in `cht-client-*` or
 * `cht-design-system` imports a different instance than the one `cht-base`
 * boots, so `useRouter()` injects the wrong key and returns `undefined`.
 * Dev mode hides this because `optimizeDeps` pre-bundles a single copy.
 */
const dedupe = ["vue", "vue-router"];

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    const apiTarget = resolveApiTarget({
        electronBuild,
        command,
        override: process.env.CHT_API_TARGET
    });
    const apiBaseUrl = pickApiBaseUrl(clientConfig, apiTarget);
    const apiPortScanLimit = clientConfig?.apiPortScanLimit ?? DEFAULT_API_PORT_SCAN_LIMIT;

    return {
        plugins: [
            clientSourcePlugin(),
            clientThemePlugin(),
            clientFaviconPlugin(),
            docsExampleSourcePlugin(),
            vue(),
            tailwindcss(),
            clientOverridePlugin()
        ],
        base: electronBuild ? "./" : "/",
        resolve: {
            alias,
            dedupe
        },
        define: {
            "import.meta.env.VITE_SITE_TITLE": JSON.stringify(siteTitle),
            "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersion),
            "import.meta.env.VITE_VERSION_CHECK_URL": JSON.stringify(versionCheckUrl),
            "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
            "import.meta.env.VITE_API_TARGET": JSON.stringify(apiTarget),
            "import.meta.env.VITE_API_PORT_SCAN_LIMIT": JSON.stringify(String(apiPortScanLimit)),
            "import.meta.env.VITE_HAS_BACKEND": JSON.stringify(hasBackend ? "true" : "false"),
            "import.meta.env.VITE_DEVAPP_URL": JSON.stringify(devappUrl),
            "import.meta.env.VITE_DEV_TOOLS": JSON.stringify(isDevToolsEnabled() ? "true" : "false")
        },
        cacheDir: isDevAppServer
            ? path.resolve(__dirname, "node_modules/.vite-devapp")
            : path.resolve(__dirname, "node_modules/.vite"),
        server: {
            fs: {
                allow: [path.resolve(__dirname, "..")]
            }
        }
    };
});
