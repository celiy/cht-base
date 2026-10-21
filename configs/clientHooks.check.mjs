/**
 * Check: client extension points (`<client>/vite.config.*` and `<client>/electron/*.ts`).
 * Run: node cht-base/configs/clientHooks.check.mjs
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadClientViteConfig } from "./clientVite.ts";

const BASE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cht-client-hooks-"));
const env = { command: "build", mode: "production" };

try {
    assert.equal(await loadClientViteConfig(tmp, env), null);

    fs.writeFileSync(
        path.join(tmp, "vite.config.mjs"),
        "export default ({ command }) => ({ define: { __CMD__: JSON.stringify(command) } });\n"
    );

    const viteConfig = await loadClientViteConfig(tmp, env);

    assert.deepEqual(viteConfig?.define, { __CMD__: "\"build\"" });

    /**
     * Compiles the Electron entries for a client folder.
     * @param {string} clientDir The client folder, or "" for none
     * @returns {{ main: string; preload: string }} The bundles
     */
    function compile(clientDir) {
        const result = spawnSync(process.execPath, ["electron/build.mjs"], {
            cwd: BASE_DIR,
            env: { ...process.env, CHT_CLIENT_DIR: clientDir },
            encoding: "utf8"
        });

        assert.equal(result.status, 0, result.stderr);

        return {
            main: fs.readFileSync(path.join(BASE_DIR, "electron-dist", "main.cjs"), "utf8"),
            preload: fs.readFileSync(path.join(BASE_DIR, "electron-dist", "preload.cjs"), "utf8")
        };
    }

    fs.mkdirSync(path.join(tmp, "electron"));
    fs.writeFileSync(path.join(tmp, "electron", "main.ts"), "export const onReady = () => \"__MAIN_HOOK__\";\n");
    fs.writeFileSync(path.join(tmp, "electron", "preload.ts"), "console.log(\"__PRELOAD_HOOK__\");\n");

    const withHooks = compile(tmp);

    assert.ok(withHooks.main.includes("__MAIN_HOOK__"));
    assert.ok(withHooks.preload.includes("__PRELOAD_HOOK__"));

    const withoutHooks = compile("");

    assert.ok(!withoutHooks.main.includes("__MAIN_HOOK__"));
    assert.ok(!withoutHooks.preload.includes("__PRELOAD_HOOK__"));

    console.log("clientHooks.check: ok");
} finally {
    fs.rmSync(tmp, { recursive: true, force: true });
}
