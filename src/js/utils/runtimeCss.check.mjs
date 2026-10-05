/**
 * Check: runtime stylesheet link id and inject/remove.
 * Run: node cht-base/src/js/utils/runtimeCss.check.mjs
 */
import assert from "node:assert/strict";
import {
    loadStylesheet,
    stylesheetLinkId,
    unloadStylesheet,
    waitForDocumentStyles,
    whenStylesheetReady
} from "./runtimeCss.ts";

assert.equal(stylesheetLinkId("demo"), "cht-runtime-css-demo");

const nodes = new Map();

function createFakeDocument() {
    return {
        getElementById(id) {
            return nodes.get(id) ?? null;
        },
        createElement() {
            const el = {
                id: "",
                rel: "",
                href: "",
                remove() {
                    nodes.delete(el.id);
                }
            };

            return el;
        },
        head: {
            appendChild(el) {
                nodes.set(el.id, el);
            }
        }
    };
}

const doc = createFakeDocument();

loadStylesheet("a", "/a.css", doc);
assert.equal(nodes.get("cht-runtime-css-a")?.href, "/a.css");
loadStylesheet("a", "/a2.css", doc);
assert.equal(nodes.size, 1);
assert.equal(nodes.get("cht-runtime-css-a")?.href, "/a2.css");
unloadStylesheet("a", doc);
assert.equal(nodes.size, 0);

await whenStylesheetReady({ href: "", rel: "stylesheet", sheet: {} });

let loadListener;
const pending = {
    href: "",
    rel: "stylesheet",
    addEventListener(type, listener) {
        if (type === "load") {
            loadListener = listener;
        }
    }
};
const pendingWait = whenStylesheetReady(pending);
assert.equal(typeof loadListener, "function");
loadListener();
await pendingWait;

const styleDoc = {
    querySelectorAll() {
        return [{ href: "", rel: "stylesheet", sheet: {} }];
    }
};

await waitForDocumentStyles(styleDoc);

console.log("runtimeCss.check.mjs: ok");
