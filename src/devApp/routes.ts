import type { RouteRecordRaw } from "vue-router";

import DevDesign from "../views/DevDesign.vue";
import DevForm from "../views/DevForm.vue";
import Index from "../views/index.vue";
import DevLayout from "./DevLayout.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DevLayout,
        children: [
            { path: "", name: "index", component: Index },
            { path: "devDesign", name: "dev-design", component: DevDesign },
            { path: "devForm", name: "dev-form", component: DevForm }
        ]
    }
];

export default routes;
