/**
 * Check: reveal highlight helpers (mask detect, document flag, local culling).
 * Run: node cht-base/src/js/utils/revealHighlight.check.mjs
 */
import assert from "node:assert/strict";
import {
    applyRevealHighlightDocumentFlag,
    isRevealHighlightRuntimeEnabled,
    isOutsideRevealRadius,
    isUniformPositiveBorder,
    parseBorderPx,
    revealRadiusPx,
    REVEAL_SIZE_REM,
    styleCreatesContainingBlock,
    supportsRevealMask
} from "./revealHighlight.ts";

assert.equal(parseBorderPx("1px"), 1);
assert.equal(parseBorderPx("2.5px"), 2.5);
assert.equal(parseBorderPx("0px"), 0);
assert.equal(parseBorderPx(""), 0);
assert.equal(parseBorderPx("medium"), 0);

assert.equal(isUniformPositiveBorder(1, 1, 1, 1), true);
assert.equal(isUniformPositiveBorder(0, 0, 0, 0), false);
assert.equal(isUniformPositiveBorder(1, 1, 1, 0), false);
assert.equal(isUniformPositiveBorder(2, 1, 1, 1), false);

assert.equal(revealRadiusPx(16), 16 * REVEAL_SIZE_REM);
assert.equal(revealRadiusPx(16, 10), 160);

const rect = { left: 100, top: 100, right: 200, bottom: 200 };

assert.equal(isOutsideRevealRadius(150, 150, rect, 50), false);
assert.equal(isOutsideRevealRadius(100, 100, rect, 1), false);
assert.equal(isOutsideRevealRadius(90, 150, rect, 11), false);
assert.equal(isOutsideRevealRadius(80, 150, rect, 10), true);
assert.equal(isOutsideRevealRadius(150, 0, rect, 50), true);

assert.equal(
    styleCreatesContainingBlock({
        transform: "none",
        filter: "none",
        perspective: "none",
        willChange: "auto"
    }),
    false
);
assert.equal(
    styleCreatesContainingBlock({
        transform: "translateX(8px)",
        filter: "none",
        perspective: "none",
        willChange: "auto"
    }),
    true
);
assert.equal(
    styleCreatesContainingBlock({
        transform: "none",
        filter: "blur(2px)",
        perspective: "none",
        willChange: "auto"
    }),
    true
);
assert.equal(
    styleCreatesContainingBlock({
        transform: "none",
        filter: "none",
        perspective: "none",
        willChange: "transform, opacity"
    }),
    true
);

assert.equal(supportsRevealMask(), false);
assert.equal(
    supportsRevealMask(() => false),
    false
);
assert.equal(
    supportsRevealMask(
        (property, value) => property === "mask-image" && value === "linear-gradient(#fff, #fff)"
    ),
    true
);
assert.equal(
    supportsRevealMask((property, value) => property === "mask-composite" && value === "exclude"),
    true
);
assert.equal(
    supportsRevealMask(
        (property, value) => property === "-webkit-mask-composite" && value === "xor"
    ),
    true
);

const root = { dataset: /** @type {Record<string, string | undefined>} */ ({}) };

assert.equal(isRevealHighlightRuntimeEnabled(true, "hodiernus"), true);
assert.equal(isRevealHighlightRuntimeEnabled(true, "simplicia"), false);
assert.equal(isRevealHighlightRuntimeEnabled(false, "hodiernus"), false);
assert.equal(isRevealHighlightRuntimeEnabled(false, "simplicia"), false);

applyRevealHighlightDocumentFlag(false, root);
assert.equal(root.dataset.revealHighlight, "off");
applyRevealHighlightDocumentFlag(true, root);
assert.equal(root.dataset.revealHighlight, undefined);

console.log("revealHighlight.check.mjs: ok");
