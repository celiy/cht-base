<template>
    <div
        v-if="readiness"

        class="container-sm mt-4 md:mt-8"
    >
        <Item
            type="alert"
            :variant="readiness.variant"
            :icon="readiness.icon"
            :label="readiness.label"
            :description="readiness.description"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getComponentReadiness } from "../ts/componentReadiness";

export default defineComponent({
    name: "DocsComponentStatus",

    props: {
        slug: {
            type: String,
            required: true
        }
    },

    computed: {
        readiness() {
            return getComponentReadiness(this.slug);
        }
    }
});
</script>
