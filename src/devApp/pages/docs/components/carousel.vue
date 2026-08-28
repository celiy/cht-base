<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Carousel
            </h1>

            <p>
                Faixa deslizante de slides. Cada slide é um slot <code>#item-0</code>,
                <code>#item-1</code>, … — imagem, texto ou qualquer markup.
                Setas, pontos e swipe no telemóvel mudam o slide.
            </p>
        </section>

        <section>
            <h3>
                Imagens
            </h3>

            <p>
                Com <code>v-for</code>, o nome do slot é <code>item-</code> seguido do índice
                (<code>#item-0</code>, <code>#item-1</code>, …).
                <code>startIndex</code> (0-based) define o slide inicial.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Imagens">
                <div class="p-4">
                    <Carousel>
                        <template
                            v-for="(image, idx) in images"
                            :key="idx"

                            #[`item-${idx}`]
                        >
                            <Image
                                imageClass="max-h-[50vh] rounded-lg"
                                draggable="true"

                                :src="image.src"
                                :alt="image.alt"
                                :openModal="true"
                            />
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Conteúdo livre
            </h3>

            <p>
                Cada slot recebe o que quiser: um bloco, um card, um formulário.
                Não há prop <code>images</code> — o conteúdo vem só dos slots.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Conteúdo livre">
                <div class="p-4">
                    <Carousel>
                        <template #item-0>
                            <div class="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center">
                                <p class="font-semibold text-lg">
                                    Slide de texto
                                </p>

                                <p class="mt-2">
                                    Qualquer HTML cabe no carousel, não só imagens. <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus doloribus quis cupiditate, eveniet illum molestiae? Ipsam commodi praesentium beatae ipsa quasi, ut odio voluptatum modi quis, impedit sit distinctio.
                                </p>
                            </div>
                        </template>

                        <template #item-1>
                            <div class="w-full max-w-md rounded-lg border border-border bg-card p-6 flex flex-col items-center gap-3">
                                <Badge
                                    label="Badge"
                                    variant="success"
                                />

                                <p>
                                    Mix de componentes no mesmo slide.
                                </p>
                            </div>
                        </template>

                        <template #item-2>
                            <Button
                                label="Ação no slide"
                                variant="primary"
                            />
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, type Component } from "vue";
import Carousel from "@design/components/Carousel.vue";
import Badge from "@design/components/Badge.vue";
import Button from "@design/components/Button.vue";
import Image from "@design/components/Image.vue";

const docsComponents: Record<string, Component> = {
    Carousel: Carousel as Component,
    Badge: Badge as Component,
    Button: Button as Component,
    Image: Image as Component
};

export default defineComponent({
    name: "ComponentsCarousel",

    components: docsComponents,

    data() {
        return {
            images: [
                { src: "https://i.imgur.com/vN9nvON.jpeg", alt: "Image 1" },
                { src: "https://i.imgur.com/wAwAYzQ.jpeg", alt: "Image 2" },
                { src: "https://i.imgur.com/4dIoDgD.jpeg", alt: "Image 3" }
            ]
        };
    }
});
</script>
