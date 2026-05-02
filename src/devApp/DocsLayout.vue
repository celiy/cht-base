<template>
    <main>
        <Sidebar 
            title="CHT Docs"
            description="The CHT documentation."
            :nav-items="componentsNav"
        >
            <RouterView />
        </Sidebar>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@design/components/custom/Sidebar.vue";
import { componentsNav } from "./ts/componentsNav";
</script>
