/**
 * The viewport device flags module
 * This module is responsible for mobile and tablet viewport classification of the project.
 */

export const MOBILE_BREAKPOINT_PX = 425;
export const TABLET_BREAKPOINT_PX = 768;

export function viewportDeviceFlags(width: number): { isMobile: boolean; isTablet: boolean } {
    const isMobile = width <= MOBILE_BREAKPOINT_PX;

    return {
        isMobile,
        isTablet: !isMobile && width <= TABLET_BREAKPOINT_PX
    };
}
