import type { App } from "vue";
import type { Router } from "vue-router";

export function installClientPlugins(_app: App, _router: Router) {
    void _app;
    void _router;
    // No-op for devApp laboratory mode.
}
