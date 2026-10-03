/**
 * The custom elements index module
 * This module is responsible for registering the custom elements of the project.
 */

import { SmallMuted } from "./smallMuted";
import { CUSTOM_ELEMENT_TAGS } from "./tags";

/**
 * Define custom elements.
 */
export function defineCustomElements(): void {
    customElements.define(SmallMuted.elementName, SmallMuted);
}

/**
 * Array of custom element names.
 * @returns Array of custom element names.
 */
export function customElementsArray(): readonly string[] {
    return CUSTOM_ELEMENT_TAGS;
}
