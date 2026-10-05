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

            <Table
                :headers="headers"
                :data="table.rows"
            />
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
