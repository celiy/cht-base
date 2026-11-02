<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Carousel</h1>

            <p>
                Faixa deslizante. Cada slide é um slot <code>#item-0</code>, <code>#item-1</code> e
                assim por diante. O total de slides é a contagem desses slots, incluindo os de
                <code>v-for</code>. Com um item só, setas e passos somem. Setas e passos fazem loop.
                No celular, o swipe, de uns 100&nbsp;px, não passa do primeiro nem do último slide.
                Clicar fora do item emite <code>click:outside</code>.
            </p>
        </section>

        <section>
            <h3>Imagens</h3>

            <p>
                Com <code>v-for</code>, o nome do slot é <code>item-</code> seguido do índice, como
                <code>#item-0</code> e <code>#item-1</code>. <code>startIndex</code>, que começa em
                0, define o slide inicial. <code>showSteps</code> mostra ou esconde as bolinhas
                sobre o slide.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Imagens">
                <div class="p-4">
                    <Carousel :show-steps="showStepsBool">
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

                    <Button
                        :label="showStepsBool ? 'Esconder passos' : 'Mostrar passos'"

                        @click="showStepsBool = !showStepsBool"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Setas e clique nas extremidades</h3>

            <p>
                <code>showArrows</code>, com padrão <code>true</code>, mostra as setas laterais. Com
                <code>edgeClick</code>, cerca de 18% de cada lado da área de visualização avança ou
                volta o slide. É útil quando as setas estão escondidas.
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
            <h3>Indicador de passos</h3>

            <p>
                <code>stepsViewer="simplified"</code>, o padrão, mostra as bolinhas sobre o slide.
                <code>advanced</code> fica <b>abaixo</b> dos itens, com chevrons e
                <code>n / n</code>, no estilo do input.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Steps advanced">
                <div class="p-4">
                    <Carousel
                        :show-arrows="false"
                        edge-click
                        :steps-viewer="stepsIndicator ? 'advanced' : 'simplified'"

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

                    <div class="mt-4 flex items-center gap-2">
                        <p>Variante do step viewer:</p>

                        <Button
                            :label="stepsIndicator ? 'Advanced' : 'Simplified'"

                            @click="stepsIndicator = !stepsIndicator"
                        />
                    </div>

                    <p class="mt-3 text-sm text-muted-foreground!">
                        Clique fora do item (padding do carousel):
                        <code>click:outside</code> disparou {{ outsideCount }} vez(es).
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>startIndex</h3>

            <p>
                Índice do slide inicial, começando em 0. Valores fora do intervalo são limitados ao
                primeiro ou ao último. Se a prop mudar depois do mount, o carousel vai para esse
                índice.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="startIndex">
                <div class="p-4">
                    <Carousel :start-index="1">
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
                        Abre no segundo slide (<code>start-index="1"</code>).
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Orientação vertical</h3>

            <p>
                <code>orientation="vertical"</code> empilha os slides e desliza de cima para baixo.
                As setas ficam no topo e embaixo, o clique nas extremidades usa 18% do topo e da
                base, e o swipe passa a ser vertical. Defina a altura do carousel, por exemplo com
                <code>class="h-96"</code>. Os slides ocupam essa altura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Vertical">
                <div class="p-4">
                    <Carousel
                        class="h-96"
                        orientation="vertical"
                    >
                        <template
                            v-for="(image, idx) in images"
                            :key="idx"
                            #[`item-${idx}`]
                        >
                            <Image
                                image-class="max-h-80 rounded"
                                :src="image.src"
                                :alt="image.alt"
                            />
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Posição dos indicadores</h3>

            <p>
                <code>indicatorPosition="top / bottom / left / right"</code> define onde ficam as
                bolinhas do <code>stepsViewer="simplified"</code>. O padrão é <code>bottom</code>,
                ou <code>right</code> quando o carousel é vertical. Nas laterais, as bolinhas ficam
                empilhadas.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Posição dos indicadores">
                <div class="p-4">
                    <Carousel
                        :show-arrows="false"
                        :indicator-position="indicatorSide"
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

                    <div class="mt-4 flex flex-wrap items-center gap-2">
                        <Button
                            label="top"
                            size="small"
                            :variant="indicatorSide === 'top' ? 'primary' : 'secondary'"

                            @click="indicatorSide = 'top'"
                        />

                        <Button
                            label="bottom"
                            size="small"
                            :variant="indicatorSide === 'bottom' ? 'primary' : 'secondary'"

                            @click="indicatorSide = 'bottom'"
                        />

                        <Button
                            label="left"
                            size="small"
                            :variant="indicatorSide === 'left' ? 'primary' : 'secondary'"

                            @click="indicatorSide = 'left'"
                        />

                        <Button
                            label="right"
                            size="small"
                            :variant="indicatorSide === 'right' ? 'primary' : 'secondary'"

                            @click="indicatorSide = 'right'"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Navegação customizada</h3>

            <p>
                O slot <code>#controls</code> substitui as setas pelos seus próprios botões. Ele
                recebe <code>prev</code>, <code>next</code>, <code>goTo</code>,
                <code>index</code> (slide atual, começando em 0) e <code>count</code>. O slot fica
                dentro da área dos slides, que tem <code>position: relative</code>, então use
                <code>absolute</code> para posicionar.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slot controls">
                <div class="p-4">
                    <Carousel>
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

                        <template #controls="{ prev, next, index, count }">
                            <div
                                class="absolute inset-x-0 top-2 z-10 flex items-center justify-center gap-2"
                            >
                                <Button
                                    label="Anterior"
                                    size="small"
                                    variant="secondary"

                                    @click="prev"
                                />

                                <span
                                    class="rounded bg-black/40 px-2 py-1 text-sm text-white tabular-nums"
                                >
                                    {{ index + 1 }} / {{ count }}
                                </span>

                                <Button
                                    label="Próxima"
                                    size="small"
                                    variant="secondary"

                                    @click="next"
                                />
                            </div>
                        </template>
                    </Carousel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Autoplay</h3>

            <p>
                <code>autoplay</code> avança sozinho a cada <code>interval</code> milissegundos
                (padrão <code>5000</code>) e volta ao primeiro slide no fim. Com
                <code>pauseOnHover</code>, que vem <code>true</code>, ele para enquanto o mouse está
                sobre o carousel. Trocar de slide na mão reinicia a contagem.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Autoplay">
                <div class="p-4">
                    <Carousel
                        autoplay
                        :interval="2500"
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
                        Troca a cada 2,5 s. Passe o mouse por cima para pausar.
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Transição</h3>

            <p>
                <code>transition="slide / fade"</code>. O padrão é <code>slide</code>, que desliza a
                faixa. <code>fade</code> sobrepõe os slides e troca só a opacidade, e a altura passa
                a ser a do maior slide. <code>transitionDuration</code> define a duração em
                milissegundos (padrão <code>500</code>) e <code>transitionEasing</code> recebe
                qualquer <code>transition-timing-function</code> do CSS (padrão
                <code>ease-in-out</code>). As duas valem para <code>slide</code> e
                <code>fade</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Fade">
                <div class="p-4">
                    <Carousel
                        transition="fade"
                        transition-easing="linear"
                        :transition-duration="1000"
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

        <section class="mb-8">
            <DocsExample label="Slide lento com easing customizado">
                <div class="p-4">
                    <Carousel
                        transition-easing="cubic-bezier(0.22, 1, 0.36, 1)"
                        :transition-duration="1200"
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
            <h3>Conteúdo livre</h3>

            <p>
                Cada slot recebe o que quiser: um bloco, um card, um formulário. Não há prop
                <code>images</code> não é usado. O conteúdo vem só dos slots.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Conteúdo livre">
                <div class="p-4">
                    <Carousel>
                        <template #item-0>
                            <div
                                class="w-full max-w-md rounded border border-border bg-card p-6 text-center"
                            >
                                <p class="text-lg font-semibold">Slide de texto</p>

                                <p class="mt-2">
                                    Qualquer HTML cabe no carousel, não só imagens. <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                                    temporibus doloribus quis cupiditate, eveniet illum molestiae?
                                    Ipsam commodi praesentium beatae ipsa quasi, ut odio voluptatum
                                    modi quis, impedit sit distinctio.
                                </p>
                            </div>
                        </template>

                        <template #item-1>
                            <div
                                class="flex w-full max-w-md flex-col items-center gap-3 rounded border border-border bg-card p-6"
                            >
                                <Badge
                                    label="Badge"
                                    variant="success"
                                />

                                <p>Mix de componentes no mesmo slide.</p>
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
    </article>
</template>

<script lang="ts">
import { defineComponent, type Component } from "vue";
import Carousel from "@design/components/Carousel.vue";
import Badge from "@design/components/Badge.vue";
import Button from "@design/components/Button.vue";
import Image from "@design/components/Image.vue";
import landscapeImage from "@/assets/images/landscape.jpg";
import portraitImage from "@/assets/images/portrait.jpg";
import squareImage from "@/assets/images/square_image.webp";

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
                { src: landscapeImage, alt: "Paisagem" },
                { src: portraitImage, alt: "Retrato" },
                { src: squareImage, alt: "Quadrada" }
            ],
            outsideCount: 0,
            stepsIndicator: true,
            indicatorSide: "top" as "top" | "bottom" | "left" | "right",
            showStepsBool: true
        };
    }
});
</script>
