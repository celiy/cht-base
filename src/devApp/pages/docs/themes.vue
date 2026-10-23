<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Temas</h1>

            <p>
                Há três coisas separadas. O modo light ou dark, os estilos de superfície
                <code>simplicia</code> e <code>hodiernus</code> e o CSS extra carregado em runtime.
                O modo fica em <code>$project.style.activeTheme</code> e no atributo
                <code>data-theme</code> do <code>html</code>. A chave do
                <code>localStorage</code> vem de <code>VITE_THEME_STORAGE_KEY</code>.
            </p>
        </section>

        <section>
            <h3>Light e dark</h3>

            <p>
                <code>style.theme(name)</code>, ou <code>projectActions.setTheme</code>, aplica o
                tema no <code>document</code> e grava a escolha no <code>localStorage</code>.
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
                Estilos de superfície, sólido ou vidro, independentes do modo light ou dark. Veja
                <a href="/docs/custom-themes">simplicia e hodiernus</a>.
            </p>
        </section>

        <section>
            <h3>CSS extra em runtime</h3>

            <p>
                <code>style.loadCss(id, href)</code> adiciona um
                <code>&lt;link rel="stylesheet"&gt;</code>, e
                <code>style.unloadCss(id)</code> remove. O <code>href</code> pode vir de um import
                com <code>?url</code>, como <code>import arquivo from "./x.css?url"</code>, ou de
                qualquer CSS servido. Dois arquivos se somam quando os dois estão carregados. Para
                trocar um pelo outro, descarregue o primeiro antes. Isto não substitui o
                <a href="/docs/override-css">override.css</a>, que é estático e entra no boot.
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
                                allow-empty
                                :options="[{ label: 'underline.css', value: 'on' }]"
                            />

                            <Toggleable
                                v-model="trackingOn"
                                allow-empty
                                :options="[{ label: 'tracking.css', value: 'on' }]"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <small-muted>Exclusivos</small-muted>

                        <Toggleable
                            v-model="skin"
                            allow-empty
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
                O arquivo fica em <code>src/theme.config.json</code> do cliente, ou em
                <code>theme</code> dentro do <code>cht.config.json</code>. O plugin do Vite
                transforma esse arquivo em CSS pelo módulo <code>virtual:client-theme</code>.
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
