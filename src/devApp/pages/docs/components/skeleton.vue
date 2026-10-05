<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Skeleton</h1>

            <p>
                Placeholder com pulse para conteúdo que ainda está carregando. Tipos
                <code>text</code>, <code>avatar</code> e <code>card</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Skeleton">
                <div class="flex flex-col gap-4 p-8">
                    <Skeleton type="avatar" />

                    <div class="flex flex-col gap-2">
                        <Skeleton type="text" />
                        <Skeleton type="text" />
                        <Skeleton type="text" />
                    </div>

                    <div class="flex gap-4">
                        <Skeleton
                            v-for="card in 3"
                            :key="card"

                            class="w-full"
                            type="card"
                            aspect-ratio="1"
                        />
                    </div>

                    <Skeleton
                        class="w-full"
                        type="card"
                        aspect-ratio="16/9"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tipo</h3>

            <p>
                <code>type="text / avatar / card"</code>. Largura e posição vêm das classes no root
                (<code>w-1/4</code>, <code>col-span-2</code>, etc.).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipo">
                <div class="flex flex-col gap-6 p-8">
                    <div class="flex flex-col gap-2">
                        <Skeleton type="text" />
                        <Skeleton
                            class="w-2/3"
                            type="text"
                        />
                    </div>

                    <Skeleton type="avatar" />

                    <Skeleton
                        class="w-full"
                        type="card"
                        aspect-ratio="16/9"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Card e aspect ratio</h3>

            <p>
                Em <code>type="card"</code>, <code>aspectRatio</code> aceita número ou string CSS
                (<code>1</code>, <code>16/9</code>). Sem ratio, use <code>class</code> com largura e
                altura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Card">
                <div class="flex flex-wrap items-end gap-4 p-8">
                    <Skeleton
                        class="h-24 w-24"
                        type="card"
                    />

                    <Skeleton
                        class="h-12 w-12"
                        type="card"
                    />

                    <Skeleton
                        class="h-8 w-8"
                        type="card"
                    />

                    <Skeleton
                        class="w-40"
                        type="card"
                        aspect-ratio="1"
                    />

                    <Skeleton
                        class="w-56"
                        type="card"
                        aspect-ratio="16/9"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Composição</h3>

            <p>Combina avatar, linhas de texto e grid para um layout de carregamento.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Composição">
                <div class="p-8">
                    <div class="flex items-center gap-2">
                        <Skeleton type="avatar" />

                        <div class="w-full">
                            <Skeleton
                                class="w-1/4"
                                type="text"
                            />

                            <Skeleton
                                class="mt-2 w-1/6"
                                type="text"
                            />
                        </div>

                        <Skeleton
                            type="card"
                            aspect-ratio="1"
                            class="w-12"
                        />
                        <Skeleton
                            type="card"
                            aspect-ratio="1"
                            class="w-12"
                        />
                        <Skeleton
                            type="card"
                            aspect-ratio="1"
                            class="w-12"
                        />
                    </div>

                    <div class="mt-4 flex flex-col gap-2">
                        <div class="grid grid-cols-3 gap-2">
                            <Skeleton type="text" />

                            <Skeleton
                                class="col-span-2"
                                type="text"
                            />
                        </div>

                        <div class="grid grid-cols-4 gap-2">
                            <Skeleton type="text" />

                            <Skeleton
                                class="col-span-2"
                                type="text"
                            />

                            <Skeleton type="text" />
                        </div>

                        <Skeleton
                            class="w-2/3"
                            type="text"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Skeleton from "@design/components/Skeleton.vue";

export default defineComponent({
    name: "ComponentsSkeleton",

    components: {
        Skeleton
    }
});
</script>
