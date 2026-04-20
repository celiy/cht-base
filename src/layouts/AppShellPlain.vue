<template>
    <main class="min-h-screen">
        <RouterView />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Layout sem sidebar — usar como pai de rotas aninhadas (ex.: login, landing full-width).
 */
export default defineComponent({
    name: "AppShellPlain"
});
</script>
