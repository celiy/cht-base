<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Media uploader
            </h1>

            <p>
                Área de drop para arquivos, com limite, múltiplos arquivos e tipos aceitos.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Media uploader">
                <div class="p-4">
                    <MediaUploader
                        id="docs-media-uploader"
                        label="Arquivos"
                        helperText="Imagens, PDF ou áudio."
                        :maxFiles="4"
                        :accept="['image/*', '.pdf', 'audio/*']"
                        :value="files"

                        @update:value="files = $event"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MediaUploader from "@design/components/MediaUploader.vue";

export default defineComponent({
    name: "ComponentsMediaUploader",

    components: {
        MediaUploader
    },

    data() {
        return {
            files: [] as File[]
        };
    }
});
</script>
