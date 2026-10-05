<template>
    <section
        v-if="tables.length > 0"

        class="container-sm mb-24 flex flex-col gap-4"
    >
        <h3>Props</h3>

        <div
            v-for="table in tables"
            :key="table.name"

            class="flex flex-col gap-2"
        >
            <h4 v-if="tables.length > 1">
                {{ table.name }}
            </h4>

            <div class="overflow-x-auto rounded border">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="bg-accent/30">
                            <th
                                v-for="head in headers"
                                :key="head.field"

                                class="p-2 font-semibold"
                                :class="{ 'text-center': head.position === 'center' }"
                            >
                                {{ head.label }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="row in table.rows"
                            :key="row.name"

                            class="border-t"
                        >
                            <td class="p-2 align-top">
                                <div>{{ row.name }}</div>

                                <div
                                    v-if="row.comment"

                                    class="text-xs text-muted-foreground"
                                >
                                    {{ row.comment }}
                                </div>
                            </td>

                            <td class="p-2 align-top">
                                {{ row.type }}
                            </td>

                            <td class="p-2 align-top">
                                {{ row.values }}
                            </td>

                            <td class="p-2 align-top">
                                {{ row.default }}
                            </td>

                            <td class="p-2 align-top text-center">
                                {{ row.required }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { docsPropsTablesForSlug } from "../ts/docsComponentCatalog";

const PROP_HEADERS = [
    { label: "Prop", field: "name", position: "start" as const },
    { label: "Tipo", field: "type", position: "start" as const },
    { label: "Valores", field: "values", position: "start" as const },
    { label: "Default", field: "default", position: "start" as const },
    { label: "Required", field: "required", position: "center" as const }
];

export default defineComponent({
    name: "DocsPropsTable",

    props: {
        /**
         * Docs route slug (`buttons`, `select`, …).
         */
        slug: {
            type: String,
            required: true
        }
    },

    computed: {
        /**
         * Gets the headers
         * @returns {unknown} The headers
         */
        headers() {
            return PROP_HEADERS;
        },

        /**
         * Gets the tables
         * @returns {unknown} The tables
         */
        tables() {
            return docsPropsTablesForSlug(this.slug);
        }
    }
});
</script>
