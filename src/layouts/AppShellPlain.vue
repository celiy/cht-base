<template>
    <main class="min-h-screen">
        <RouterView />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Layout without sidebar use as parent of nested routes.
 */
export default defineComponent({
    name: "AppShellPlain"
});
</script>
