<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/websocket.md?raw";

export default defineComponent({
    name: "DocsWebsocket",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
