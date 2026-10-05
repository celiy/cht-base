<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Input</h1>

            <p>
                Campo de texto com máscaras, helper, variantes visuais e tipos (email, CPF, senha,
                textarea, etc.).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Input">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Input
                        id="docs-input-default"
                        type="text"
                        label="Default"
                        placeholder="Placeholder"
                        helper-text="Helper text"
                        :value="textValue"

                        @update:value="textValue = $event"
                    />

                    <p class="text-sm text-muted-foreground!">Value: {{ textValue }}</p>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Variações</h3>

            <p>
                <code>variant="secondary / transparent / display"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variações">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
            <h3>Tipos</h3>

            <p>
                Os dois últimos dígitos de <code>type="money"</code> são cêntimos:
                <code>1500000</code> → <code>$ 15,000.00</code>.
                <code
                    >type="text / number / money / email / phone / cpf / cnpj / cep / date /
                    password / textarea"</code
                >. Em textarea, <code>expandOnTyping</code> cresce com o texto;
                <code>minHeightPx</code> e <code>maxHeightPx</code> limitam a altura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipos">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Input
                        id="docs-input-number"
                        type="number"
                        label="Número"
                        :value="numericValue"
                        :helper-text="`Value: ${numericValue}`"

                        @update:value="numericValue = $event"
                    />

                    <Input
                        id="docs-input-money"
                        type="money"
                        label="Dinheiro"
                        placeholder="$ 5,000.00"
                        :value="moneyValue"
                        :helper-text="`Value: ${moneyValue}`"

                        @update:value="moneyValue = $event"
                    />

                    <Input
                        id="docs-input-email"
                        type="email"
                        label="Email"
                        :value="emailValue"
                        :helper-text="`Value: ${emailValue}`"

                        @update:value="emailValue = $event"
                    />

                    <Input
                        id="docs-input-phone"
                        type="phone"
                        label="Celular"
                        :value="phoneValue"
                        :helper-text="`Value: ${phoneValue}`"

                        @update:value="phoneValue = $event"
                    />

                    <Input
                        id="docs-input-cpf"
                        type="cpf"
                        label="CPF"
                        :value="cpfValue"
                        :helper-text="`Value: ${cpfValue}`"

                        @update:value="cpfValue = $event"
                    />

                    <Input
                        id="docs-input-cnpj"
                        type="cnpj"
                        label="CNPJ"
                        :value="cnpjValue"
                        :helper-text="`Value: ${cnpjValue}`"

                        @update:value="cnpjValue = $event"
                    />

                    <Input
                        id="docs-input-cep"
                        type="cep"
                        label="CEP"
                        :value="cepValue"
                        :helper-text="`Value: ${cepValue}`"

                        @update:value="cepValue = $event"
                    />

                    <Input
                        id="docs-input-date"
                        type="date"
                        label="Data"
                        :value="dateValue"
                        :helper-text="`Value: ${dateValue}`"

                        @update:value="dateValue = $event"
                    />

                    <Input
                        id="docs-input-password"
                        type="password"
                        label="Senha"
                        :value="passwordValue"
                        :helper-text="`Value: ${passwordValue}`"

                        @update:value="passwordValue = $event"
                    />

                    <Input
                        id="docs-input-textarea"
                        type="textarea"
                        label="Textarea"
                        :value="areaValue"
                        :helper-text="`Value: ${areaValue}`"

                        @update:value="areaValue = $event"
                    />

                    <Input
                        id="docs-input-textarea-expand"
                        type="textarea"
                        label="Expande ao escrever"
                        hide-resize
                        expand-on-typing
                        :min-height-px="72"
                        :max-height-px="160"
                        placeholder="Escreva várias linhas..."
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>OTP</h3>

            <code>InputOTP</code> agrupa campos, e pode ser configurado com as opções
            <code>inputsPattern</code> e <code>fields</code>.
            <ul>
                <li>
                    <code>inputsPattern</code> define os tipos aceitos em cada campo (ex:
                    <code>['text', 'number']</code>).
                </li>
                <li>
                    <code>fields</code> recebe um array de objetos descrevendo cada célula, podendo
                    ser:
                    <ul>
                        <li><code>{ type: 'input' }</code>: campo editável</li>
                        <li>
                            <code>{ type: 'colon' }</code>: adiciona um separador ":", que não
                            recebe foco
                        </li>
                        <li>
                            <code>{ type: 'dash' }</code>: adiciona um separador "-", que não recebe
                            foco
                        </li>
                        <li>
                            <code>{ type: 'input', pattern: '[0-9]' }</code>: campo editável com
                            validação personalizada
                        </li>
                    </ul>
                </li>
            </ul>
            <p>
                O foco avança automaticamente ao digitar; <kbd>Backspace</kbd> apaga e retorna ao
                campo anterior; colar texto distribui entre os campos a partir do foco. As
                propriedades <code>value</code> ou <code>v-model</code> permitem preencher e
                controlar os valores.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="OTP">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Button @click="() => copyCode('AB12')">Copiar código (AB12)</Button>

                    <InputOTP
                        label="Código"
                        helper-text="Digite ou cole o código"
                        :inputs-pattern="['text', 'number']"
                        :value="otpValue"
                        :fields="[
                            { type: 'input' },
                            { type: 'input' },
                            { type: 'input' },
                            { type: 'input' }
                        ]"

                        @update:value="otpValue = $event"
                    />

                    <span class="text-sm text-muted-foreground">Value: {{ otpValue }}</span>

                    <Button
                        class="mt-4"

                        @click="() => copyCode('1234')"
                        >Copiar código (1234)</Button
                    >

                    <InputOTP
                        label="Com separadores"
                        helper-text="colon e dash não recebem foco"
                        :inputs-pattern="['number']"
                        :fields="[
                            { type: 'input' },
                            { type: 'input' },
                            { type: 'colon' },
                            { type: 'input' },
                            { type: 'input' },
                            { type: 'dash' },
                            { type: 'input' }
                        ]"
                    />

                    <InputOTP
                        label="Com erro"
                        helper-text="Este campo é inválido"
                        error="Este campo é inválido"
                        :inputs-pattern="['number']"
                        :fields="[{ type: 'input' }, { type: 'input' }, { type: 'input' }]"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Slots</h3>

            <p><code>#prefix</code> para adicionar um prefixo ao input.</p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slots">
                <div class="flex max-w-sm flex-col gap-4 p-4">
                    <Input
                        id="docs-input-prefix"
                        type="text"
                        placeholder="Pesquisar..."
                    >
                        <template #prefix>
                            <span class="fa-solid fa-search mr-2 text-foreground/50"></span>
                        </template>
                    </Input>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Atalho kbd</h3>

            <p>
                <code>kbd</code> recebe teclas que focam o campo. Uma tecla foca na hora; várias
                teclas têm de ser pressionadas nessa ordem (fora de outro input).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="kbd">
                <div class="flex flex-col gap-4 p-4">
                    <Input
                        id="docs-input-kbd-one"
                        type="text"
                        label="Uma tecla"
                        placeholder="Pressione /"
                        helper-text="Atalho: /"
                        :kbd="[{ key: '/' }]"
                        :value="kbdSlashValue"

                        @update:value="kbdSlashValue = $event"
                    />

                    <Input
                        id="docs-input-kbd-seq"
                        type="text"
                        label="Sequência"
                        placeholder="Pressione Enter e depois Shift"
                        helper-text="Atalho: Enter + Shift"
                        :kbd="[{ key: 'enter' }, { key: 'shift' }]"
                        :value="kbdSeqValue"

                        @update:value="kbdSeqValue = $event"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estados e extras</h3>

            <p>
                <code>required</code>, <code>disabled</code>, <code>readonly</code>,
                <code>error</code>, <code>copiable</code>, <code>useMemo</code>,
                <code>minSize</code> / <code>maxSize</code>, <code>pattern</code>. Com
                <code>maxSize</code>, caracteres a mais são cortados ao digitar. Com
                <code>pattern</code>, só entra o que a regex aceita.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estados e extras">
                <div class="flex max-w-sm flex-col gap-4 p-4">
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
                        use-memo
                        helper-text="Persiste no localStorage pelo id"
                    />

                    <Input
                        id="docs-input-limits"
                        type="text"
                        label="minSize 3, maxSize 8"
                        helper-text="Tamanho limitado"
                        :min-size="3"
                        :max-size="8"
                        :value="limitedValue"

                        @update:value="limitedValue = $event"
                    />

                    <Input
                        id="docs-input-pattern"
                        type="text"
                        label="Só dígitos"
                        helper-text="pattern ^[0-9]*$"
                        pattern="^[0-9]*$"
                        :max-size="6"
                        :value="patternValue"

                        @update:value="patternValue = $event"
                    />
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@design/components/Input.vue";
import InputOTP from "@design/components/InputOTP.vue";

export default defineComponent({
    name: "ComponentsInputs",

    components: {
        Input,
        InputOTP
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
            limitedValue: "abc",
            patternValue: "",
            kbdSlashValue: "",
            kbdSeqValue: "",
            otpValue: "AB12"
        };
    },

    methods: {
        copyCode(code: string) {
            navigator.clipboard.writeText(code);
        }
    }
});
</script>
