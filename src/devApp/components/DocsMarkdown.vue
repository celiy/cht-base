<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4 pb-16 docs-markdown">
        <div
            class="flex flex-col gap-4"

            v-html="html"
        />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { renderMarkdown } from "../ts/markdown";

export default defineComponent({
    name: "DocsMarkdown",

    props: {
        /**
         * Raw markdown sourced from a workspace `.md` file.
         */
        source: {
            type: String,
            required: true
        }
    },

    computed: {
        html(): string {
            return renderMarkdown(this.source);
        }
    }
});
</script>
