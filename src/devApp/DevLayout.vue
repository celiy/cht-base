<template>
    <main>
        <Navigator
            class="shrink-0 relative bg-background"
            :links="navLinks"
        />
        
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import Navigator from "@design/components/custom/Navigator.vue";
import { navLinks } from "../js/navLinks";
</script>
