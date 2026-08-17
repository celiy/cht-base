<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Popover
            </h1>

            <p class="text-muted-foreground!">
                Painel flutuante com conteúdo livre. Pode abrir no clique ou no hover.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-4">
                        <Popover header="Popover">
                            Conteúdo no clique.
                        </Popover>

                        <Popover header="Hover" openOnHover>
                            Conteúdo no hover.
                        </Popover>
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Slot de botão
            </h3>

            <p>
                Use <code>#button</code> para substituir o gatilho padrão.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Popover from "@design/components/Popover.vue";

export default defineComponent({
    name: "ComponentsPopover",

    components: {
        Card,
        Popover
    }
});
</script>
