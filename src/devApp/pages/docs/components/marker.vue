<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Marker
            </h1>

            <p>
                Rótulo de seção com ícone ou número à esquerda, ou linha divisória com texto/ícone no centro.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Marker">
                <div class="p-4 flex flex-col gap-3">
                    <Marker label="Marker" />
                    <Marker left-icon="fa-home" label="Com ícone à esquerda" />
                    <Marker :left-number="1" label="Com número à esquerda" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Cor
            </h3>

            <p>
                <code>color="muted / foreground"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Cor">
                <div class="p-4 flex flex-col gap-3">
                    <Marker :left-number="1" label="Muted" color="muted" />
                    <Marker :left-number="1" label="Foreground" color="foreground" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Separator
            </h3>

            <p>
                <code>separator</code> desenha uma linha. Com <code>label</code> ou <code>centerIcon</code>, o conteúdo fica no meio.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Separator">
                <div class="p-4 flex flex-col gap-6">
                    <Marker separator />
                    <Marker separator label="Separator" />
                    <Marker separator center-icon="fa-home" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Orientação
            </h3>

            <p>
                <code>orientation="horizontal / vertical"</code>.
                No vertical, defina uma altura no próprio elemento (por exemplo <code>class="h-32"</code>).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Orientação">
                <div class="p-4 flex flex-wrap items-stretch gap-8">
                    <div class="flex-1 min-w-48 flex flex-col gap-4">
                        <p class="text-sm font-medium">
                            Horizontal
                        </p>

                        <Marker separator />
                        <Marker separator center-icon="fa-home" />
                    </div>

                    <div class="flex gap-8 h-48">
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-sm font-medium">
                                Vertical
                            </p>

                            <Marker separator class="h-32" orientation="vertical" />
                        </div>

                        <div class="flex flex-col items-center gap-2">
                            <p class="text-sm font-medium">
                                Com ícone
                            </p>

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
    </main>
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
