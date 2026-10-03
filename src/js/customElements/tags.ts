/**
 * The custom element tags module
 * This module is responsible for the custom element tag names of the project.
 */

export const CUSTOM_ELEMENT_TAGS = ["small-muted"] as const;

export type CustomElementTag = (typeof CUSTOM_ELEMENT_TAGS)[number];
