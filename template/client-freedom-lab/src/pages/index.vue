<template>
    <main class="mx-auto max-w-3xl p-6">
        <h1 class="text-2xl font-semibold">
            {{ $project.labels.siteTitle }}
        </h1>

        <p class="mt-1 text-muted-foreground">
            Recursos que o cliente usa sem mudar o cht-base.
        </p>

        <p
            v-if="!results.length"
            class="mt-6"
            role="status"
        >
            Rodando verificações…
        </p>

        <ul
            v-else
            id="lab-checks"
            class="mt-6 flex flex-col gap-2"
        >
            <li
                v-for="result in results"
                :key="result.id"

                class="flex items-start gap-3 rounded border px-4 py-3"
                :id="`check-${result.id}`"
            >
                <i
                    class="fa-solid mt-1"
                    :class="result.ok ? 'fa-circle-check text-success' : 'fa-circle-xmark text-destructive'"
                    aria-hidden="true"
                />

                <div class="min-w-0">
                    <p class="font-medium">
                        {{ result.label }}
                        <span class="sr-only">{{ result.ok ? "ok" : "falhou" }}</span>
                    </p>

                    <p class="break-all text-sm text-muted-foreground">
                        {{ result.detail }}
                    </p>
                </div>
            </li>
        </ul>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { runLabChecks } from "../lab/checks";
import type { LabCheck } from "../lab/checks";

export default defineComponent({
    name: "IndexPage",

    data() {
        return {
            results: [] as LabCheck[],
            unmounted: false
        };
    },

    async mounted() {
        const results = await runLabChecks();

        if (!this.unmounted) {
            this.results = results;
        }
    },

    beforeUnmount() {
        this.unmounted = true;
    }
});
</script>
