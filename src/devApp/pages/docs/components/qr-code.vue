<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                QR code
            </h1>

            <p>
                Gera um código QR a partir de um link (ou qualquer texto em
                <code>value</code>). O fundo branco mantém contraste para leitura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="QR code">
                <div class="p-4 flex flex-col gap-4">
                    <QrCode :value="link" />

                    <Input
                        v-model="link"
                        label="Link"
                        type="text"
                        placeholder="https://"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tamanho
            </h3>

            <p>
                <code>size</code> em pixels. O SVG escala com o valor.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="p-4 flex flex-wrap items-end gap-4">
                    <QrCode
                        value="https://example.com"
                        :size="96"
                    />

                    <QrCode
                        value="https://example.com"
                        :size="144"
                    />

                    <QrCode
                        value="https://example.com"
                        :size="192"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Correção de erros
            </h3>

            <p>
                <code>level="L / M / Q / H"</code>. Níveis mais altos resistem melhor
                a oclusão, com QR mais denso.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Correção de erros">
                <div class="p-4 flex flex-wrap items-end gap-4">
                    <QrCode
                        value="https://example.com"
                        level="L"
                        :size="128"
                    />

                    <QrCode
                        value="https://example.com"
                        level="H"
                        :size="128"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ComponentsQrCode",

    data() {
        return {
            link: "https://example.com"
        };
    }
});
</script>
