<template>
    <article class="container-sm docs-article">
        <section>
            <h1>$project</h1>

            <p>
                Estado global reativo, instalado pelo <code>projectPlugin</code> em <code>cht-base/src/project.ts</code>. Nos componentes, use <code>this.$project</code>. Fora deles, importe <code>project</code> ou <code>projectActions</code>. Os tipos ficam em <code>ProjectState</code>.
            </p>
        </section>

        <DocsMarkdown
            bare
            :source="codeSource"
        />

        <section>
            <h3>device</h3>

            <p>
                Atualizado no <code>resize</code> da janela. <code>isPhone</code> vale até <code>mobileBreakpointPx</code>. <code>isTablet</code> vale na faixa seguinte, até <code>tabletBreakpointPx</code>. <code>isMobile</code> é phone ou tablet. Acima disso, os três são <code>false</code>. <code>performanceScore</code> começa em <code>null</code> e recebe um número depois de um teste curto no arranque, de uns 100 a 150 ms, feito em fatias para não travar a interface. A escala aproximada é: abaixo de 300 fraco, de 300 a 700 intermediário, de 700 a 1200 bom e acima de 1200 muito rápido. O valor fica em cache na sessão. A lógica está em <code>getDevicePerformanceScore</code>, em <code>cht-base/src/js/utils/devicePerformanceScore.ts</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Viewport">
                <div class="flex flex-col gap-2 p-4 text-sm">
                    <p>
                        <code>viewportWidth</code>:
                        <strong>{{ $project.device.viewportWidth }}</strong>
                        px
                    </p>

                    <p>
                        <code>viewportHeight</code>:
                        <strong>{{ $project.device.viewportHeight }}</strong>
                        px
                    </p>

                    <p>
                        <code>isPhone</code>:
                        <strong>{{ $project.device.isPhone ? "sim" : "não" }}</strong>
                        (≤ {{ $project.device.mobileBreakpointPx }}px)
                    </p>

                    <p>
                        <code>isTablet</code>:
                        <strong>{{ $project.device.isTablet ? "sim" : "não" }}</strong>
                        (depois do phone, até {{ $project.device.tabletBreakpointPx }}px)
                    </p>

                    <p>
                        <code>isMobile</code>:
                        <strong>{{ $project.device.isMobile ? "sim" : "não" }}</strong>
                        (phone ou tablet)
                    </p>

                    <p>
                        <code>performanceScore</code>:
                        <strong>{{ performanceScoreLabel }}</strong>
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>style</h3>

            <p>
                <code>activeTheme</code> e <code>availableThemes</code> vêm de <code>VITE_DEFAULT_THEME</code> e <code>VITE_AVAILABLE_THEMES</code>. <code>$project.style.theme(name)</code>, ou <code>projectActions.setTheme</code>, aplica o tema e grava no <code>localStorage</code>. <code>setCustomTheme</code> troca entre <code>simplicia</code> e <code>hodiernus</code>, veja <a href="/docs/custom-themes">simplicia e hodiernus</a>. <code>loadCss</code> e <code>unloadCss</code> cuidam do CSS extra, veja <a href="/docs/themes">Temas</a>. <code>revealHighlight</code> liga o efeito de borda da classe <a href="/docs/styling">reveal-highlight</a>. Ele não é salvo, e só pinta quando <code>customTheme</code> é <code>hodiernus</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tema">
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
                            projectActions.setTheme(
                                $project.style.activeTheme === 'dark' ? 'light' : 'dark'
                            )
                        "
                    />
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="Reveal highlight">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <p class="text-sm">
                        <code>style.revealHighlight</code>:
                        <strong>{{ $project.style.revealHighlight ? "ligado" : "desligado" }}</strong>
                    </p>

                    <Button
                        variant="secondary"
                        :label="$project.style.revealHighlight ? 'Desligar' : 'Ligar'"

                        @click="$project.style.revealHighlight = !$project.style.revealHighlight"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>url.query e url.params</h3>

            <p>
                <code>query</code> espelha a querystring, então <code>?a=b</code> vira <code>query.a</code>. <code>params</code> espelha os parâmetros da rota, então <code>/item/:id</code> vira <code>params.id</code>. Os dois são reativos e vêm do <code>vue-router</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="URL atual">
                <div class="flex flex-col gap-3 p-4 text-sm">
                    <p>
                        <code>url.query</code>:
                        <code class="text-foreground">{{ queryLabel }}</code>
                    </p>

                    <p>
                        <code>url.params</code>:
                        <code class="text-foreground">{{ paramsLabel }}</code>
                    </p>

                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            label="?demo=1"

                            @click="$router.push({ path: '/docs/project', query: { demo: '1' } })"
                        />

                        <Button
                            variant="outline"
                            label="Limpar query"

                            @click="$router.push({ path: '/docs/project' })"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>route.isLoading</h3>

            <p>
                Fica <code>true</code> entre o <code>beforeEach</code> e o <code>afterEach</code> quando a rota muda e o chunk lazy ainda não carregou. O layout de docs usa isso na barra de carregamento. Em desenvolvimento, <code>?slow=1</code> na rota de destino atrasa dois segundos, para testar o estado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Navegação lenta">
                <div class="p-4">
                    <Button
                        variant="secondary"
                        label="Ir para Usage com slow=1"

                        @click="$router.push({ path: '/docs/usage', query: { slow: '1' } })"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>labels, user e version</h3>

            <p>
                <code>labels.siteTitle</code> vem de <code>VITE_SITE_TITLE</code> no boot. <code>user.name</code> é preenchido pela app depois do login, com <code>projectActions.setUserName</code>. <code>version.current</code> e <code>version.checkUrl</code> vêm do build. No Electron, o atualizador pode trocar <code>version.current</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Utilizador (demo)">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <p class="text-sm">
                        <code>user.name</code>:
                        <code>{{ $project.user.name ?? "null" }}</code>
                    </p>

                    <Button
                        variant="outline"
                        label="Definir 'Docs'"

                        @click="projectActions.setUserName('Docs')"
                    />

                    <Button
                        variant="outline"
                        label="Limpar"

                        @click="projectActions.setUserName(null)"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>electron e update</h3>

            <p>
                Fora do Electron, <code>electron.isElectron</code> é <code>false</code>. No desktop, <code>hasBackend</code>, <code>backendStatus</code> e <code>backendMessage</code> acompanham o processo local. <code>update</code> espelha o atualizador automático, controlado por <code>projectActions.checkForUpdates</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Runtime">
                <div class="flex flex-col gap-2 p-4 text-sm">
                    <p>
                        <code>electron.isElectron</code>:
                        {{ $project.electron.isElectron }}
                    </p>

                    <p>
                        <code>electron.hasBackend</code>:
                        {{ $project.electron.hasBackend }}
                        · <code>backendReady</code>:
                        {{ $project.electron.backendReady }}
                        · <code>backendStatus</code>:
                        <code>{{ $project.electron.backendStatus }}</code>
                    </p>

                    <p>
                        <code>update.supported</code>:
                        {{ $project.update.supported }}
                        · <code>update.status</code>:
                        <code>{{ $project.update.status }}</code>
                    </p>

                    <p>
                        <code>version.current</code>:
                        <code>{{ $project.version.current }}</code>
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>projectActions</h3>

            <p>
                Ações imperativas no mesmo módulo:
                <code>init</code> (chamado pelo plugin), <code>setSiteTitle</code>,
                <code>setUserName</code>, <code>refreshDevice</code>, <code>setTheme</code> e, no
                Electron, <code>checkForUpdates</code>, <code>downloadUpdate</code>,
                <code>installUpdate</code>.
            </p>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import { projectActions } from "@base/project";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

const CODE_SOURCE = `## Como usar

No template (Options API):

\`\`\`vue
<p>{{ $project.labels.siteTitle }}</p>
<p v-if="$project.device.isPhone">Layout compacto</p>
<p v-else-if="$project.device.isTablet">Layout tablet</p>
<p v-if="$project.device.performanceScore != null">
  Score: {{ $project.device.performanceScore }}
</p>
\`\`\`

No script:

\`\`\`ts
import { project, projectActions } from "@base/project";

projectActions.setTheme("dark");
projectActions.setUserName(user.nome);

if (project.electron.isElectron) {
    void projectActions.checkForUpdates();
}
\`\`\`

O plugin é instalado em \`cht-base/src/main.ts\`:

\`\`\`ts
app.use(projectPlugin, { router });
projectActions.setSiteTitle(import.meta.env.VITE_SITE_TITLE);
\`\`\`
`;

export default defineComponent({
    name: "DocsProject",

    components: {
        Button,
        DocsMarkdown
    },

    data() {
        return {
            projectActions,
            codeSource: CODE_SOURCE
        };
    },

    computed: {
        queryLabel(): string {
            const entries = Object.entries(this.$project.url.query);

            if (entries.length === 0) {
                return "{}";
            }

            return JSON.stringify(this.$project.url.query);
        },

        paramsLabel(): string {
            const entries = Object.entries(this.$project.url.params);

            if (entries.length === 0) {
                return "{}";
            }

            return JSON.stringify(this.$project.url.params);
        },

        performanceScoreLabel(): string {
            const score = this.$project.device.performanceScore;

            if (score === null) {
                return "a medir…";
            }

            return String(score);
        }
    }
});
</script>
