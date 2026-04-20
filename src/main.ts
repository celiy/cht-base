import { createApp } from "vue";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";
import router from "./Router";
import App from "./App.vue";
import tooltip from "./directives/tooltip";
import { projectPlugin } from "./project";

const app = createApp(App);

app.use(router);
app.use(Toast, {
    position: "bottom-center",
    timeout: 4000,
});
app.config.globalProperties.$toast = useToast();

app.directive("tooltip", tooltip);

app.use(projectPlugin, { router });

app.mount("#app");
