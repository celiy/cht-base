<template>
    <main class="relative flex flex-col h-dvh overflow-hidden">
        <div class="shrink-0 relative z-60">
            <Navigator
                :links="navLinks"
            />

            <div
                v-show="$project.route.isLoading"

                class="route-loading-track pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
                aria-hidden="true"
            >
                <div class="route-loading-bar absolute inset-y-0 w-1/3 bg-primary" />
            </div>
        </div>

        <div v-if="$route.path.startsWith('/docs')" class="flex-1 min-h-0 relative">
            <Sidebar 
                title="CHT Docs"
                description="The CHT documentation."
                variant="minimalist"
                :nav-items="componentsNav"
            >
                <div class="relative min-h-full">
                    <RouterView v-slot="{ Component, route }">
                        <Transition name="docs-page-slide" mode="out-in">
                            <DocsOutline :key="route.path">
                                <component
                                    :is="Component"
                                />
                            </DocsOutline>
                        </Transition>
                    </RouterView>

                    <div
                        v-if="$project.route.isLoading"

                        class="absolute inset-0 z-20 bg-background/80"
                    />
                </div>
            </Sidebar>
        </div>
            
        <div v-else class="relative flex-1 min-h-0 overflow-y-auto">
            <RouterView />

            <div
                v-if="$project.route.isLoading"

                class="absolute inset-0 z-20 bg-background/80"
            />
        </div>

        <ViewportCenter v-if="$project.route.isLoading">
            <div class="w-8 shrink-0">
                <ProgressBar
                    variant="circular"
                    size="small"
                    loading
                />
            </div>
        </ViewportCenter>
        
        <Toast position="bottom" />
    </main>
</template>

<script setup lang="ts">
import { componentsNav } from "./ts/componentsNav.ts";
import { navLinks } from "../js/navLinks.ts";
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

.route-loading-bar {
    animation: route-loading-slide 0.9s ease-in-out infinite;
}

@keyframes route-loading-slide {
    0% {
        transform: translateX(-120%);
    }

    100% {
        transform: translateX(380%);
    }
}
</style>
