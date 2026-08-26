<template>
    <Tabs variant="secondary">
        <template #tab-title-0>
            {{ label }}
        </template>

        <template #tab-content-0>
            <div class="border border-border rounded-lg">
                <slot />
            </div>
        </template>

        <template #tab-title-1>
            Code
        </template>

        <template #tab-content-1>
            <div class="relative border border-border rounded-lg">
                <Button
                    class="absolute top-2 right-2 z-20"
                    variant="outline"
                    size="small"

                    @click="copySource"
                >
                    <i :class="copied ? 'fa-solid fa-check' : 'fa-solid fa-copy'" />
                </Button>

                <DocsCode
                    class="block"
                    :code="source"
                    :language="language"
                />
            </div>
        </template>
    </Tabs>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on Tabs + Button.
import { defineComponent } from "vue";
import Tabs from "@design/components/Tabs.vue";
import Button from "@design/components/Button.vue";
import DocsCode from "./DocsCode.vue";

export default defineComponent({
    name: "DocsExample",

    components: {
        Tabs,
        Button,
        DocsCode
    },

    props: {
        /**
         * Title of the preview tab.
         */
        label: {
            type: String,
            default: "Exemplo"
        },

        /**
         * Markup shown on the Code tab. Filled by the Vite plugin from the slot.
         */
        source: {
            type: String,
            default: ""
        },

        /**
         * Syntax language for the Code tab (`vue`, `js`, `ts`, `html`, `css`, `json`, `bash`).
         */
        language: {
            type: String,
            default: "vue"
        }
    },

    data() {
        return {
            copied: false,
            copiedTimer: null as number | null
        };
    },

    beforeUnmount() {
        if (this.copiedTimer) {
            clearTimeout(this.copiedTimer);
        }
    },

    methods: {
        /**
         * Copies the example source to the clipboard.
         */
        async copySource() {
            if (!this.source) {
                return;
            }

            await navigator.clipboard.writeText(this.source);
            this.$toast.success("Código copiado");
            this.copied = true;

            if (this.copiedTimer) {
                clearTimeout(this.copiedTimer);
            }

            this.copiedTimer = window.setTimeout(() => {
                this.copied = false;
                this.copiedTimer = null;
            }, 1500);
        }
    }
});
</script>
