<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Image</h1>

            <p>
                Foto com skeleton na mesma proporção enquanto o ficheiro carrega. Clique opcional
                abre um preview em modal.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Image">
                <div class="p-4">
                    <Image
                        class="w-full"
                        image-class="h-full w-full rounded object-cover"
                        aspect-ratio="16/9"
                        :src="landscapeImage"
                        alt="Paisagem"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Carregamento lento</h3>

            <p>
                Enquanto a rede não entrega o ficheiro, o <code>Skeleton</code> ocupa o
                <code>aspect-ratio</code> (aqui <code>16/9</code>). A foto abaixo é um JPEG grande
                da Wikimedia Commons; cada recarga acrescenta um query para evitar cache.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Carregamento lento">
                <div class="flex flex-col gap-3 p-4">
                    <Image
                        :key="slowKey"
                        class="w-full"
                        image-class="h-full w-full rounded object-cover"
                        aspect-ratio="16/9"
                        :src="slowSrc"
                        alt="Fronalpstock, Alpes suíços"
                    />

                    <Button
                        class="w-fit"
                        label="Recarregar"
                        variant="secondary"

                        @click="reloadSlow"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Modal</h3>

            <p>
                <code>open-modal</code> abre a imagem em preview ao clicar.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Modal">
                <div class="p-4">
                    <Image
                        class="w-full max-w-sm"
                        image-class="h-full w-full rounded object-cover"
                        aspect-ratio="4/3"
                        :src="landscapeImage"
                        alt="Paisagem"
                        :open-modal="true"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Image from "@design/components/Image.vue";
import Button from "@design/components/Button.vue";
import landscapeImage from "@/assets/images/landscape.jpg";

const SLOW_IMAGE_URL =
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg";

export default defineComponent({
    name: "ComponentsImage",

    components: {
        Image,
        Button
    },

    data() {
        return {
            landscapeImage,
            slowKey: 0
        };
    },

    computed: {
        slowSrc(): string {
            return `${SLOW_IMAGE_URL}?cht=${this.slowKey}`;
        }
    },

    methods: {
        reloadSlow() {
            this.slowKey += 1;
        }
    }
});
</script>
