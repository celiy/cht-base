<template>
    <div class="p-8">
        <FormRenderer
            :sections="sections"
            submitLabel="Cadastrar"
            :sectionColumns="{ xs: 1, sm: 2, md: 3, lg: 3 }"
            @submit="onSubmit"
        >
            <template #submit>
                <Button
                    label="Cadastrar"
                    variant="primary"
                    type="submit"
                />
            </template>
        </FormRenderer>

        <pre v-if="submittedData" class="mt-6 p-4 bg-card border border-border rounded-lg text-sm text-foreground overflow-auto">{{ submittedData }}</pre>
    </div>
</template>

<script lang="ts">
// @ts-nocheck — vue-tsc excessive stack depth on `components` with FormRenderer + Button.
import { defineComponent } from "vue";
import FormRenderer from "@design/components/form/FormRenderer.vue";
import Button from "@design/components/Button.vue";

export default defineComponent({
    name: 'DevForm',

    components: {
        FormRenderer,
        Button
    },

    data() {
        return {
            submittedData: null as any,

            sections: [
                {
                    title: 'Informações Pessoais',
                    fields: [
                        {
                            id: 'name',
                            label: 'Nome',
                            type: 'text' as const,
                            placeholder: 'Digite seu nome',
                            value: 'Celi',
                            required: true,
                        },
                        {
                            id: 'email',
                            label: 'Email',
                            type: 'email' as const,
                            placeholder: 'Digite seu email',
                            value: 'celi@example.com',
                            required: true,
                        },
                        {
                            id: 'phone',
                            label: 'Celular',
                            type: 'phone' as const,
                            value: '51999329196',
                        },
                        {
                            id: 'gender',
                            label: 'Gênero',
                            type: 'radio' as const,
                            value: 'male',
                            options: [
                                { label: 'Masculino', value: 'male' },
                                { label: 'Feminino', value: 'female' },
                                { label: 'Outro', value: 'other' }
                            ]
                        },
                        {
                            id: 'bio',
                            label: 'Sobre você',
                            type: 'textarea' as const,
                            placeholder: 'Conte um pouco sobre você...',
                            value: 'Olá! Sou a Celi.',
                        },
                    ],
                },
                {
                    title: 'Documentos',
                    fields: [
                        {
                            id: 'cpf',
                            label: 'CPF',
                            type: 'cpf' as const,
                            value: '52998224725',
                            condition: { field: 'is_pj', value: true, operator: 'neq' as const }
                        },
                        {
                            id: 'cnpj',
                            label: 'CNPJ',
                            type: 'cnpj' as const,
                            value: '04252011000110',
                            condition: { field: 'is_pj', value: true }
                        },
                        {
                            id: 'is_pj',
                            label: 'Pessoa Jurídica',
                            type: 'checkbox' as const,
                            value: false,
                            description: 'Marque se você é pessoa jurídica.'
                        },
                    ],
                },
                {
                    title: 'Endereço',
                    fields: [
                        {
                            id: 'cep',
                            label: 'CEP',
                            type: 'cep' as const,
                            value: '90000000',
                        },
                    ],
                },
                {
                    title: 'Profissional',
                    fields: [
                        {
                            id: 'role',
                            label: 'Cargo',
                            type: 'select' as const,
                            value: 'dev',
                            options: [
                                { label: 'Desenvolvedor', value: 'dev' },
                                { label: 'Designer', value: 'design' },
                                { label: 'Gerente', value: 'manager' }
                            ]
                        },
                    ],
                },
                {
                    title: 'Preferências',
                    fields: [
                        {
                            id: 'newsletter',
                            label: 'Receber novidades por email',
                            type: 'checkbox' as const,
                            value: true,
                            description: 'Você receberá atualizações e promoções no seu email.'
                        },
                        {
                            id: 'push_notifications',
                            label: 'Notificações no app (switch)',
                            type: 'checkbox' as const,
                            checkboxStyle: 'switch' as const,
                            value: false,
                            description: 'Mesmo comportamento do checkbox; apenas o visual é um interruptor.'
                        },
                        {
                            id: 'terms',
                            label: 'Aceito os termos de uso',
                            type: 'checkbox' as const,
                            required: true,
                            variant: 'card',
                            value: true,
                            description: 'Ao marcar esta opção, você concorda com nossos termos e condições de uso.'
                        },
                    ],
                },
            ]
        }
    },

    methods: {
        onSubmit(formValues: any) {
            this.submittedData = formValues;
            console.log('Form submitted:', formValues);
        }
    }
});
</script>
