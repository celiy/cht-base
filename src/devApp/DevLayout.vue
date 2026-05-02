<template>
    <main>
        <Sidebar :nav-items="devNav">
            <RouterView />
        </Sidebar>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@design/components/custom/Sidebar.vue";
import { devNav } from "./ts/devNav";
</script>
