<template>
    <main class="relative flex h-dvh flex-col overflow-hidden">
        <div
            class="z-60"
            :class="{
                'absolute inset-x-0 top-0': !$route.path.startsWith('/docs'),
                'relative shrink-0': $route.path.startsWith('/docs')
            }"
        >
            <Navigator>
                <div
                    v-if="$project.device.isMobile"

                    class="appear-from-t-to-b flex items-center justify-between gap-2 px-2 py-3"
                >
                    <Button
                        variant="transparent"

                        @click="toggleTheme"
                    >
                        <span
                            class="fa-solid"
                            :class="isDarkTheme ? 'fa-sun' : 'fa-moon'"
                        />
                    </Button>

                    <div class="flex w-full justify-end">
                        <Input
                            id="search-input-mobile"
                            type="text"
                            placeholder="Pesquisar..."
                            readonly

                            @click="openSearch"
                        >
                            <template #prefix>
                                <span class="fa-solid fa-search mr-2 text-foreground/50"></span>
                            </template>
                        </Input>
                    </div>

                    <Popover
                        close-on-content-click
                        :min-width-px="200"
                        :lock-to-anchor="false"
                    >
                        <template #button="{ toggle }">
                            <Button
                                variant="transparent"

                                @click="toggle"
                            >
                                <span class="fa-bars fa-solid"></span>
                            </Button>
                        </template>

                        <div class="flex flex-col gap-2">
                            <div
                                class="flex min-w-0 flex-col flex-wrap items-end justify-end gap-1 sm:gap-2"
                            >
                                <RouterLink
                                    v-for="link in navLinks"
                                    :key="link.path"
                                    v-slot="{ navigate }"

                                    custom
                                    :to="link.path"
                                >
                                    <Button
                                        variant="transparent"
                                        class="w-full"
                                        :label="link.label"

                                        @click="navigate"
                                    />
                                </RouterLink>
                            </div>

                            <div class="flex items-end justify-end gap-2">
                                <Button
                                    label="GitHub"
                                    class="w-full"
                                    left-icon="fa-brands fa-github"

                                    @click="openGitHub"
                                />
                            </div>
                        </div>
                    </Popover>
                </div>

                <div
                    v-else

                    class="appear-from-t-to-b flex flex-wrap justify-between gap-2 px-3 py-4 sm:px-6"
                >
                    <!-- Left side -->
                    <div class="flex min-w-0 flex-row flex-wrap gap-1 sm:gap-2">
                        <RouterLink
                            v-for="link in navLinks"
                            :key="link.path"
                            v-slot="{ navigate }"

                            custom
                            :to="link.path"
                        >
                            <Button
                                variant="transparent"
                                :label="link.label"

                                @click="navigate"
                            />
                        </RouterLink>
                    </div>

                    <div class="flex gap-2">
                        <Input
                            id="search-input"
                            type="text"
                            placeholder="Pesquisar..."
                            readonly

                            @click="openSearch"
                        >
                            <template #prefix>
                                <span class="fa-solid fa-search mr-2 text-foreground/50"></span>
                            </template>
                        </Input>

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
                :start-open="!$project.device.isMobile"
                :nav-items="componentsNav"
            >
                <template #header>
                    <div class="flex items-center gap-2 px-4 pt-3">
                        <h4>CHT Docs</h4>
                    </div>
                </template>

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

            class="appear-from-b-to-t relative min-h-0 flex-1 overflow-y-auto"
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

        <Modal
            variant="preview"
            url-sync
            :is-open="isSearchModalOpen"

            @update:value="isSearchModalOpen = $event"
        >
            <template #body>
                <div class="rounded border bg-popover shadow-lg">
                    <OptionsList
                        class="max-h-[50vh] min-w-[90vw] sm:min-w-[60vw] md:min-w-[40vw]"
                        :options="plainOptions"
                        :search="{ external: false }"
                        :search-query="query"

                        @update:search-query="query = $event"
                        @select="onSelect"
                    />
                </div>
            </template>
        </Modal>

        <Toast position="bottom" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionsList from "@design/components/internal/OptionsList.vue";
import { componentsNav } from "./ts/componentsNav.ts";
import { navLinks } from "../js/navLinks.ts";
import DocsOutline from "./components/DocsOutline.vue";
import { project } from "../project";

export default defineComponent({
    name: "DevAppLayout",

    components: {
        DocsOutline,
        OptionsList
    },

    data() {
        return {
            isSearchModalOpen: false,
            componentsNav,
            navLinks,
            query: ""
        };
    },

    computed: {
        isDarkTheme() {
            return project.style.activeTheme === "dark";
        },

        plainOptions(): { label: string; value: string }[] {
            return this.componentsNav
                .flatMap((section) => {
                    if (section.type === "group") {
                        // Collect all links within groups
                        return section.links;
                    } else if (section.type === "link") {
                        // Single link at the top level
                        return [section];
                    } else {
                        return [];
                    }
                })
                .map((link) => ({
                    label: link.label,
                    value: link.link
                }));
        }
    },

    methods: {
        openSearch() {
            this.isSearchModalOpen = true;
        },

        onSelect(value: string | undefined) {
            if (!value) {
                return;
            }

            void this.$router.push(value).finally(() => {
                this.closeSearch();
            });
        },

        closeSearch() {
            this.isSearchModalOpen = false;
        },

        openGitHub() {
            window.open("https://github.com/celiy/cht-main", "_blank");
        },

        toggleTheme() {
            project.style.theme(this.isDarkTheme ? "light" : "dark");
        }
    }
});
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
