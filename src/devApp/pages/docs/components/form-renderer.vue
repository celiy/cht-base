<template>
    <article class="container-sm mt-4 flex flex-col gap-4 md:mt-8">
        <section>
            <h1>Form renderer</h1>

            <p>
                Monta um formulário a partir de seções e campos tipados: inputs, checkbox, radio,
                select, toggle e toggleable. Campos podem ter <code>condition</code>,
                <code>required</code>, <code>disabled</code> e helper. Checkbox aceita
                <code>checkboxStyle: "switch"</code> — o interruptor e o texto compartilham o mesmo
                estado.
                <code>type: "toggle"</code> usa o componente <code>Toggle</code> (booleano).
                <code>type: "toggleable"</code> usa <code>Toggleable</code> com
                <code>options</code> (<code>label</code> + <code>value</code>).
                Em campos <code>type: "select"</code>, o slot
                <code>#select-inside-empty-panel="{ field }"</code> repassa o conteúdo para o
                <code>#inside-empty-panel</code> do <code>Select</code> daquele campo.
                O renderer expõe <code>closeSelect(fieldId)</code> para fechar o painel após uma ação
                no slot (o <code>ItemViewEdit</code> do Mecarvit repassa o mesmo método).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Form renderer">
                <div class="p-4">
                    <FormRenderer
                        :sections="[
                            {
                                title: 'Identidade',

                                fields: [
                                    {
                                        id: 'name',
                                        label: 'Nome',
                                        type: 'text',
                                        placeholder: 'Nome completo',
                                        required: true,
                                        helperText: 'Obrigatório'
                                    },
                                    {
                                        id: 'email',
                                        label: 'Email',
                                        type: 'email',
                                        placeholder: 'nome@exemplo.com',
                                        required: true,
                                        copiable: true
                                    },
                                    {
                                        id: 'password',
                                        label: 'Senha',
                                        type: 'password',
                                        required: true,
                                        minSize: 6
                                    },
                                    {
                                        id: 'age',
                                        label: 'Idade',
                                        type: 'number',
                                        placeholder: '18'
                                    },
                                    {
                                        id: 'birth',
                                        label: 'Data de nascimento',
                                        type: 'date'
                                    },
                                    {
                                        id: 'nickname',
                                        label: 'Apelido (desabilitado)',
                                        type: 'text',
                                        disabled: true,
                                        value: 'Não editável'
                                    }
                                ]
                            },
                            {
                                title: 'Contato',

                                fields: [
                                    {
                                        id: 'phone',
                                        label: 'Celular',
                                        type: 'phone',
                                        value: '51999329196'
                                    },
                                    {
                                        id: 'cep',
                                        label: 'CEP',
                                        type: 'cep',
                                        value: '90000000'
                                    },
                                    {
                                        id: 'bio',
                                        label: 'Sobre você',
                                        type: 'textarea',
                                        placeholder: 'Texto longo'
                                    }
                                ]
                            },
                            {
                                title: 'Documentos',

                                fields: [
                                    {
                                        id: 'is_pj',
                                        label: 'Pessoa jurídica',
                                        type: 'checkbox',
                                        value: false,
                                        description: 'Marque para informar CNPJ em vez de CPF.'
                                    },
                                    {
                                        id: 'cpf',
                                        label: 'CPF',
                                        type: 'cpf',
                                        value: '52998224725',
                                        condition: { field: 'is_pj', value: true, operator: 'neq' }
                                    },
                                    {
                                        id: 'cnpj',
                                        label: 'CNPJ',
                                        type: 'cnpj',
                                        value: '04252011000110',
                                        condition: { field: 'is_pj', value: true }
                                    }
                                ]
                            },
                            {
                                title: 'Profissional',

                                fields: [
                                    {
                                        id: 'role',
                                        label: 'Cargo',
                                        type: 'select',
                                        value: 'dev',
                                        options: [
                                            { label: 'Desenvolvedor', value: 'dev' },
                                            { label: 'Designer', value: 'design' },
                                            { label: 'Gerente', value: 'manager' },
                                            { label: 'Outro', value: 'other' }
                                        ]
                                    },
                                    {
                                        id: 'gender',
                                        label: 'Gênero',
                                        type: 'radio',
                                        value: 'male',
                                        options: [
                                            { label: 'Masculino', value: 'male' },
                                            { label: 'Feminino', value: 'female' },
                                            {
                                                label: 'Outro',
                                                value: 'other',
                                                description: 'Prefiro não informar'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'work_mode',
                                        label: 'Modelo de trabalho',
                                        type: 'radio',
                                        variant: 'card',
                                        value: 'remote',
                                        options: [
                                            {
                                                label: 'Remoto',
                                                value: 'remote',
                                                description: '100% à distância'
                                            },
                                            {
                                                label: 'Híbrido',
                                                value: 'hybrid',
                                                description: 'Alguns dias no escritório'
                                            },
                                            { label: 'Presencial', value: 'office' }
                                        ]
                                    },
                                    {
                                        id: 'highlight',
                                        label: 'Destacar perfil',
                                        type: 'toggle',
                                        variant: 'primary',
                                        value: false
                                    },
                                    {
                                        id: 'priority',
                                        label: 'Prioridade',
                                        type: 'toggleable',
                                        variant: 'warning',
                                        value: 'medium',
                                        options: [
                                            { label: 'Baixa', value: 'low' },
                                            { label: 'Média', value: 'medium' },
                                            { label: 'Alta', value: 'high' }
                                        ]
                                    }
                                ]
                            },
                            {
                                title: 'Preferências',

                                fields: [
                                    {
                                        id: 'newsletter',
                                        label: 'Receber novidades por email',
                                        type: 'checkbox',
                                        value: true,
                                        description: 'Atualizações e avisos no email.'
                                    },
                                    {
                                        id: 'push_notifications',
                                        label: 'Notificações no app',
                                        type: 'checkbox',
                                        checkboxStyle: 'switch',
                                        value: false,
                                        description:
                                            'Mesmo comportamento do checkbox, visual de interruptor.'
                                    },
                                    {
                                        id: 'terms',
                                        label: 'Aceito os termos de uso',
                                        type: 'checkbox',
                                        variant: 'card',
                                        required: true,
                                        value: false,
                                        description: 'Obrigatório para enviar o formulário.'
                                    }
                                ]
                            }
                        ]"
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

                        class="mt-4 overflow-auto rounded bg-muted/60 p-4 text-xs"
                        >{{ submitted }}</pre>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Select com painel vazio</h3>

            <p>
                Quando <code>field.options</code> está vazio (ou a pesquisa não retorna itens), o
                slot <code>#select-inside-empty-panel</code> recebe o <code>field</code> do select
                correspondente. Útil para “cadastrar o primeiro item” sem sair do formulário.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Select inside empty panel">
                <div class="p-4 max-w-sm">
                    <FormRenderer
                        ref="emptyPanelForm"
                        :fields="emptyPanelFields"
                        :values="emptyPanelValues"

                        @submit="onEmptyPanelSubmit"
                        @click:select-action="onEmptyPanelSelectAction"
                    >
                        <template #select-inside-empty-panel="{ field }">
                            <Button
                                v-if="field.id === 'tags'"

                                type="button"
                                variant="outline"
                                size="small"
                                left-icon="fa-plus"
                                label="Cadastrar tag"

                                @click="onEmptyPanelCadastrar(field.id)"
                            />
                        </template>
                    </FormRenderer>
                </div>
            </DocsExample>
        </section>
    </article>
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
            emptyPanelValues: {
                tags: [] as string[]
            },
            emptyPanelFields: [
                {
                    id: "tags",
                    label: "Tags",
                    type: "select",
                    placeholder: "Selecione as tags",
                    options: [],
                    selectMultiple: { min: 0 },
                    selectSeparateSelected: true,
                    selectSearch: { external: false },
                    selectAction: {
                        icon: "fa-plus",
                        side: "right",
                        tooltip: "Cadastrar tag"
                    }
                }
            ]
        };
    },

    methods: {
        onSubmit(payload) {
            this.submitted = payload;
        },

        emptyPanelFormRef() {
            return this.$refs.emptyPanelForm as { closeSelect?: (fieldId: string) => void } | undefined;
        },

        onEmptyPanelCadastrar(fieldId: string) {
            this.emptyPanelFormRef()?.closeSelect?.(fieldId);
            this.$toast.success(`Slot select-inside-empty-panel (${fieldId})`);
        },

        onEmptyPanelSelectAction(payload: { id: string }) {
            if (payload.id === "tags") {
                this.onEmptyPanelCadastrar(payload.id);
            }
        },

        onEmptyPanelSubmit() {
            // Demo: submit não usado neste exemplo.
        }
    }
});
</script>
