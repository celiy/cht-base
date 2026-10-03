<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Keybind</h1>

            <p>
                Listener de teclado sem markup (<code>render</code> devolve <code>null</code>).
                Importa de <code>@design/components/internal/Keybind.vue</code> não está no glob do
                plugin. <code>keyName</code> é o <code>event.key</code> (<code>s</code>,
                <code>Escape</code>, …). Letras ignoram maiúsculas e não disparam com Ctrl, Alt ou
                Meta. <code>trigger</code> recebe o <code>KeyboardEvent</code> e chama
                <code>preventDefault</code>.
            </p>
        </section>

        <section>
            <h3>Atalho</h3>

            <p>
                Com <code>ignoreWhenTyping</code> (default <code>true</code>), o atalho não corre
                com foco em input, textarea, select ou contenteditable.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Atalho S">
                <div class="flex flex-col gap-3 p-4">
                    <Keybind
                        key-name="d"

                        @trigger="onSave"
                    />

                    <p class="text-sm text-muted-foreground">
                        Pressione <code>d</code> fora do campo. Último disparo:
                        <code class="text-foreground">{{ lastTrigger }}</code>
                    </p>

                    <Input
                        id="keybind-typing"
                        v-model="draft"
                        label="Campo de teste"
                        type="text"
                        placeholder="Escreve S aqui — o atalho não deve disparar"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Habilitado/Desabilitado</h3>

            <p>
                Com <code>enabled</code> a <code>false</code> o listener continua registado mas não
                emite.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="enabled">
                <div class="flex flex-col gap-3 p-4">
                    <Keybind
                        key-name="Escape"
                        :enabled="escapeEnabled"
                        :ignore-when-typing="false"

                        @trigger="onEscape"
                    />

                    <Button
                        :label="escapeEnabled ? 'Escape ativo' : 'Escape inativo'"
                        variant="secondary"

                        @click="escapeEnabled = !escapeEnabled"
                    />

                    <p class="text-sm text-muted-foreground">
                        Escape:
                        <code class="text-foreground">{{ escapeCount }}</code>
                    </p>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@design/components/Button.vue";
import Input from "@design/components/Input.vue";
import Keybind from "@design/components/internal/Keybind.vue";

export default defineComponent({
    name: "ComponentsKeybind",

    components: {
        Button,
        Input,
        Keybind
    },

    data() {
        return {
            lastTrigger: "nenhum",
            draft: "",
            escapeEnabled: true,
            escapeCount: 0
        };
    },

    methods: {
        onSave() {
            this.lastTrigger = new Date().toLocaleTimeString();
        },

        onEscape() {
            this.escapeCount += 1;
        }
    }
});
</script>
