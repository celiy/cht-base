<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Chip</h1>

            <p>
                Item de lista compacto com rótulo, ícone opcional e slots nas laterais e no corpo.
                Use <code>isActive</code> para destacar a opção selecionada.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Básico">
                <div class="flex flex-col gap-2 p-4">
                    <Chip
                        label="Chip default"
                        variant="default"
                    />

                    <Chip
                        label="Chip primary"
                        variant="primary"
                    />

                    <Chip
                        label="Chip secondary"
                        variant="secondary"
                    />

                    <Chip
                        label="Chip success"
                        variant="success"
                    />

                    <Chip
                        label="Chip info"
                        variant="info"
                    />

                    <Chip
                        label="Chip warning"
                        variant="warning"
                    />

                    <Chip
                        label="Chip destructive"
                        variant="destructive"
                    />

                    <Chip
                        label="Chip transparent"
                        variant="transparent"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Ícone</h3>

            <p>
                <code>labelIcon</code> recebe uma classe Font Awesome (<code>fa-solid</code> já é
                aplicada).
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Com ícone">
                <div class="flex flex-col gap-2 p-4">
                    <Chip
                        label="Início"
                        label-icon="fa-house"
                    />

                    <Chip
                        label="Favoritos"
                        label-icon="fa-star"
                        variant="primary"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Slots</h3>

            <p>
                <code>left-side</code>, <code>body</code> e <code>right-side</code> permitem
                conteúdo extra antes, acima e depois do rótulo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Slots">
                <div class="flex flex-col gap-2 p-4">
                    <Chip label="Com badge à esquerda">
                        <template #left-side>
                            <Badge class="ml-2">Badge</Badge>
                        </template>
                    </Chip>

                    <Chip>
                        <template #body>
                            <div class="flex flex-col gap-1">
                                <span class="text-sm font-medium">Título</span>
                                <span class="text-xs text-sidebar-foreground/90"> Descrição </span>
                            </div>
                        </template>
                    </Chip>

                    <Chip label="Com ação à direita">
                        <template #right-side>
                            <button
                                class="px-4 text-xs opacity-70 hover:opacity-100"
                                type="button"
                            >
                                <i class="fa-solid fa-xmark" />
                            </button>
                        </template>
                    </Chip>
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Grupo</h3>

            <p>
                <code>chip-group</code> junta os chips lado a lado, e
                <code>chip-group-vertical</code>
                empilha um em cima do outro. Só o raio muda: os cantos internos ficam retos e os
                externos continuam arredondados. No vertical, todos os chips ficam com a largura do
                maior.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="chip-group">
                <div class="p-4">
                    <div class="chip-group">
                        <Chip label="Dia" />

                        <Chip label="Semana" />

                        <Chip label="Mês" />
                    </div>
                </div>
            </DocsExample>
        </section>

        <section class="mb-8">
            <DocsExample label="chip-group-vertical">
                <div class="p-4">
                    <div class="chip-group-vertical">
                        <Chip
                            label="Início"
                            label-icon="fa-house"
                        />

                        <Chip
                            label="Favoritos"
                            label-icon="fa-star"
                        />

                        <Chip
                            label="Configurações"
                            label-icon="fa-gear"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chip from "@design/components/Chip.vue";

export default defineComponent({
    name: "DocsChip",

    components: {
        Chip
    }
});
</script>
