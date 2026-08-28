<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Input
            </h1>

            <p>
                Campo de texto com máscaras, helper, variantes visuais e tipos (email, CPF, senha, textarea, etc.).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Input">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Input
                        id="docs-input-default"
                        type="text"
                        label="Default"
                        placeholder="Placeholder"
                        helper-text="Helper text"

                        :value="textValue"

                        @update:value="textValue = $event"
                    />

                    <p class="text-sm text-muted-foreground!">
                        Value: {{ textValue }}
                    </p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Variações
            </h3>

            <p>
                <code>variant="secondary / transparent / display"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Input
                        id="docs-input-secondary"
                        type="text"
                        label="Secondary"
                        variant="secondary"
                        value="Padrão do formulário"
                    />

                    <Input
                        id="docs-input-transparent"
                        type="text"
                        label="Transparent"
                        variant="transparent"
                        placeholder="Sem fundo de input"
                    />

                    <Input
                        id="docs-input-display"
                        type="text"
                        label="Display"
                        variant="display"
                        value="Celi Herstal"
                    />

                    <Input
                        id="docs-input-display-copy"
                        type="email"
                        label="Display copiável"
                        variant="display"
                        copiable
                        value="sasbrazilian@gmail.com"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tipos
            </h3>

            <p>
                Os dois últimos dígitos de <code>type="money"</code> são cêntimos: <code>1500000</code> → <code>$ 15,000.00</code>.
                <code>type="text / number / money / email / phone / cpf / cnpj / cep / date / password / textarea"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Input
                        id="docs-input-number"
                        type="number"
                        label="Número"

                        :value="numericValue"
                        :helperText="`Value: ${numericValue}`"

                        @update:value="numericValue = $event"
                    />

                    <Input
                        id="docs-input-money"
                        type="money"
                        label="Dinheiro"
                        placeholder="$ 5,000.00"

                        :value="moneyValue"
                        :helperText="`Value: ${moneyValue}`"

                        @update:value="moneyValue = $event"
                    />

                    <Input
                        id="docs-input-email"
                        type="email"
                        label="Email"

                        :value="emailValue"
                        :helperText="`Value: ${emailValue}`"

                        @update:value="emailValue = $event"
                    />

                    <Input
                        id="docs-input-phone"
                        type="phone"
                        label="Celular"

                        :value="phoneValue"
                        :helperText="`Value: ${phoneValue}`"

                        @update:value="phoneValue = $event"
                    />

                    <Input
                        id="docs-input-cpf"
                        type="cpf"
                        label="CPF"

                        :value="cpfValue"
                        :helperText="`Value: ${cpfValue}`"

                        @update:value="cpfValue = $event"
                    />

                    <Input
                        id="docs-input-cnpj"
                        type="cnpj"
                        label="CNPJ"

                        :value="cnpjValue"
                        :helperText="`Value: ${cnpjValue}`"

                        @update:value="cnpjValue = $event"
                    />

                    <Input
                        id="docs-input-cep"
                        type="cep"
                        label="CEP"

                        :value="cepValue"
                        :helperText="`Value: ${cepValue}`"

                        @update:value="cepValue = $event"
                    />

                    <Input
                        id="docs-input-date"
                        type="date"
                        label="Data"

                        :value="dateValue"
                        :helperText="`Value: ${dateValue}`"

                        @update:value="dateValue = $event"
                    />

                    <Input
                        id="docs-input-password"
                        type="password"
                        label="Senha"

                        :value="passwordValue"
                        :helperText="`Value: ${passwordValue}`"

                        @update:value="passwordValue = $event"
                    />

                    <Input
                        id="docs-input-textarea"
                        type="textarea"
                        label="Textarea"

                        :value="areaValue"
                        :helperText="`Value: ${areaValue}`"

                        @update:value="areaValue = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Estados e extras
            </h3>

            <p>
                <code>required</code>, <code>disabled</code>, <code>readonly</code>, <code>error</code>,
                <code>copiable</code>, <code>useMemo</code>, <code>minSize</code> / <code>maxSize</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados e extras">
                <div class="p-4 flex flex-col gap-4 max-w-sm">
                    <Input
                        id="docs-input-required"
                        type="text"
                        label="Obrigatório"
                        required
                        placeholder="Não pode ficar vazio"
                    />

                    <Input
                        id="docs-input-disabled"
                        type="text"
                        label="Desabilitado"
                        disabled
                        value="Não editável"
                    />

                    <Input
                        id="docs-input-readonly"
                        type="text"
                        label="Somente leitura"
                        readonly
                        value="Valor fixo"
                    />

                    <Input
                        id="docs-input-error"
                        type="text"
                        label="Com erro"
                        error="Este campo é inválido"
                        value="abc"
                    />

                    <Input
                        id="docs-input-copiable"
                        type="text"
                        label="Copiável"
                        copiable

                        :value="copiableValue"

                        @update:value="copiableValue = $event"
                    />

                    <Input
                        id="docs-input-memo"
                        type="text"
                        label="Com useMemo"
                        useMemo
                        helper-text="Persiste no localStorage pelo id"
                    />

                    <Input
                        id="docs-input-limits"
                        type="text"
                        label="minSize 3, maxSize 8"
                        helper-text="Tamanho limitado"

                        :minSize="3"
                        :maxSize="8"
                        :value="limitedValue"

                        @update:value="limitedValue = $event"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@design/components/Input.vue";

export default defineComponent({
    name: "ComponentsInputs",

    components: {
        Input
    },

    data() {
        return {
            textValue: "",
            numericValue: "",
            moneyValue: "",
            emailValue: "",
            phoneValue: "51999329196",
            cpfValue: "52998224725",
            cnpjValue: "04252011000110",
            cepValue: "90000000",
            dateValue: "",
            passwordValue: "",
            areaValue: "",
            copiableValue: "Texto para copiar",
            limitedValue: "abc"
        };
    }
});
</script>
