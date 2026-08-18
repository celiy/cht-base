<template>
    <main class="flex flex-col h-dvh overflow-hidden">
        <Navigator
            class="shrink-0 relative z-[60] bg-background"
            :links="navLinks"
        />

        <div class="flex-1 min-h-0 relative">
            <Sidebar 
                title="CHT Docs"
                description="The CHT documentation."
                variant="minimalist"
                :nav-items="componentsNav"
            >
                <RouterView />
            </Sidebar>
        </div>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@design/components/custom/Sidebar.vue";
import { componentsNav } from "./ts/componentsNav";
import Navigator from "@design/components/custom/Navigator.vue";
import { navLinks } from "../js/navLinks";
</script>
