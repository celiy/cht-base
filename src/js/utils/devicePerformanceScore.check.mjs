/**
 * Check: device performance score finalization.
 * Run: node cht-base/src/js/utils/devicePerformanceScore.check.mjs
 */
import assert from "node:assert/strict";
import { finalizeDevicePerformanceScore } from "./devicePerformanceScore.ts";

const mid = finalizeDevicePerformanceScore(1_000_000, 100, 8, 8);

assert.ok(mid >= 1, "score is positive");
assert.equal(typeof mid, "number");
assert.equal(Math.round(mid), mid, "score is integer");

const weak = finalizeDevicePerformanceScore(10_000, 100, 2, 2);
const strong = finalizeDevicePerformanceScore(1_000_000, 100, 16, 8);

assert.ok(strong > weak, "faster benchmark yields higher score");

console.log("devicePerformanceScore.check.mjs: ok");
