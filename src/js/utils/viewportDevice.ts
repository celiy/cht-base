/**
 * The viewport device flags module
 * This module is responsible for mobile and tablet viewport classification of the project.
 */

export const MOBILE_BREAKPOINT_PX = 425;
export const TABLET_BREAKPOINT_PX = 768;

export function viewportDeviceFlags(width: number): {
    isPhone: boolean;
    isTablet: boolean;
    isMobile: boolean;
} {
    const isPhone = width <= MOBILE_BREAKPOINT_PX;
    const isTablet = !isPhone && width <= TABLET_BREAKPOINT_PX;

    return {
        isPhone,
        isTablet,
        isMobile: isPhone || isTablet
    };
}
