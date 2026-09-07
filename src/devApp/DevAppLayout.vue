<template>
    <main class="relative flex h-dvh flex-col overflow-hidden">
        <div class="relative z-60 shrink-0">
            <Navigator>
                <div class="flex justify-between px-6 py-4">
                    <!-- Left side -->
                    <div class="flex flex-row gap-2">
                        <!-- Links -->
                        <div
                            v-for="link in navLinks"
                            :key="link.path"
                        >
                            <Button
                                variant="transparent"
                                :label="link.label"

                                @click="$router.push(link.path)"
                            />
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <Button
                            label="GitHub"
                            left-icon="fa-brands fa-github"

                            @click="openGitHub"
                        />

                        <Marker
                            separator
                            orientation="vertical"
                        />

                        <Button
                            variant="transparent"

                            @click="toggleTheme"
                        >
                            <span
                                class="fa-solid"
                                :class="isDarkTheme ? 'fa-sun' : 'fa-moon'"
                            />
                        </Button>
                    </div>
                </div>
            </Navigator>

            <Transition name="fade-loading">
                <div
                    v-if="$project.route.isLoading"

                    class="route-loading-track pointer-events-none absolute right-0 bottom-0 left-0 h-0.5 overflow-hidden"
                    aria-hidden="true"
                >
                    <div class="route-loading-bar absolute inset-y-0 w-1/3 bg-primary" />
                </div>
            </Transition>
        </div>

        <div
            v-if="$route.path.startsWith('/docs')"

            class="relative min-h-0 flex-1"
        >
            <Sidebar
                title="CHT Docs"
                description="The CHT documentation."
                variant="minimalist"
                :nav-items="componentsNav"
            >
                <div class="relative min-h-full">
                    <RouterView v-slot="{ Component, route }">
                        <Transition
                            name="docs-page-slide"
                            mode="out-in"
                        >
                            <DocsOutline :key="route.path">
                                <component :is="Component" />
                            </DocsOutline>
                        </Transition>
                    </RouterView>
                </div>
            </Sidebar>
        </div>

        <div
            v-else

            class="relative min-h-0 flex-1 overflow-y-auto"
        >
            <RouterView />
        </div>

        <Transition name="fade-loading">
            <div
                v-if="$project.route.isLoading"

                class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-background/40"
                aria-hidden="true"
            >
                <div class="w-8 shrink-0">
                    <ProgressBar
                        variant="circular"
                        size="small"
                        loading
                    />
                </div>
            </div>
        </Transition>

        <Toast position="bottom" />
    </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { componentsNav } from "./ts/componentsNav.ts";
import { navLinks } from "../js/navLinks.ts";
import DocsOutline from "./components/DocsOutline.vue";
import { project } from "../project";

const isDarkTheme = computed(() => project.style.activeTheme === "dark");

function toggleTheme() {
    project.style.theme(isDarkTheme.value ? "light" : "dark");
}

function openGitHub() {
    window.open("https://github.com/celiy/cht-main", "_blank");
}
</script>

<style>
.docs-page-slide-enter-active {
    transition:
        opacity 0.15s ease-out,
        transform 0.15s ease-out;
}

.docs-page-slide-leave-active {
    transition:
        opacity 0.15s ease-in,
        transform 0.15s ease-in;
}

.docs-page-slide-enter-from {
    opacity: 0.6;
    transform: translateX(-1rem);
}

.docs-page-slide-leave-to {
    opacity: 0.6;
    transform: translateX(1rem);
}

.fade-loading-enter-active,
.fade-loading-leave-active {
    transition: opacity 0.2s ease;
}

.fade-loading-enter-from,
.fade-loading-leave-to {
    opacity: 0;
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
