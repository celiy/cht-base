<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Temas</h1>

            <p>
                Light/dark fica em <code>$project.style.activeTheme</code> e em
                <code>document.documentElement.dataset.theme</code>, persistido com
                <code>VITE_THEME_STORAGE_KEY</code>. À parte disso há
                <strong>temas de superfície</strong> (<code>simplicia</code> /
                <code>hodiernus</code>) e CSS extra carregado em runtime.
            </p>
        </section>

        <section>
            <h3>Light e dark</h3>

            <p>
                <code>style.theme(name)</code> (ou <code>projectActions.setTheme</code>) aplica o
                tema no <code>document</code> e grava no <code>localStorage</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Light / dark">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <p class="text-sm">
                        Tema ativo: <code>{{ $project.style.activeTheme }}</code>
                    </p>

                    <Button
                        variant="secondary"
                        :label="
                            $project.style.activeTheme === 'dark'
                                ? 'Mudar para light'
                                : 'Mudar para dark'
                        "

                        @click="
                            $project.style.theme(
                                $project.style.activeTheme === 'dark' ? 'light' : 'dark'
                            )
                        "
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>simplicia e hodiernus</h3>

            <p>
                Estilos de superfície (sólido vs vidro), à parte de light/dark. Comparação, classes
                e como aplicar:
                <a href="/docs/custom-themes">simplicia e hodiernus</a>.
            </p>
        </section>

        <section>
            <h3>CSS extra em runtime</h3>

            <p>
                <code>style.loadCss(id, href)</code> injeta um
                <code>&lt;link rel="stylesheet"&gt;</code>. <code>style.unloadCss(id)</code> tira-o.
                O <code>href</code> pode ser um URL do Vite (<code
                    >import ficheiro from "./x.css?url"</code
                >) ou qualquer CSS servido. Dois ficheiros combinam se os carregar os dois; para
                exclusivos, descarrega um antes de ligar o outro. Isto não substitui o
                <a href="/docs/override-css">override.css</a> do cliente (esse é estático no boot).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Quatro extras (2+2)">
                <div class="flex flex-col gap-4 p-4">
                    <div
                        id="cht-css-demo-target"
                        class="rounded border bg-card p-4"
                    >
                        <h5>Alvo do CSS extra</h5>
                        <p>
                            Dois estilos
                            <a href="#cht-css-demo-target">somam-se</a>
                            (sublinhado + tracking). Os outros dois são peles mutuamente exclusivas.
                        </p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <small-muted>Combináveis</small-muted>

                        <div class="flex flex-wrap gap-2">
                            <Toggleable
                                v-model="underlineOn"

                                :options="[{ label: 'underline.css', value: 'on' }]"
                            />

                            <Toggleable
                                v-model="trackingOn"

                                :options="[{ label: 'tracking.css', value: 'on' }]"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <small-muted>Exclusivos</small-muted>

                        <Toggleable
                            v-model="skin"

                            :options="[
                                { label: 'skin-info.css', value: 'info' },
                                { label: 'skin-destructive.css', value: 'destructive' },
                                { label: 'Nenhum', value: 'none' }
                            ]"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>theme.config.json</h3>

            <p>
                Fica em <code>cht-client-&lt;nome&gt;/src/theme.config.json</code> (ou
                <code>theme</code> no <code>cht.config.json</code>). O plugin de Vite gera o CSS
                (<code>virtual:client-theme</code>).
            </p>
        </section>

        <DocsMarkdown
            bare
            :source="configSource"
        />
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Toggleable from "@design/components/Toggleable.vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import extraUnderlineUrl from "../../css/extra-underline.css?url";
import extraTrackingUrl from "../../css/extra-tracking.css?url";
import extraSkinInfoUrl from "../../css/extra-skin-info.css?url";
import extraSkinDestructiveUrl from "../../css/extra-skin-destructive.css?url";

const CONFIG_SOURCE = `\`\`\`json
{
    "default": "dark",
    "radius": "xl",
    "themes": {
        "dark": {
            "colors": {
                "primary": "oklch(0.7 0.15 250)"
            }
        }
    }
}
\`\`\`

| Campo | Efeito |
| --- | --- |
| \`default\` | Tema inicial se não houver valor no \`localStorage\` |
| \`radius\` | Raio global (ex. \`xl\`) |
| \`themes.light/dark.colors\` | Sobrescreve tokens (primary, background, …) |

Cores em Tailwind usam classes **completas** (\`bg-primary\`, não \`bg-\${cor}\`) para o JIT as gerar.

\`\`\`ts
import { project } from "@base/project";

project.style.setCustomTheme("hodiernus");
project.style.loadCss("marca", new URL("./marca.css", import.meta.url).href);
project.style.unloadCss("marca");
\`\`\`
`;

export default defineComponent({
    name: "DocsThemes",

    components: {
        Button,
        Toggleable,
        DocsMarkdown
    },

    data() {
        return {
            extraUnderlineUrl,
            extraTrackingUrl,
            extraSkinInfoUrl,
            extraSkinDestructiveUrl,
            underlineOn: null as string | null,
            trackingOn: null as string | null,
            skin: null as string | null,
            configSource: CONFIG_SOURCE
        };
    },

    watch: {
        underlineOn(value: string | null) {
            this.syncCombinable("underline", this.extraUnderlineUrl, value === "on");
        },

        trackingOn(value: string | null) {
            this.syncCombinable("tracking", this.extraTrackingUrl, value === "on");
        },

        skin(value: string | null) {
            this.setExclusiveSkin(value === "info" || value === "destructive" ? value : null);
        }
    },

    beforeUnmount() {
        this.$project.style.unloadCss("underline");
        this.$project.style.unloadCss("tracking");
        this.$project.style.unloadCss("skin-info");
        this.$project.style.unloadCss("skin-destructive");
    },

    methods: {
        syncCombinable(id: "underline" | "tracking", href: string, on: boolean) {
            if (on) {
                this.$project.style.loadCss(id, href);
            } else {
                this.$project.style.unloadCss(id);
            }
        },

        setExclusiveSkin(next: null | "info" | "destructive") {
            this.$project.style.unloadCss("skin-info");
            this.$project.style.unloadCss("skin-destructive");

            if (next === "info") {
                this.$project.style.loadCss("skin-info", this.extraSkinInfoUrl);
            } else if (next === "destructive") {
                this.$project.style.loadCss("skin-destructive", this.extraSkinDestructiveUrl);
            }
        }
    }
});
</script>
