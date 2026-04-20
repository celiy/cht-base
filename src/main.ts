import { createApp } from "vue";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";
import router from "./Router";
import App from "./App.vue";
import tooltip from "./directives/tooltip";
import { projectActions, projectPlugin } from "./project";

const app = createApp(App);

app.use(router);
app.use(Toast, {
    position: "bottom-center",
    timeout: 4000,
});

app.directive("tooltip", tooltip);

app.config.globalProperties.$toast = useToast();
app.use(projectPlugin, { router });

projectActions.setSiteTitle(document.title || "IBESCT");

app.mount("#app");
