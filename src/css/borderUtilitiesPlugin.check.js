/**
 * Self-check: colored borders get width; sized + slash + directional forms resolve.
 * Run: node cht-base/src/css/borderUtilitiesPlugin.check.js
 */
import { compile } from "tailwindcss";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const twRoot = path.dirname(fileURLToPath(import.meta.resolve("tailwindcss/package.json")));

async function loadStylesheet(id, base) {
    if (id === "tailwindcss") {
        return {
            path: path.join(twRoot, "index.css"),
            base: twRoot,
            content: fs.readFileSync(path.join(twRoot, "index.css"), "utf8")
        };
    }

    const resolved = path.resolve(base, id);

    return {
        path: resolved,
        base: path.dirname(resolved),
        content: fs.readFileSync(resolved, "utf8")
    };
}

async function loadModule(id, base) {
    const resolved = path.resolve(base, id.replace(/^\.\//, ""));
    const mod = await import(pathToFileURL(resolved).href);

    return {
        path: resolved,
        base: path.dirname(resolved),
        module: mod.default ?? mod
    };
}

function assert(cond, msg) {
    if (!cond) {
        throw new Error(msg);
    }
}

const css = `@import "tailwindcss";
@plugin "./borderUtilitiesPlugin.js";
@theme {
  --color-primary: red;
  --color-muted: gray;
  --color-success: green;
}
`;

const result = await compile(css, {
    loadStylesheet,
    loadModule,
    base: __dirname
});

const out = result.build([
    "border-primary",
    "border-primary/50",
    "border-1-primary",
    "border-2-red-200",
    "border-2-primary/40",
    "border-2-success/30",
    "border-[4px]/muted",
    "border-2",
    "border-b-primary",
    "border-b-2-red-500",
    "border-b-2-red-500/30",
    "border-b-2-transparent",
    "border-t-1-muted",
    "border-x-2/primary",
    "border-b-[4px]/muted",
    "border-b-2"
]);

assert(/\.border-primary\s*\{[^}]*border-width:\s*1px/.test(out), "border-primary width");
assert(/\.border-primary\s*\{[^}]*border-color:/.test(out), "border-primary color");
assert(
    /\.border-primary\\\/50\s*\{[^}]*border-width:\s*1px/.test(out),
    "border-primary/50 width"
);
assert(/\.border-1-primary\s*\{[^}]*border-width:\s*1px/.test(out), "border-1-primary width");
assert(/\.border-2-red-200\s*\{[^}]*border-width:\s*2px/.test(out), "border-2-red-200 width");
assert(
    /\.border-2-primary\\\/40\s*\{[^}]*border-width:\s*2px/.test(out),
    "border-2-primary/40 width"
);
assert(
    /\.border-2-primary\\\/40\s*\{[^}]*color-mix\(in oklab,\s*red 40%,\s*transparent\)/.test(out),
    "border-2-primary/40 opacity"
);
assert(
    /\.border-2-success\\\/30\s*\{[^}]*30%/.test(out),
    "border-2-success/30 opacity"
);
assert(
    /\.border-\\\[4px\\\]\\\/muted\s*\{[^}]*border-width:\s*4px/.test(out),
    "border-[4px]/muted width"
);
assert(/\.border-2\s*\{[^}]*border-width:\s*2px/.test(out), "border-2 still width-only");

assert(
    /\.border-b-primary\s*\{[^}]*border-bottom-width:\s*1px/.test(out),
    "border-b-primary width"
);
assert(
    /\.border-b-primary\s*\{[^}]*border-bottom-color:/.test(out),
    "border-b-primary color"
);
assert(
    /\.border-b-2-red-500\s*\{[^}]*border-bottom-width:\s*2px/.test(out),
    "border-b-2-red-500 width"
);
assert(
    /\.border-b-2-red-500\s*\{[^}]*border-bottom-color:/.test(out),
    "border-b-2-red-500 color"
);
assert(
    /\.border-b-2-red-500\\\/30\s*\{[^}]*border-bottom-width:\s*2px/.test(out)
        && /\.border-b-2-red-500\\\/30\s*\{[^}]*30%/.test(out),
    "border-b-2-red-500/30 opacity"
);
assert(
    /\.border-b-2-transparent\s*\{[^}]*border-bottom-width:\s*2px/.test(out)
        && /\.border-b-2-transparent\s*\{[^}]*border-bottom-color:\s*transparent/.test(out),
    "border-b-2-transparent"
);
assert(
    /\.border-t-1-muted\s*\{[^}]*border-top-width:\s*1px/.test(out),
    "border-t-1-muted width"
);
assert(
    /\.border-x-2\\\/primary\s*\{[^}]*border-left-width:\s*2px/.test(out)
        && /\.border-x-2\\\/primary\s*\{[^}]*border-right-width:\s*2px/.test(out),
    "border-x-2/primary widths"
);
assert(
    /\.border-b-\\\[4px\\\]\\\/muted\s*\{[^}]*border-bottom-width:\s*4px/.test(out),
    "border-b-[4px]/muted width"
);
assert(
    /\.border-b-2\s*\{[^}]*border-bottom-width:\s*2px/.test(out),
    "border-b-2 still width-only"
);

console.log("borderUtilitiesPlugin.check: ok");
