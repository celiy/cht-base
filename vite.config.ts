import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { loadConfig, resolveClientDir } from "./configs";

const clientName = process.env.CLIENT;
const clientConfig = loadConfig(clientName);
const clientRoot = clientConfig
    ? path.resolve(__dirname, "..", resolveClientDir(clientConfig), "src")
    : path.resolve(__dirname, "src/devApp");

const siteTitle = clientConfig?.siteTitle ?? "cht-base dev";

const alias: Record<string, string> = {
    "@design": path.resolve(__dirname, "../cht-design-system/src"),
    "@shared": path.resolve(__dirname, "../cht-shared/src"),
    "@client": clientRoot
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias
    },
    define: {
        "import.meta.env.VITE_SITE_TITLE": JSON.stringify(siteTitle)
    }
});
