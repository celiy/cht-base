<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Radio
            </h1>

            <p>
                Escolha exclusiva dentro de um grupo com o mesmo <code>name</code>.
                O valor selecionado é o <code>v-model</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Radio">
                <div class="p-4 flex flex-col gap-2">
                    <Radio id="docs-ra-1" v-model="selected" label="Opção A" value="opt-a" name="docs-radio" description="Com descrição" />
                    <Radio id="docs-ra-2" v-model="selected" label="Opção B em card" value="opt-b" name="docs-radio" variant="card" />
                    <Radio id="docs-ra-3" v-model="selected" label="Opção C" value="opt-c" name="docs-radio" />

                    <p class="text-sm text-muted-foreground mt-2">
                        Selecionado: {{ selected }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
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

                        <Radio id="docs-ra-n-1" v-model="variantNormal" label="Diário" value="daily" name="docs-radio-normal" />
                        <Radio id="docs-ra-n-2" v-model="variantNormal" label="Semanal" value="weekly" name="docs-radio-normal" />
                        <Radio id="docs-ra-n-3" v-model="variantNormal" label="Mensal" value="monthly" name="docs-radio-normal" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Card
                        </p>

                        <Radio
                            id="docs-ra-c-1"
                            v-model="variantCard"
                            label="Básico"
                            value="basic"
                            name="docs-radio-card"
                            variant="card"
                            description="Plano inicial."
                        />

                        <Radio
                            id="docs-ra-c-2"
                            v-model="variantCard"
                            label="Pro"
                            value="pro"
                            name="docs-radio-card"
                            variant="card"
                            description="Mais recursos."
                        />

                        <Radio
                            id="docs-ra-c-3"
                            v-model="variantCard"
                            label="Empresa"
                            value="enterprise"
                            name="docs-radio-card"
                            variant="card"
                            description="Para times grandes."
                        />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
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
                        id="docs-ra-d-1"
                        v-model="withDescription"
                        label="E-mail"
                        value="email"
                        name="docs-radio-desc"
                        description="Avisos e resumos no seu e-mail."
                    />

                    <Radio
                        id="docs-ra-d-2"
                        v-model="withDescription"
                        label="Push"
                        value="push"
                        name="docs-radio-desc"
                        description="Notificações no dispositivo."
                    />

                    <Radio
                        id="docs-ra-d-3"
                        v-model="withDescription"
                        label="Nenhum"
                        value="none"
                        name="docs-radio-desc"
                        description="Sem notificações."
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Desabilitado
            </h3>

            <p>
                <code>disabled</code> bloqueia a seleção. O grupo continua com o mesmo <code>name</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Desabilitado">
                <div class="p-4 flex flex-col gap-2">
                    <Radio id="docs-ra-dis-1" v-model="disabledGroup" label="Disponível" value="open" name="docs-radio-dis" />
                    <Radio id="docs-ra-dis-2" v-model="disabledGroup" label="Desabilitado" value="blocked" name="docs-radio-dis" :disabled="true" />
                    <Radio
                        id="docs-ra-dis-3"
                        v-model="disabledGroup"
                        label="Card desabilitado"
                        value="blocked-card"
                        name="docs-radio-dis"
                        variant="card"
                        description="Não pode ser escolhido."
                        :disabled="true"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
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

                        <Radio id="docs-ra-t-1" v-model="theme" label="Claro" value="light" name="docs-radio-theme" />
                        <Radio id="docs-ra-t-2" v-model="theme" label="Escuro" value="dark" name="docs-radio-theme" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-sm font-medium">
                            Idioma
                        </p>

                        <Radio id="docs-ra-l-1" v-model="locale" label="Português" value="pt" name="docs-radio-locale" />
                        <Radio id="docs-ra-l-2" v-model="locale" label="Inglês" value="en" name="docs-radio-locale" />
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
