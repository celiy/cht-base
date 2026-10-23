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
                        label="Chip transparent"
                        variant="transparent"
                    />

                    <Chip
                        label="Chip primary"
                        variant="primary"
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
    </article>
</template>
