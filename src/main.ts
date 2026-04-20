import { createApp } from "vue";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";
import router from "./Router";
import App from "./App.vue";
import tooltip from "./directives/tooltip";
import { projectPlugin, projectActions } from "./project";
import devShellConfig from "../configs/dev";

const app = createApp(App);

app.use(router);
app.use(Toast, {
    position: "bottom-center",
    timeout: 4000,
});
app.config.globalProperties.$toast = useToast();

app.directive("tooltip", tooltip);

app.use(projectPlugin, { router });

const title = __CLIENT_CONFIG__ ? __CLIENT_CONFIG__.siteTitle : devShellConfig.siteTitle;

projectActions.setSiteTitle(title);

if (typeof document !== "undefined") {
    document.title = title;
}

app.mount("#app");
