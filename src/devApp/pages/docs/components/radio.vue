<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Radio
            </h1>

            <p class="text-muted-foreground!">
                Escolha exclusiva dentro de um grupo com o mesmo <code>name</code>.
                O valor selecionado é o <code>v-model</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Radio">
                <div class="p-4 flex flex-col gap-2">
                    <Radio v-model="selected" label="Opção A" value="opt-a" name="docs-radio" id="docs-ra-1" description="Com descrição" />
                    <Radio v-model="selected" label="Opção B em card" value="opt-b" name="docs-radio" id="docs-ra-2" variant="card" />
                    <Radio v-model="selected" label="Opção C" value="opt-c" name="docs-radio" id="docs-ra-3" />

                    <p class="text-sm text-muted-foreground mt-2">
                        Selecionado: {{ selected }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Variações
            </h3>

            <p>
                <code>variant="normal / card"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4 grid gap-6 sm:grid-cols-2">
                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Normal
                        </p>

                        <Radio v-model="variantNormal" label="Diário" value="daily" name="docs-radio-normal" id="docs-ra-n-1" />
                        <Radio v-model="variantNormal" label="Semanal" value="weekly" name="docs-radio-normal" id="docs-ra-n-2" />
                        <Radio v-model="variantNormal" label="Mensal" value="monthly" name="docs-radio-normal" id="docs-ra-n-3" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Card
                        </p>

                        <Radio
                            v-model="variantCard"
                            label="Básico"
                            value="basic"
                            name="docs-radio-card"
                            id="docs-ra-c-1"
                            variant="card"
                            description="Plano inicial."
                        />

                        <Radio
                            v-model="variantCard"
                            label="Pro"
                            value="pro"
                            name="docs-radio-card"
                            id="docs-ra-c-2"
                            variant="card"
                            description="Mais recursos."
                        />

                        <Radio
                            v-model="variantCard"
                            label="Empresa"
                            value="enterprise"
                            name="docs-radio-card"
                            id="docs-ra-c-3"
                            variant="card"
                            description="Para times grandes."
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Descrição
            </h3>

            <p>
                <code>description</code> aparece abaixo do label.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Descrição">
                <div class="p-4 flex flex-col gap-2 max-w-md">
                    <Radio
                        v-model="withDescription"
                        label="E-mail"
                        value="email"
                        name="docs-radio-desc"
                        id="docs-ra-d-1"
                        description="Avisos e resumos no seu e-mail."
                    />

                    <Radio
                        v-model="withDescription"
                        label="Push"
                        value="push"
                        name="docs-radio-desc"
                        id="docs-ra-d-2"
                        description="Notificações no dispositivo."
                    />

                    <Radio
                        v-model="withDescription"
                        label="Nenhum"
                        value="none"
                        name="docs-radio-desc"
                        id="docs-ra-d-3"
                        description="Sem notificações."
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Desabilitado
            </h3>

            <p>
                <code>disabled</code> bloqueia a seleção. O grupo continua com o mesmo <code>name</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Desabilitado">
                <div class="p-4 flex flex-col gap-2">
                    <Radio v-model="disabledGroup" label="Disponível" value="open" name="docs-radio-dis" id="docs-ra-dis-1" />
                    <Radio v-model="disabledGroup" label="Desabilitado" value="blocked" name="docs-radio-dis" id="docs-ra-dis-2" :disabled="true" />
                    <Radio
                        v-model="disabledGroup"
                        label="Card desabilitado"
                        value="blocked-card"
                        name="docs-radio-dis"
                        id="docs-ra-dis-3"
                        variant="card"
                        description="Não pode ser escolhido."
                        :disabled="true"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3 class="mb-2">
                Grupos independentes
            </h3>

            <p>
                Cada grupo usa um <code>name</code> e um <code>v-model</code> próprios.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Grupos independentes">
                <div class="p-4 grid gap-6 sm:grid-cols-2">
                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Tema
                        </p>

                        <Radio v-model="theme" label="Claro" value="light" name="docs-radio-theme" id="docs-ra-t-1" />
                        <Radio v-model="theme" label="Escuro" value="dark" name="docs-radio-theme" id="docs-ra-t-2" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Idioma
                        </p>

                        <Radio v-model="locale" label="Português" value="pt" name="docs-radio-locale" id="docs-ra-l-1" />
                        <Radio v-model="locale" label="Inglês" value="en" name="docs-radio-locale" id="docs-ra-l-2" />
                    </div>

                    <p class="text-sm text-muted-foreground sm:col-span-2">
                        Tema: {{ theme }} · Idioma: {{ locale }}
                    </p>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Radio from "@design/components/Radio.vue";

export default defineComponent({
    name: "ComponentsRadio",

    components: {
        Radio
    },

    data() {
        return {
            selected: "opt-a",
            variantNormal: "weekly",
            variantCard: "pro",
            withDescription: "email",
            disabledGroup: "open",
            theme: "light",
            locale: "pt"
        };
    }
});
</script>
