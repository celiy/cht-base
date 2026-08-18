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
                <RouterView v-slot="{ Component, route }">
                    <Transition name="docs-page-slide" mode="out-in">
                        <DocsOutline :key="route.path">
                            <component
                                :is="Component"
                            />
                        </DocsOutline>
                    </Transition>
                </RouterView>
            </Sidebar>
        </div>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@design/components/custom/Sidebar.vue";
import { componentsNav } from "./ts/componentsNav";
import Navigator from "@design/components/custom/Navigator.vue";
import { navLinks } from "../js/navLinks";
import DocsOutline from "./components/DocsOutline.vue";
</script>

<style>
.docs-page-slide-enter-active,
.docs-page-slide-leave-active {
    transition: opacity 0.1s ease, transform 0.1s ease;
}

.docs-page-slide-enter-from {
    opacity: 0;
    transform: translateX(-1.25rem);
}

.docs-page-slide-leave-to {
    opacity: 0;
    transform: translateX(1.25rem);
}
</style>
