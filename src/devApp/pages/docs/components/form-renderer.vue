<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Form renderer
            </h1>

            <p>
                Monta um formulário a partir de seções e campos tipados: inputs, checkbox, radio e select. Campos podem ter <code>condition</code>, <code>required</code>, <code>disabled</code> e helper.
                Checkbox aceita <code>checkboxStyle: "switch"</code> — o interruptor e o texto compartilham o mesmo estado.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Form renderer">
                <div class="p-4">
                    <FormRenderer
                        :sections="sections"
                        submit-label="Enviar"
                        :section-columns="{ xs: 1, sm: 2, md: 2, lg: 2 }"
                        @submit="onSubmit"
                    >
                        <template #submit>
                            <Button
                                label="Enviar"
                                variant="primary"
                                type="submit"
                            />
                        </template>
                    </FormRenderer>

                    <pre
                        v-if="submitted"
                        class="mt-4 p-4 bg-muted/60 rounded text-xs overflow-auto"
                    >{{ submitted }}</pre>
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on FormRenderer.
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import FormRenderer from "@design/components/form/FormRenderer.vue";

export default defineComponent({
    name: "ComponentsFormRenderer",

    components: {
        Button,
        FormRenderer
    },

    data() {
        return {
            submitted: null,
            sections: [
                {
                    title: "Identidade",
                    fields: [
                        {
                            id: "name",
                            label: "Nome",
                            type: "text",
                            placeholder: "Nome completo",
                            required: true,
                            helperText: "Obrigatório"
                        },
                        {
                            id: "email",
                            label: "Email",
                            type: "email",
                            placeholder: "nome@exemplo.com",
                            required: true,
                            copiable: true
                        },
                        {
                            id: "password",
                            label: "Senha",
                            type: "password",
                            required: true,
                            minSize: 6
                        },
                        {
                            id: "age",
                            label: "Idade",
                            type: "number",
                            placeholder: "18"
                        },
                        {
                            id: "birth",
                            label: "Data de nascimento",
                            type: "date"
                        },
                        {
                            id: "nickname",
                            label: "Apelido (desabilitado)",
                            type: "text",
                            disabled: true,
                            value: "Não editável"
                        }
                    ]
                },
                {
                    title: "Contato",
                    fields: [
                        {
                            id: "phone",
                            label: "Celular",
                            type: "phone",
                            value: "51999329196"
                        },
                        {
                            id: "cep",
                            label: "CEP",
                            type: "cep",
                            value: "90000000"
                        },
                        {
                            id: "bio",
                            label: "Sobre você",
                            type: "textarea",
                            placeholder: "Texto longo"
                        }
                    ]
                },
                {
                    title: "Documentos",
                    fields: [
                        {
                            id: "is_pj",
                            label: "Pessoa jurídica",
                            type: "checkbox",
                            value: false,
                            description: "Marque para informar CNPJ em vez de CPF."
                        },
                        {
                            id: "cpf",
                            label: "CPF",
                            type: "cpf",
                            value: "52998224725",
                            condition: { field: "is_pj", value: true, operator: "neq" }
                        },
                        {
                            id: "cnpj",
                            label: "CNPJ",
                            type: "cnpj",
                            value: "04252011000110",
                            condition: { field: "is_pj", value: true }
                        }
                    ]
                },
                {
                    title: "Profissional",
                    fields: [
                        {
                            id: "role",
                            label: "Cargo",
                            type: "select",
                            value: "dev",
                            options: [
                                { label: "Desenvolvedor", value: "dev" },
                                { label: "Designer", value: "design" },
                                { label: "Gerente", value: "manager" },
                                { label: "Outro", value: "other" }
                            ]
                        },
                        {
                            id: "gender",
                            label: "Gênero",
                            type: "radio",
                            value: "male",
                            options: [
                                { label: "Masculino", value: "male" },
                                { label: "Feminino", value: "female" },
                                { label: "Outro", value: "other", description: "Prefiro não informar" }
                            ]
                        },
                        {
                            id: "work_mode",
                            label: "Modelo de trabalho",
                            type: "radio",
                            variant: "card",
                            value: "remote",
                            options: [
                                { label: "Remoto", value: "remote", description: "100% à distância" },
                                { label: "Híbrido", value: "hybrid", description: "Alguns dias no escritório" },
                                { label: "Presencial", value: "office" }
                            ]
                        }
                    ]
                },
                {
                    title: "Preferências",
                    fields: [
                        {
                            id: "newsletter",
                            label: "Receber novidades por email",
                            type: "checkbox",
                            value: true,
                            description: "Atualizações e avisos no email."
                        },
                        {
                            id: "push_notifications",
                            label: "Notificações no app",
                            type: "checkbox",
                            checkboxStyle: "switch",
                            value: false,
                            description: "Mesmo comportamento do checkbox, visual de interruptor."
                        },
                        {
                            id: "terms",
                            label: "Aceito os termos de uso",
                            type: "checkbox",
                            variant: "card",
                            required: true,
                            value: false,
                            description: "Obrigatório para enviar o formulário."
                        }
                    ]
                }
            ]
        };
    },

    methods: {
        onSubmit(payload) {
            this.submitted = payload;
        }
    }
});
</script>
