/**
 * Check: mobile vs tablet viewport flags.
 * Run: node cht-base/src/js/utils/viewportDevice.check.mjs
 */
import assert from "node:assert/strict";
import {
    MOBILE_BREAKPOINT_PX,
    TABLET_BREAKPOINT_PX,
    viewportDeviceFlags
} from "./viewportDevice.ts";

assert.deepEqual(viewportDeviceFlags(MOBILE_BREAKPOINT_PX), {
    isMobile: true,
    isTablet: false
});
assert.deepEqual(viewportDeviceFlags(MOBILE_BREAKPOINT_PX + 1), {
    isMobile: false,
    isTablet: true
});
assert.deepEqual(viewportDeviceFlags(TABLET_BREAKPOINT_PX), {
    isMobile: false,
    isTablet: true
});
assert.deepEqual(viewportDeviceFlags(TABLET_BREAKPOINT_PX + 1), {
    isMobile: false,
    isTablet: false
});

console.log("viewportDevice.check.mjs: ok");
