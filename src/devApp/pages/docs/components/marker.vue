<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Marker</h1>

            <p>
                Rótulo de seção com ícone ou número à esquerda, ou linha divisória com texto/ícone
                no centro.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Marker">
                <div class="flex flex-col gap-3 p-4">
                    <Marker label="Marker" />
                    <Marker
                        left-icon="fa-home"
                        label="Com ícone à esquerda"
                    />
                    <Marker
                        :left-number="1"
                        label="Com número à esquerda"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Cor</h3>

            <p>
                <code>color="muted / foreground"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cor">
                <div class="flex flex-col gap-3 p-4">
                    <Marker
                        :left-number="1"
                        label="Muted"
                        color="muted"
                    />
                    <Marker
                        :left-number="1"
                        label="Foreground"
                        color="foreground"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Separator</h3>

            <p>
                <code>separator</code> desenha uma linha. Com <code>label</code> ou
                <code>centerIcon</code>, o conteúdo fica no meio, ou no início e no fim com
                <code>contentPosition</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Separator">
                <div class="flex flex-col gap-6 p-4">
                    <Marker separator />
                    <Marker
                        separator
                        label="Separator"
                    />
                    <Marker
                        separator
                        center-icon="fa-home"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Orientação</h3>

            <p>
                <code>orientation="horizontal / vertical"</code>. No vertical, defina uma altura no
                próprio elemento (por exemplo <code>class="h-32"</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Orientação">
                <div class="flex flex-wrap items-stretch gap-8 p-4">
                    <div class="flex min-w-48 flex-1 flex-col gap-4">
                        <p class="text-sm font-medium">Horizontal</p>

                        <Marker separator />
                        <Marker
                            separator
                            center-icon="fa-home"
                        />
                    </div>

                    <div class="flex h-48 gap-8">
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-sm font-medium">Vertical</p>

                            <Marker
                                separator
                                class="h-32"
                                orientation="vertical"
                            />
                        </div>

                        <div class="flex flex-col items-center gap-2">
                            <p class="text-sm font-medium">Com ícone</p>

                            <Marker
                                separator
                                center-icon="fa-home"
                                orientation="vertical"
                                class="h-32 w-fit"
                            />
                        </div>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Posição do conteúdo</h3>

            <p>
                <code>contentPosition="start / center / end"</code> define onde o
                <code>label</code> ou o <code>centerIcon</code> fica na linha do separator. O padrão é
                <code>center</code>. Em <code>start</code> e <code>end</code>, a linha do lado do
                conteúdo fica curta e a outra ocupa o resto. Vale para as duas orientações: no
                vertical, <code>start</code> é o topo e <code>end</code> é a base.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Posição do conteúdo">
                <div class="flex flex-wrap items-stretch gap-8 p-4">
                    <div class="flex min-w-48 flex-1 flex-col gap-6">
                        <Marker
                            separator
                            label="Início"
                            content-position="start"
                        />
                        <Marker
                            separator
                            label="Centro"
                        />
                        <Marker
                            separator
                            label="Fim"
                            content-position="end"
                        />
                    </div>

                    <div class="flex h-48 gap-8">
                        <Marker
                            separator
                            class="h-full"
                            center-icon="fa-arrow-up"
                            orientation="vertical"
                            content-position="start"
                        />
                        <Marker
                            separator
                            class="h-full"
                            center-icon="fa-home"
                            orientation="vertical"
                        />
                        <Marker
                            separator
                            class="h-full"
                            center-icon="fa-arrow-down"
                            orientation="vertical"
                            content-position="end"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Marker from "@design/components/Marker.vue";

export default defineComponent({
    name: "ComponentsMarker",

    components: {
        Marker
    }
});
</script>
