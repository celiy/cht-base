import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";
import App from "@client/App.vue";
import routes from "@client/routes";
import tooltip from "./directives/tooltip";
import { projectPlugin, projectActions } from "./project";

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.use(Toast, {
    position: "bottom-center",
    timeout: 4000
});
app.config.globalProperties.$toast = useToast();

app.directive("tooltip", tooltip);

app.use(projectPlugin, { router });

const title = import.meta.env.VITE_SITE_TITLE;

projectActions.setSiteTitle(title);

if (typeof document !== "undefined") {
    document.title = title;
}

app.mount("#app");
