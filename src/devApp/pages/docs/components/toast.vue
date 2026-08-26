<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Toast
            </h1>

            <p>
                Notificações globais via plugin <code>$toast</code> (success, info, error, warning).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Toast">
                <div class="p-4 flex flex-wrap gap-2">
                    <Button variant="success" @click="() => $toast.success('Toast success')">
                        Success
                    </Button>

                    <Button variant="info" @click="() => $toast.info('Toast info')">
                        Info
                    </Button>

                    <Button variant="destructive" @click="() => $toast.error('Toast error')">
                        Error
                    </Button>

                    <Button variant="warning" @click="() => $toast.warning('Toast warning')">
                        Warning
                    </Button>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
// @ts-nocheck — $toast is provided by the toast plugin on the app instance.
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: "ComponentsToast",

    components: {
        Button
    }
});
</script>
