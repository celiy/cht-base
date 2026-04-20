import type { ToastInterface } from "vue-toastification";
import type { ProjectState } from "../project";

declare module "vue" {
    interface ComponentCustomProperties {
        $toast: ToastInterface;
        $project: ProjectState;
    }
}
