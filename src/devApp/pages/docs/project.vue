<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>$project</h1>

            <p>
                Estado global reativo instalado pelo <code>projectPlugin</code> em
                <code>cht-base/src/project.ts</code>. Em qualquer SFC, usa
                <code>this.$project</code> (Options API) ou importa <code>project</code> /
                <code>projectActions</code> no script. Os tipos estão em
                <code>ProjectState</code> no mesmo ficheiro.
            </p>
        </section>

        <DocsMarkdown
            bare
            :source="codeSource"
        />

        <section>
            <h3>device</h3>

            <p>
                Atualizado no <code>resize</code> da janela. <code>isMobile</code> é
                <code>true</code> quando <code>viewportWidth &lt;= mobileBreakpointPx</code> (768
                por defeito). Usa para textos curtos, layouts ou abrir modais em mobile.
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
                        <code>isMobile</code>:
                        <strong>{{ $project.device.isMobile ? "sim" : "não" }}</strong>
                        (breakpoint {{ $project.device.mobileBreakpointPx }}px)
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>style</h3>

            <p>
                <code>activeTheme</code> e <code>availableThemes</code> vêm de
                <code>VITE_DEFAULT_THEME</code> / <code>VITE_AVAILABLE_THEMES</code>.
                <code>style.theme(name)</code> (ou <code>projectActions.setTheme</code>) aplica o
                tema no <code>document</code> e persiste em <code>localStorage</code>.
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

        <section>
            <h3>url.query e url.params</h3>

            <p>
                Snapshots reativos ligados ao <code>vue-router</code> em
                <code>initProjectRouter</code>. <code>query</code> espelha a querystring
                (<code>?a=b</code>); <code>params</code> espelha os parâmetros da rota (ex.:
                <code>/item/:id</code> → <code>params.id</code>). Não confundir query com params.
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
                <code>true</code> entre <code>beforeEach</code> e <code>afterEach</code> quando o
                path da rota muda e o chunk lazy ainda não carregou. O layout de docs usa isto para
                a barra e o overlay de carregamento. Em desenvolvimento, <code>?slow=1</code> na
                rota de destino atrasa 2s para testar o estado.
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
                <code>labels.siteTitle</code> é definido no boot a partir de
                <code>VITE_SITE_TITLE</code>. <code>user.name</code> é preenchido pela app após
                login (<code>projectActions.setUserName</code>). <code>version.current</code> e
                <code>version.checkUrl</code> vêm do build; no Electron o updater pode atualizar
                <code>version.current</code>.
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
                Fora do Electron, <code>electron.isElectron</code> é <code>false</code> e
                <code>backendReady</code> costuma ser <code>true</code> quando não há backend
                embutido. No desktop, <code>hasBackend</code>, <code>backendStatus</code> e
                <code>backendMessage</code> acompanham o processo local; <code>update</code> espelha
                o auto-update (<code>projectActions.checkForUpdates</code>, etc.).
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
<p v-if="$project.device.isMobile">Layout compacto</p>
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
        }
    }
});
</script>
