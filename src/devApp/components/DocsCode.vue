<template>
    <pre
        class="docs-code overflow-x-auto rounded bg-secondary/10 p-4 pr-12 font-mono text-sm leading-6 text-foreground light:brightness-80"
    ><code v-html="highlighted" /></pre>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { highlightDocsCode } from "../ts/highlightDocsCode";

export default defineComponent({
    name: "DocsCode",

    props: {
        /**
         * Source text shown in the Code tab.
         */
        code: {
            type: String,
            default: ""
        },

        /**
         * Language hint: `vue`, `html`, `js`, `ts`, `css`, `json`, `bash`.
         */
        language: {
            type: String,
            default: "vue"
        }
    },

    computed: {
        /**
         * Gets the highlighted
         * @returns {unknown} The highlighted
         */
        highlighted(): string {
            return highlightDocsCode(this.code, this.language);
        }
    }
});
</script>

<style src="../css/docs-code.css"></style>
