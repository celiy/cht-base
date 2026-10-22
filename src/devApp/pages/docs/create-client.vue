<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import content from "./content/create-client.md?raw";

const templateImages = import.meta.glob<string>("../../../assets/images/templates/*.png", {
    eager: true,
    import: "default"
});

export default defineComponent({
    name: "DocsCreateClient",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            // The markdown points at `templates/<name>.png`; swap it for the bundled asset URL.
            return content.replace(/\(templates\/([\w-]+\.png)\)/g, (match, file: string) => {
                const url = templateImages[`../../../assets/images/templates/${file}`];

                return url ? `(${url})` : match;
            });
        }
    }
});
</script>
