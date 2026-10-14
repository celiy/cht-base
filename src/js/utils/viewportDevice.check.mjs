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
    isPhone: true,
    isTablet: false,
    isMobile: true
});
assert.deepEqual(viewportDeviceFlags(MOBILE_BREAKPOINT_PX + 1), {
    isPhone: false,
    isTablet: true,
    isMobile: true
});
assert.deepEqual(viewportDeviceFlags(TABLET_BREAKPOINT_PX), {
    isPhone: false,
    isTablet: true,
    isMobile: true
});
assert.deepEqual(viewportDeviceFlags(TABLET_BREAKPOINT_PX + 1), {
    isPhone: false,
    isTablet: false,
    isMobile: false
});

console.log("viewportDevice.check.mjs: ok");
