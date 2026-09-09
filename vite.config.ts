import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { loadConfig, resolveClientDir, loadDevAppVersion } from "./configs";
import { docsExampleSourcePlugin } from "./vite-plugins/docsExampleSource";
import { clientThemePlugin } from "./vite-plugins/clientTheme";

const clientName = process.env.CLIENT;
const clientConfig = loadConfig(clientName);
const devVersionInfo = loadDevAppVersion();

const clientRoot = clientConfig
    ? path.resolve(__dirname, "..", resolveClientDir(clientConfig), "src")
    : path.resolve(__dirname, "src/devApp");

const siteTitle = clientConfig?.siteTitle ?? "cht-base dev";
const appVersion = clientConfig?.version ?? devVersionInfo.version ?? "1.0.0";
const versionCheckUrl = clientConfig?.versionCheckUrl ?? devVersionInfo.versionCheckUrl ?? "";
const apiBaseUrl = clientConfig?.apiBaseUrl ?? "http://127.0.0.1:8000";
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

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        clientThemePlugin(),
        docsExampleSourcePlugin(),
        vue(),
        tailwindcss()
    ],
    base: electronBuild ? "./" : "/",
    resolve: {
        alias
    },
    define: {
        "import.meta.env.VITE_SITE_TITLE": JSON.stringify(siteTitle),
        "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersion),
        "import.meta.env.VITE_VERSION_CHECK_URL": JSON.stringify(versionCheckUrl),
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
        "import.meta.env.VITE_HAS_BACKEND": JSON.stringify(hasBackend ? "true" : "false")
    },
    server: {
        fs: {
            allow: [path.resolve(__dirname, "..")]
        }
    }
});
