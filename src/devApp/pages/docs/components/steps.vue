<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Steps
            </h1>

            <p>
                Sequência numerada com <code>Marker</code>. Cada passo é um par de slots
                <code>#step-title-0</code> / <code>#step-0</code>,
                <code>#step-title-1</code> / <code>#step-1</code>, …
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Steps">
                <div class="p-4">
                    <Steps>
                        <template #step-title-0>
                            Lorem ipsum dolor sit amet consectetur
                        </template>
                        <template #step-0>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Alias commodi iure dicta sit quidem! Ducimus porro nesciunt eveniet.
                            </p>
                        </template>

                        <template #step-title-1>
                            Segundo passo
                        </template>
                        <template #step-1>
                            <p>
                                Nobis optio sequi, laborum voluptatum repellat quod ad totam.
                                Eum, nobis adipisci.
                            </p>
                        </template>
                        
                        <template #step-title-2>
                            Lorem ipsum dolor sit amet consectetur
                        </template>
                    </Steps>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Steps from "@design/components/custom/Steps.vue";

export default defineComponent({
    name: "ComponentsSteps",

    components: {
        Steps
    }
});
</script>
