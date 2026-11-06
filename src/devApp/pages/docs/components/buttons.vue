<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Button</h1>

            <p>
                Botão de ação com variantes de cor, tamanho e forma. <br />
                As variantes são <code>default</code>, <code>primary</code>, <code>secondary</code>,
                <code>success</code>, <code>info</code>, <code>warning</code>,
                <code>destructive</code>, <code>transparent</code>,
                <code>transparent-primary</code>, <code>transparent-secondary</code>,
                <code>transparent-success</code>, <code>transparent-info</code>,
                <code>transparent-warning</code>, <code>transparent-destructive</code>,
                <code>outline</code>, <code>outline-primary</code>, <code>outline-secondary</code>,
                <code>outline-success</code>, <code>outline-info</code>,
                <code>outline-warning</code>, <code>outline-destructive</code> e
                <code>bordered</code>, usadas em <code>variant</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Button">
                <div class="flex flex-col gap-6 py-4">
                    <div class="flex flex-wrap items-center gap-2 px-4">
                        <Button label="Default" />

                        <Button
                            label="Disabled Default"
                            disabled
                        />

                        <Button
                            label="Loading Default"
                            :loading="true"
                        />

                        <Button
                            label="Primary"
                            variant="primary"
                        />

                        <Button
                            label="Secondary"
                            variant="secondary"
                        />

                        <Button
                            label="Success"
                            variant="success"
                        />

                        <Button
                            label="Warning"
                            variant="warning"
                        />

                        <Button
                            label="Info"
                            variant="info"
                        />

                        <Button
                            label="Destructive"
                            variant="destructive"
                        />
                    </div>

                    <div class="flex flex-wrap items-center gap-2 px-4">
                        <Button
                            label="Transparent"
                            variant="transparent"
                        />

                        <Button
                            label="Transparent-Primary"
                            variant="transparent-primary"
                        />

                        <Button
                            label="Transparent-Secondary"
                            variant="transparent-secondary"
                        />

                        <Button
                            label="Transparent-Success"
                            variant="transparent-success"
                        />

                        <Button
                            label="Transparent-Warning"
                            variant="transparent-warning"
                        />

                        <Button
                            label="Transparent-Info"
                            variant="transparent-info"
                        />

                        <Button
                            label="Transparent-Destructive"
                            variant="transparent-destructive"
                        />
                    </div>

                    <div class="flex flex-wrap items-center gap-2 px-4">
                        <Button
                            label="Outline"
                            variant="outline"
                        />

                        <Button
                            label="Outline-Primary"
                            variant="outline-primary"
                        />

                        <Button
                            label="Outline-Secondary"
                            variant="outline-secondary"
                        />

                        <Button
                            label="Outline-Success"
                            variant="outline-success"
                        />

                        <Button
                            label="Outline-Warning"
                            variant="outline-warning"
                        />

                        <Button
                            label="Outline-Info"
                            variant="outline-info"
                        />

                        <Button
                            label="Outline-Destructive"
                            variant="outline-destructive"
                        />

                        <Button
                            label="Bordered"
                            variant="bordered"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanho</h3>

            <p>
                <code>size="small / medium / large"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button
                        label="Small"
                        size="small"
                        variant="secondary"
                    />
                    <Button
                        label="Medium"
                        size="medium"
                        variant="secondary"
                    />
                    <Button
                        label="Large"
                        size="large"
                        variant="secondary"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Ícones</h3>

            <p>Props <code>left-icon</code> e <code>right-icon</code> adicionam ícones ao botão.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Ícones">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button
                        label="Anterior"
                        variant="secondary"
                        left-icon="fa-solid fa-arrow-left"
                    />
                    <Button
                        label="Próximo"
                        variant="secondary"
                        right-icon="fa-solid fa-arrow-right"
                    />
                    <Button
                        label="Salvar"
                        variant="primary"
                        left-icon="fa-solid fa-floppy-disk"
                        right-icon="fa-solid fa-check"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Só ícone</h3>

            <p>
                Com <code>left-icon</code> ou <code>right-icon</code> e sem <code>label</code> nem
                slot, o padding fica igual nos quatro lados, então o botão fica quadrado:
                <code>p-1.5</code> no <code>small</code>, <code>p-2</code> no <code>medium</code> e
                <code>p-2.5</code> no <code>large</code>. Com texto, o padding horizontal continua
                maior que o vertical. Vale para <code>shape="square"</code>; o
                <code>rounded</code> já é um círculo. Como não há texto, passe um
                <code>aria-label</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Só ícone">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button
                        size="small"
                        variant="secondary"
                        left-icon="fa-solid fa-gear"
                        aria-label="Configurações"
                    />
                    <Button
                        size="medium"
                        variant="secondary"
                        left-icon="fa-solid fa-gear"
                        aria-label="Configurações"
                    />
                    <Button
                        size="large"
                        variant="secondary"
                        left-icon="fa-solid fa-gear"
                        aria-label="Configurações"
                    />
                    <Button
                        label="Com texto"
                        size="medium"
                        variant="secondary"
                        left-icon="fa-solid fa-gear"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Link</h3>

            <p>
                Com <code>href</code> o botão vira um <code>&lt;a&gt;</code> e navega para a URL,
                com o mesmo visual das variantes. <code>target</code> aceita
                <code>_self</code>, <code>_blank</code>, <code>_parent</code> e <code>_top</code>.
                Com <code>_blank</code>, o <code>rel="noopener noreferrer"</code> é adicionado
                sozinho. Com <code>disabled</code>, o link perde o <code>href</code> e fica com
                <code>aria-disabled</code>. <code>type</code> e <code>form</code> só valem sem
                <code>href</code>. O <code>href</code> faz a página recarregar. Para navegar entre
                rotas do app, use <code>@click</code> com <code>$router.push</code> e não passe
                <code>href</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Link">
                <div class="flex flex-wrap items-center gap-2 p-4">
                    <Button
                        label="Abrir em nova aba"
                        variant="primary"
                        right-icon="fa-solid fa-arrow-up-right-from-square"
                        href="https://github.com"
                        target="_blank"
                    />
                    <Button
                        label="Outline"
                        variant="outline-primary"
                        href="https://github.com"
                        target="_blank"
                    />
                    <Button
                        variant="transparent-primary"
                        left-icon="fa-solid fa-globe"
                        href="https://github.com"
                        target="_blank"
                        aria-label="Site"
                    />
                    <Button
                        label="Desativado"
                        variant="secondary"
                        href="https://github.com"
                        target="_blank"
                        disabled
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Forma</h3>

            <p>Prop <code>shape="rounded / square"</code> criam botões com formas diferentes.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Forma e grupo">
                <div class="flex flex-col gap-6 p-4">
                    <div class="flex gap-2">
                        <Button shape="rounded">
                            <span class="fa-solid fa-arrow-left" />
                        </Button>

                        <Button shape="square">
                            <span class="fa-solid fa-arrow-up" />
                        </Button>
                    </div>

                    <div class="flex flex-col gap-4">
                        <p>
                            O Button usa classes como <code>text-base, text-sm, text-xs</code>.
                            Então o mesmo usa padding com tamanhos não uniformes. Para ter
                            uniformidade:
                        </p>

                        <div class="flex flex-col gap-2">
                            <label>Com ícone sem classe</label>
                            <Button size="small">
                                <span class="fa-solid fa-arrow-up" />
                            </Button>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label>Com class="p-2"</label>
                            <Button
                                size="small"
                                class="p-2"
                            >
                                <span class="fa-solid fa-arrow-up" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Grupo</h3>

            <p>Classe <code>btn-group</code> une bordas.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Forma e grupo">
                <div class="flex flex-col gap-4 p-4">
                    <div class="btn-group">
                        <Button
                            label="Um"
                            variant="bordered"
                            :hover-effect="false"
                        />
                        <Button
                            label="Dois"
                            variant="bordered"
                            :hover-effect="false"
                        />
                        <Button
                            label="Três"
                            variant="bordered"
                            :hover-effect="false"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Customização</h3>

            <p>
                <code>background-style</code> muda a cor de fundo. <code>border-style</code> muda a
                cor da borda. <code>hover-style</code> muda o estilo do hover.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Customização">
                <div class="flex flex-col gap-4 p-4">
                    <div class="flex flex-col gap-2">
                        <label> background-style="bg-orange-700 text-white" </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-orange-700 text-white"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-red-700 text-white" <br />
                            border-style="border-2-yellow-500"
                        </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-red-700 text-white"
                            border-style="border-2-yellow-500"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label>
                            background-style="bg-blue-700 text-white" <br />
                            border-style="border-2-green-500" <br />
                            hover-style="hover:opacity-50"
                        </label>

                        <Button
                            label="Exemplo"
                            background-style="bg-blue-700 text-white"
                            border-style="border-4-green-500"
                            hover-style="hover:opacity-50"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label> radius-style="rounded-full p-2" </label>

                        <Button
                            label="Exemplo"
                            radius-style="rounded-full p-2"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: "ComponentsButtons",

    components: {
        Button
    }
});
</script>
