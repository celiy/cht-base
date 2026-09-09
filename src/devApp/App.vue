<template>
    <ElectronStartupGate>
        <RouterView />
    </ElectronStartupGate>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import DocsExample from "./components/DocsExample.vue";
import ElectronStartupGate from "../electron/ElectronStartupGate.vue";

export default defineComponent({
    name: "ChtBaseDevApp",

    components: {
        ElectronStartupGate
    },

    created() {
        const instance = getCurrentInstance();
        instance?.appContext.app.component("DocsExample", DocsExample);
    }
});
</script>
