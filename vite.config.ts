import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { loadConfig, resolveClientDir } from "./configs";
import { docsExampleSourcePlugin } from "./vite-plugins/docsExampleSource";
import { clientThemePlugin } from "./vite-plugins/clientTheme";

const clientName = process.env.CLIENT;
const clientConfig = loadConfig(clientName);
const clientRoot = clientConfig
    ? path.resolve(__dirname, "..", resolveClientDir(clientConfig), "src")
    : path.resolve(__dirname, "src/devApp");

const siteTitle = clientConfig?.siteTitle ?? "cht-base dev";

const alias: Record<string, string> = {
    "@": path.resolve(__dirname, "src"),
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
    resolve: {
        alias
    },
    define: {
        "import.meta.env.VITE_SITE_TITLE": JSON.stringify(siteTitle)
    },
    server: {
        fs: {
            allow: [path.resolve(__dirname, "..")]
        }
    }
});
