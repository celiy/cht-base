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

<style scoped>
.docs-code :deep(.hljs-comment),
.docs-code :deep(.hljs-quote) {
    color: var(--color-muted-foreground);
}

.docs-code :deep(.hljs-keyword),
.docs-code :deep(.hljs-selector-tag),
.docs-code :deep(.hljs-built_in),
.docs-code :deep(.hljs-meta .hljs-keyword) {
    color: var(--color-red-500);
}

.docs-code :deep(.hljs-string),
.docs-code :deep(.hljs-template-tag),
.docs-code :deep(.hljs-template-variable) {
    color: var(--color-lime-400);
}

.docs-code :deep(.hljs-number),
.docs-code :deep(.hljs-literal),
.docs-code :deep(.hljs-symbol) {
    color: var(--color-yellow-400);
}

.docs-code :deep(.hljs-name),
.docs-code :deep(.hljs-tag),
.docs-code :deep(.hljs-selector-id),
.docs-code :deep(.hljs-selector-class) {
    color: var(--color-red-400);
}

.docs-code :deep(.hljs-attr),
.docs-code :deep(.hljs-attribute),
.docs-code :deep(.hljs-variable),
.docs-code :deep(.hljs-params) {
    color: var(--color-orange-400);
}

.docs-code :deep(.hljs-title),
.docs-code :deep(.hljs-section),
.docs-code :deep(.hljs-function) {
    color: var(--color-yellow-400);
}

.docs-code :deep(.hljs-punctuation),
.docs-code :deep(.hljs-bullet) {
    color: var(--color-muted-foreground);
}

.docs-code :deep(.hljs-meta),
.docs-code :deep(.hljs-addition) {
    color: var(--color-muted-foreground);
}
</style>
