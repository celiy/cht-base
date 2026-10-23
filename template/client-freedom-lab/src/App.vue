<template>
    <div class="min-h-screen">
        <nav
            class="flex gap-2 border-b px-6 py-3"
            aria-label="Seções do laboratório"
        >
            <RouterLink
                v-for="link in links"
                :key="link.to"

                class="rounded px-3 py-1.5 text-sm"
                :to="link.to"
            >
                {{ link.label }}
            </RouterLink>
        </nav>

        <RouterView />

        <Toast position="bottom-right" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toast from "@design/components/Toast.vue";

export default defineComponent({
    name: "__APP_NAME__",

    components: {
        Toast
    },

    data() {
        return {
            links: [
                { to: "/", label: "Verificações" },
                { to: "/graphics", label: "three.js + WebGPU" },
                { to: "/files", label: "Arquivos locais" }
            ]
        };
    }
});
</script>

<style>
.lab-link-active {
    background: var(--color-accent);
    font-weight: 600;
}
</style>
