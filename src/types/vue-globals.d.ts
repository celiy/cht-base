import type { ToastInterface } from "vue-toastification";
import type { ProjectState } from "../project";
import type { AriaAttributes } from "@vue/runtime-dom";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $toast: ToastInterface;
        $project: ProjectState;
    }

    interface GlobalComponents {
        DocsExample: (typeof import("../devApp/components/DocsExample.vue"))["default"];
    }
}

declare module "vue" {
    interface GlobalComponents {
        DocsExample: (typeof import("../devApp/components/DocsExample.vue"))["default"];
    }

    interface HTMLAttributes {
        [key: `data-${string}`]: unknown;
    }
}

declare module "@vue/runtime-core" {
    interface GlobalComponents {
        DocsExample: (typeof import("../devApp/components/DocsExample.vue"))["default"];
    }

    /**
     * `aria-*` attributes are valid on every element and component, but Vue only
     * type-checks components against their declared props.
     */
    interface ComponentCustomProps extends AriaAttributes {}
}

/**
 * `data-*` attributes are valid HTML and are used as styling/behavior hooks.
 */
declare module "@vue/runtime-dom" {
    interface HTMLAttributes {
        [key: `data-${string}`]: unknown;
    }
}
