/**
 * The small muted custom element module
 * This module is responsible for the small-muted custom element of the project.
 */

const HOST_CLASSES = ["text-muted-foreground", "text-sm", "font-normal"] as const;

export class SmallMuted extends HTMLElement {
    /**
     * Mounts the element
     * @returns {void}
     */
    connectedCallback(): void {
        this.classList.add(...HOST_CLASSES);
    }

    static get elementName(): string {
        return "small-muted";
    }
}
