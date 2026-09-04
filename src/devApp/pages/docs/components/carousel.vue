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
                <code>showArrows</code>, <code>edgeClick</code> e
                <code>stepsViewer</code> controlam a navegação.
                Clique no padding em volta do item emite <code>click:outside</code>.
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
                                image-class="max-h-[50vh] rounded"
                                :draggable="true"

                                :src="image.src"
                                :alt="image.alt"
                                :open-modal="true"
                            />
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Setas e clique nas extremidades
            </h3>

            <p>
                <code>showArrows</code> (default <code>true</code>) mostra as setas laterais.
                Com <code>edgeClick</code>, cerca de 18% de cada lado do viewport
                avança ou recua o slide — útil quando as setas estão escondidas.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Sem setas, clique nas bordas">
                <div class="p-4">
                    <Carousel
                        :show-arrows="false"
                        edge-click
                    >
                        <template
                            v-for="(image, idx) in images"
                            :key="idx"

                            #[`item-${idx}`]
                        >
                            <Image
                                image-class="max-h-[40vh] rounded"

                                :src="image.src"
                                :alt="image.alt"
                            />
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Indicador de passos
            </h3>

            <p>
                <code>stepsViewer="simplified"</code> (default) são as bolinhas sobre o slide.
                <code>advanced</code> fica <b>abaixo</b> dos itens: chevrons e
                <code>n / n</code>, no estilo do input.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Steps advanced">
                <div class="p-4">
                    <Carousel
                        :show-arrows="false"
                        edge-click
                        steps-viewer="advanced"

                        @click:outside="outsideCount += 1"
                    >
                        <template
                            v-for="(image, idx) in images"
                            :key="idx"

                            #[`item-${idx}`]
                        >
                            <Image
                                image-class="max-h-[40vh] rounded"

                                :src="image.src"
                                :alt="image.alt"
                            />
                        </template>
                    </Carousel>

                    <p class="mt-3 text-sm text-muted-foreground!">
                        Clique fora do item (padding do carousel):
                        <code>click:outside</code> disparou {{ outsideCount }} vez(es).
                    </p>
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
                            <div class="w-full max-w-md rounded border border-border bg-card p-6 text-center">
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
                            <div class="w-full max-w-md rounded border border-border bg-card p-6 flex flex-col items-center gap-3">
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
            ],
            outsideCount: 0
        };
    }
});
</script>
