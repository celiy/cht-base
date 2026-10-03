import { createApp } from "vue";
import { createWebHashHistory, createWebHistory, createRouter } from "vue-router";
import { toastPlugin } from "@design/toast/plugin";
import { designSystemPlugin } from "@design/plugin";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";

/*
 * @client Dynamically imports the App.vue and routes from the client directory
 * when it's being built for the client.
 */
import App from "@client/App.vue";
import routes from "@client/routes";
import tooltip from "./directives/tooltip";

import { projectPlugin, projectActions } from "./project";
import { checkAppVersion } from "./version/versionCheck";
import { httpPlugin, discoverApiBaseUrl } from "./http/plugin";
import { startRealtime } from "./realtime";
import { installClientPlugins, setupAuthGuard } from "@client/bootstrap";
import { defineCustomElements } from "./js/customElements";

const useHashHistory = typeof window !== "undefined" && window.location.protocol === "file:";

const router = createRouter({
    history: useHashHistory ? createWebHashHistory() : createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.use(designSystemPlugin);
app.use(toastPlugin, {
    timeout: 4000
});

app.directive("tooltip", tooltip);

app.use(projectPlugin, { router });

app.use(httpPlugin);
setupAuthGuard(router);

const title = import.meta.env.VITE_SITE_TITLE;

projectActions.setSiteTitle(title);

if (typeof document !== "undefined") {
    document.title = title;
}

void (async () => {
    await discoverApiBaseUrl();
    await installClientPlugins(app, router);
    startRealtime();
    defineCustomElements();
    app.mount("#app");
    void checkAppVersion();
})();
