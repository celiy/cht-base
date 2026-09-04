<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Colors
            </h1>

            <p>
                Tokens CSS do tema, usados como <code>var(--color-&lt;nome&gt;)</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Colors">
                <div class="p-4 flex gap-6 flex-wrap">
                    <template v-for="token in tokens" :key="token.label">
                        <div>
                            <h3 class="text-sm font-semibold mb-2 text-muted-foreground">
                                {{ token.label }}
                            </h3>

                            <div class="flex gap-2 flex-wrap">
                                <div v-for="child in token.children" :key="child.color" class="w-24 h-24 flex flex-col items-center">
                                    <div
                                        class="border border-border rounded h-14 w-full"
                                        :style="{ backgroundColor: 'var(--color-' + child.color + ')' }"
                                    />

                                    <code 
                                        v-tooltip="'Clique para copiar'" 
                                        class="text-xs text-center select-none"
                                        @click="copy(child.color)"
                                    >
                                        {{ child.color }}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </DocsExample>
        </section>

        <section>
            <h1>
                System colors
            </h1>

            <p>
                Cores do sistema
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Colors">
                <div class="p-4 flex flex-col gap-6">
                    <div
                        v-for="color in colors"
                        :key="color.value"
                    >
                        <h3 class="text-sm font-semibold mb-2 text-muted-foreground">
                            {{ color.label }}
                        </h3>

                        <div class="grid grid-cols-10 w-full overflow-hidden rounded">
                            <div
                                v-for="value in colorValues"
                                :key="`${color.value}-${value}`"

                                v-tooltip="color.value + '-' + value"

                                class="min-w-0 h-24 cursor-pointer"
                                :style="shadeStyle(color.value, value)"

                                @click="copy(color.value + '-' + value)"
                            />
                        </div>
                    </div>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsColors",

    data() {
        return {
            tokens: [
                { label: "Background and foreground", children: [
                    { color: "background", label: "Background" },
                    { color: "foreground", label: "Foreground" },
                ]},

                { label: "Card", children: [
                    { color: "card", label: "Card" },
                    { color: "card-foreground", label: "Card Foreground" },
                ]},

                { label: "Popover", children: [
                    { color: "popover", label: "Popover" },
                    { color: "popover-foreground", label: "Popover Foreground" },
                ]},

                { label: "Primary", children: [
                    { color: "primary", label: "Primary" },
                    { color: "primary-foreground", label: "Primary Foreground" },
                ]},

                { label: "Secondary", children: [
                    { color: "secondary", label: "Secondary" },
                    { color: "secondary-foreground", label: "Secondary Foreground" },
                ]},

                { label: "Muted", children: [
                    { color: "muted", label: "Muted" },
                    { color: "muted-foreground", label: "Muted Foreground" },
                ]},

                { label: "Accent", children: [
                    { color: "accent", label: "Accent" },
                    { color: "accent-foreground", label: "Accent Foreground" },
                ]},

                { label: "Destructive", children: [
                    { color: "destructive", label: "Destructive" },
                    { color: "destructive-foreground", label: "Destructive Foreground" },
                ]},

                { label: "Success", children: [
                    { color: "success", label: "Success" },
                    { color: "success-foreground", label: "Success Foreground" },
                ]},

                { label: "Warning", children: [
                    { color: "warning", label: "Warning" },
                    { color: "warning-foreground", label: "Warning Foreground" },
                ]},

                { label: "Info", children: [
                    { color: "info", label: "Info" },
                    { color: "info-foreground", label: "Info Foreground" },
                ]},

                { label: "Border", children: [
                    { color: "border", label: "Border" },
                    { color: "input", label: "Input" },
                    { color: "ring", label: "Ring" },
                ]},

                { label: "Chart", children: [
                    { color: "chart-1", label: "Chart 1" },
                    { color: "chart-2", label: "Chart 2" },
                    { color: "chart-3", label: "Chart 3" },
                    { color: "chart-4", label: "Chart 4" },
                    { color: "chart-5", label: "Chart 5" },
                ]},

                { label: "Sidebar", children: [
                    { color: "sidebar", label: "Sidebar" },
                    { color: "sidebar-foreground", label: "Sidebar Foreground" },
                    { color: "sidebar-accent", label: "Sidebar Accent" },
                    { color: "sidebar-accent-foreground", label: "Sidebar Accent Foreground" },
                    { color: "sidebar-border", label: "Sidebar Border" },
                    { color: "sidebar-ring", label: "Sidebar Ring" },
                ]}
            ],

            colors: [
                { label: "Neutral", value: "neutral" },
                { label: "Stone", value: "stone" },
                { label: "Zinc", value: "zinc" },
                { label: "Slate", value: "slate" },
                { label: "Gray", value: "gray" },
                { label: "Mauve", value: "mauve" },
                { label: "Olive", value: "olive" },
                { label: "Mist", value: "mist" },
                { label: "Taupe", value: "taupe" },
                { label: "Red", value: "red" },
                { label: "Orange", value: "orange" },
                { label: "Amber", value: "amber" },
                { label: "Yellow", value: "yellow" },
                { label: "Lime", value: "lime" },
                { label: "Green", value: "green" },
                { label: "Emerald", value: "emerald" },
                { label: "Teal", value: "teal" },
                { label: "Cyan", value: "cyan" },
                { label: "Sky", value: "sky" },
                { label: "Blue", value: "blue" },
                { label: "Indigo", value: "indigo" },
                { label: "Violet", value: "violet" },
                { label: "Purple", value: "purple" },
                { label: "Fuchsia", value: "fuchsia" },
                { label: "Pink", value: "pink" },
                { label: "Rose", value: "rose" }
            ],

            colorValues: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
            customHue: {
                mauve: 310,
                olive: 125,
                mist: 230,
                taupe: 70
            } as Record<string, number>,
            shadeLightness: {
                50: 0.97,
                100: 0.93,
                200: 0.86,
                300: 0.77,
                400: 0.67,
                500: 0.57,
                600: 0.47,
                700: 0.39,
                800: 0.30,
                900: 0.22
            } as Record<number, number>
        };
    },

    methods: {
        /**
         * Background for a Tailwind (or custom) palette shade.
         * CSS variables are used so Tailwind does not need to see a full `bg-*` class.
         *
         * @param palette Palette name such as `"red"` or `"mauve"`
         * @param shade Scale step from 50 to 900
         * @returns Inline background style
         */
        shadeStyle(palette: string, shade: number): { backgroundColor: string } {
            const hue = this.customHue[palette];

            if (hue != null) {
                const lightness = this.shadeLightness[shade] ?? 0.5;

                return {
                    backgroundColor: `oklch(${lightness} 0.04 ${hue})`
                };
            }

            return {
                backgroundColor: `var(--color-${palette}-${shade})`
            };
        },

        copy(color: string) {
            navigator.clipboard.writeText(`${color}`);
            this.$toast.success(`Copiado para a área de transferência: ${color}`);
        }
    }
});
</script>
