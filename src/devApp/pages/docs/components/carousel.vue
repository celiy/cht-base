<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Carousel
            </h1>

            <p class="text-muted-foreground!">
                Galeria de imagens com navegação. Clique abre lightbox em modal.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4">
                        <Carousel
                            :images="[
                                { src: 'https://i.imgur.com/vN9nvON.jpeg', alt: 'Image 1' },
                                { src: 'https://i.imgur.com/wAwAYzQ.jpeg', alt: 'Image 2' },
                                { src: 'https://i.imgur.com/4dIoDgD.jpeg', alt: 'Image 3' }
                            ]"
                        />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Props
            </h3>

            <p>
                <code>images</code> é uma array de <code>{ src, alt }</code>.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Carousel from "@design/components/Carousel.vue";

export default defineComponent({
    name: "ComponentsCarousel",

    components: {
        Card,
        Carousel
    }
});
</script>
