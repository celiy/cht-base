<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Sidebar
            </h1>

            <p class="text-muted-foreground!">
                Navegação lateral com seções, links e grupos. Atalho <code>s</code> abre e fecha (fora de inputs).
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <p class="p-4 text-muted-foreground!">
                        Esta página já está dentro de uma Sidebar (a da wiki). O layout de laboratório e o de cada cliente usam o mesmo componente com <code>nav-items</code> diferentes.
                    </p>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Props
            </h3>

            <p>
                <code>title</code>, <code>description</code>, <code>sidebarWidth</code>,
                <code>navItems</code> com <code>type: "section" | "link" | "group"</code>.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";

export default defineComponent({
    name: "ComponentsSidebar",

    components: {
        Card
    }
});
</script>
