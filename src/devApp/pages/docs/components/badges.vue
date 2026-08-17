<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Badge
            </h1>

            <p class="text-muted-foreground!">
                Rótulo compacto para status, categorias ou links.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2">
                        <Badge label="Primary" />
                        <Badge label="Secondary" variant="secondary" />
                        <Badge label="Destructive" variant="destructive" />
                        <Badge label="Warning" variant="warning" />
                        <Badge label="Info" variant="info" />
                        <Badge label="Success" variant="success" />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                Cores via <code>variant</code>.<br />
                <code>variant="primary / secondary / destructive / warning / info / success"</code>
            </p>
        </section>

        <section>
            <h3 class="mb-2">
                Tipo link
            </h3>

            <p>
                Com <code>type="link"</code> o badge navega. <code>external</code> abre em nova aba.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 flex flex-wrap gap-2">
                        <Badge label="Link external" variant="secondary" type="link" :external="true" link="https://google.com" />
                        <Badge label="Link internal" variant="secondary" type="link" link="/" />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Badge from "@design/components/Badge.vue";

export default defineComponent({
    name: "ComponentsBadges",

    components: {
        Card,
        Badge
    }
});
</script>
