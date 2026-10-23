<template>
    <div class="override-demo-shell">
        <div
            class="override-demo-ambient"
            aria-hidden="true"
        >
            <span class="override-demo-blob override-demo-blob--a" />
            <span class="override-demo-blob override-demo-blob--b" />
            <span class="override-demo-blob override-demo-blob--c" />
            <span class="override-demo-blob override-demo-blob--d" />
        </div>

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
    }
});
</script>
