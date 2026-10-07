/**
 * Check: client Tailwind plugin path mapping.
 * Run: node cht-base/vite-plugins/clientTailwindPlugin.check.mjs
 */
import assert from "node:assert/strict";
import path from "node:path";

function toPosix(value) {
    return value.split(path.sep).join("/");
}

const fromStyle = path.join("cht-base", "src", "css");
const relative = toPosix(
    path.relative(fromStyle, path.join("cht-client-override-demo", "src", "tailwind.plugin.js"))
);

assert.equal(relative, "../../../cht-client-override-demo/src/tailwind.plugin.js");

const directive = '@plugin "virtual:client-tailwind-plugin";';
const css = `@import "tailwindcss";\n${directive}\n`;
const next = css.replace(directive, `@plugin ${JSON.stringify(relative)};`);

assert.ok(next.includes("tailwind.plugin.js"));
assert.ok(!next.includes("virtual:client-tailwind-plugin"));
assert.ok(!css.replace(directive, "").includes("virtual:client-tailwind-plugin"));

console.log("clientTailwindPlugin.check.mjs: ok");
