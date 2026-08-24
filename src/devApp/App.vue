<template>
    <RouterView />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import DocsExample from "./components/DocsExample.vue";

export default defineComponent({
    name: "ChtBaseDevApp",

    created() {
        const instance = getCurrentInstance();
        instance?.appContext.app.component("DocsExample", DocsExample);
    }
});
</script>
