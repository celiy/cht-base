class Example extends HTMLElement {
    /**
     * The attributes that are observed by the custom element.
     * It notifies the changes in attributeChangedCallback()
     * @example <example size="small">Hello, world!</example>
     */
    static observedAttributes = ["size"];

    constructor() {
        super();
    }

    /**
     * Called each time the element is added to the document.
     * The specification recommends that, as far as possible,
     * developers should implement custom element setup in
     * this callback rather than the constructor.
     */
    connectedCallback() {
        console.log("Custom element added to page.");
        this.innerHTML = `<div>${this.textContent}</div>`;
    }

    /**
     * Called each time the element is removed from the document.
     */
    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    /**
     * When defined, this is called instead of connectedCallback()
     * and disconnectedCallback() each time the element is moved
     * to a different place in the DOM via Element.moveBefore().
     * Use this to avoid running initialization/cleanup code in the
     * connectedCallback() and disconnectedCallback() callbacks when
     * the element is not actually being added to or removed from the DOM.
     */
    connectedMoveCallback() {
        console.log("Custom element moved with moveBefore()");
    }

    /**
     * Called each time the element is moved to a new document.
     */
    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    /**
     * Called when attributes are changed, added, removed, or replaced.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    }

    static get elementName() {
        return "example";
    }
}

/**
 * Define the custom element.
 * Can be used as <example>Hello, world!</example>.
 */
customElements.define(Example.elementName, Example);
