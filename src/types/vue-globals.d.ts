import type { ToastInterface } from "vue-toastification";
import type { ProjectState } from "../project";

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
}
