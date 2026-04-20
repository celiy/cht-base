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

export default defineComponent({
    name: "AppShellWithSidebar",

    components: {
        Sidebar
    },

    computed: {
        navItems() {
            return getSidebarNav();
        }
    }
});
</script>
