<template>
    <article class="container-sm docs-article">
        <section>
            <h1>FloatingPanel</h1>

            <p>
                Painel flutuante posicionado em relação a um <code>anchor</code>. É a base de
                <code>Popover</code>, <code>Select</code>, <code>Dropdown</code> e do modal de tela
                cheia no mobile. Importa de
                <code>@design/components/internal/FloatingPanel.vue</code> e não está no glob do
                plugin, então não é registrado globalmente.
            </p>
        </section>

        <section>
            <h3>Uso básico</h3>

            <p>
                Passe o elemento gatilho em <code>anchor</code> e controle a abertura com
                <code>v-model:open</code>. Sem <code>open</code>, o painel mantém o estado interno e
                abre/fecha sozinho pelo gatilho que você controla.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Básico">
                <div class="flex flex-wrap gap-4 p-4">
                    <button
                        :ref="(el) => setTrigger('basic', el)"

                        type="button"
                        class="rounded border bg-background px-3 py-1 text-sm"

                        @click="basicOpen = !basicOpen"
                    >
                        Abrir painel
                    </button>

                    <FloatingPanel
                        v-model:open="basicOpen"
                        :anchor="basicTriggerEl"
                    >
                        <div class="p-3 text-sm">Conteúdo livre dentro do painel.</div>
                    </FloatingPanel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Posicionamento</h3>

            <p>
                Por padrão o painel abre abaixo do anchor e alinha com a borda esquerda dele.
                <code>preferAbove</code> tenta abrir acima e só inverte se não couber.
                <code>lockToAnchor</code> (default <code>true</code>) iguala a largura ao gatilho;
                use <code>false</code> com <code>minWidthPx</code> e <code>maxWidthPx</code> para
                conteúdo que pode ser mais largo. Em <code>maxHeightPx</code> (default
                <code>280</code>) o painel rola internamente.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Acima">
                <div class="flex flex-wrap gap-4 p-4">
                    <button
                        :ref="(el) => setTrigger('above', el)"

                        type="button"
                        class="rounded border bg-background px-3 py-1 text-sm"

                        @click="aboveOpen = !aboveOpen"
                    >
                        Abrir acima
                    </button>

                    <FloatingPanel
                        v-model:open="aboveOpen"
                        :anchor="aboveTriggerEl"
                        prefer-above
                        :lock-to-anchor="false"
                        :min-width-px="200"
                    >
                        <div class="p-3 text-sm">Painel mais largo que o gatilho.</div>
                    </FloatingPanel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Mobile e modal</h3>

            <p>
                Em viewports estreitos (até 767px), o painel vira um <code>Modal</code> em branco
                quando <code>mobileModal</code> é <code>true</code> (default). Com
                <code>forceModal</code> ele abre como modal também no desktop. O slot padrão é
                renderizado dentro do modal, então o conteúdo não muda.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Forçar modal">
                <div class="flex flex-wrap gap-4 p-4">
                    <button
                        :ref="(el) => setTrigger('modal', el)"

                        type="button"
                        class="rounded border bg-background px-3 py-1 text-sm"

                        @click="modalOpen = !modalOpen"
                    >
                        Abrir modal
                    </button>

                    <FloatingPanel
                        v-model:open="modalOpen"
                        :anchor="modalTriggerEl"
                        force-modal
                    >
                        <div class="p-3 text-sm">Renderizado no Modal, mesmo no desktop.</div>
                    </FloatingPanel>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Hover e fechamento</h3>

            <p>
                <code>openOnHover</code> mantém o painel aberto enquanto o ponteiro está sobre ele e
                fecha após um pequeno atraso ao sair. <code>closeOnContentClick</code>
                fecha o painel quando qualquer ponto dele é clicado. Por padrão, clique fora,
                <code>Escape</code> e troca de painel também fecham.
            </p>
        </section>

        <section>
            <h3>Slots</h3>

            <p>
                O slot padrão recebe <code>isOpen</code> e <code>close</code>. O slot
                <code>helperText</code> fica abaixo do conteúdo principal, fixo no fim do painel.
            </p>
        </section>

        <section>
            <h3>Eventos</h3>

            <ul>
                <li><code>open</code> e <code>close</code>: disparados ao mudar o estado.</li>
                <li><code>update:open</code>: novo valor para <code>v-model:open</code>.</li>
                <li><code>panel-click</code>: clique dentro do painel, com o evento original.</li>
            </ul>
        </section>

        <section>
            <h3>Métodos</h3>

            <p>
                Acessíveis pela ref do componente: <code>openPanel()</code>, <code>close()</code> e
                <code>toggleOpenClose()</code>.
            </p>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FloatingPanel from "@design/components/internal/FloatingPanel.vue";

export default defineComponent({
    name: "ComponentsFloatingPanel",

    components: {
        FloatingPanel
    },

    data() {
        return {
            basicOpen: false,
            aboveOpen: false,
            modalOpen: false,
            basicTriggerEl: null as HTMLElement | null,
            aboveTriggerEl: null as HTMLElement | null,
            modalTriggerEl: null as HTMLElement | null
        };
    },

    methods: {
        /**
         * Stores a demo trigger once DocsExample has rendered it (slot content is not
         * available in `mounted`).
         * @param {"basic" | "above" | "modal"} name The example
         * @param {unknown} el The element reported by the function ref
         * @returns {void}
         */
        setTrigger(name: "basic" | "above" | "modal", el: unknown) {
            const element = el instanceof HTMLElement ? el : null;

            if (name === "basic") {
                this.basicTriggerEl = element;
            } else if (name === "above") {
                this.aboveTriggerEl = element;
            } else {
                this.modalTriggerEl = element;
            }
        }
    }
});
</script>
