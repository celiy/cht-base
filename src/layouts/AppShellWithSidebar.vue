<template>
    <main>
        <Sidebar :nav-items="navItems">
            <RouterView />
        </Sidebar>
    </main>
</template>

<script lang="ts">
import Sidebar from "@design/components/custom/Sidebar.vue";
import { defineComponent } from "vue";
import { getSidebarNav } from "../nav/sidebar";

/**
 * Layout with sidebar use as parent of nested routes.
 */
export default defineComponent({
    name: "AppShellWithSidebar",

    components: {
        Sidebar
    },

    computed: {
        /**
         * Navigation items for the sidebar.
         */
        navItems() {
            return getSidebarNav();
        }
    }
});
</script>
