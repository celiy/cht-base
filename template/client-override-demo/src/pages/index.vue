<template>
    <main class="override-demo-page container-lg py-10">
        <header class="mb-8">
            <h1 class="text-3xl font-semibold tracking-tight">
                {{ $project.labels.siteTitle }}
            </h1>

            <p class="mt-2 max-w-3xl text-muted-foreground">
                Showcase de
                <code>src/override.css</code>
                e de
                <code>src/tailwind.plugin.js</code>
                — quase todos os componentes do design system com um visual distinto
                (vidro, glow, pills, gradientes). O fundo colorido deixa o blur dos cards visível.
            </p>

            <div class="demo-stripe mt-6 rounded bg-card p-4 text-sm">
                <code>demo-stripe</code>
                — utility gerada neste cliente (borda superior 3px
                <code>primary</code>), não no
                <code>cht-base</code>.
            </div>

            <div class="separator my-6" />
        </header>

        <div class="grid gap-8 lg:grid-cols-2">
            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Botões
                    </h2>
                </template>

                <template #body>
                    <p class="mb-4 text-sm text-muted-foreground">
                        Variantes, glow no hover e grupo em pill.
                    </p>

                    <div class="flex flex-wrap gap-2">
                        <Button
                            label="Primário"
                            variant="primary"
                        />

                        <Button label="Padrão" />

                        <Button
                            label="Secundário"
                            variant="secondary"
                        />

                        <Button
                            label="Outline"
                            variant="outline"
                        />

                        <Button
                            label="Sucesso"
                            variant="success"
                        />

                        <Button
                            label="Info"
                            variant="info"
                        />

                        <Button
                            label="Aviso"
                            variant="warning"
                        />

                        <Button
                            label="Destrutivo"
                            variant="destructive"
                        />
                    </div>

                    <div class="btn-group mt-4">
                        <Button label="Lista" />
                        <Button label="Kanban" />
                        <Button label="Calendário" />
                    </div>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <Button
                            label="Toast ok"
                            variant="success"
                            size="small"

                            @click="$toast.success('Override demo — sucesso')"
                        />

                        <Button
                            label="Toast aviso"
                            variant="warning"
                            size="small"

                            @click="$toast.warning('Brilho e vidro ativos')"
                        />

                        <Button
                            label="Abrir modal"
                            variant="outline"
                            size="small"

                            @click="demoModalOpen = true"
                        />
                    </div>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Formulário
                    </h2>
                </template>

                <template #body>
                    <div class="flex flex-col gap-4">
                        <Input
                            id="override-demo-nome"
                            label="Nome"
                            placeholder="Texto com glow no foco"
                        />

                        <Select
                            id="override-demo-prioridade"
                            v-model="selectValue"
                            label="Prioridade"
                            placeholder="Escolha…"
                            :use-memo="false"
                            :options="selectOptions"
                        />

                        <div class="flex flex-wrap items-center gap-4">
                            <label class="flex items-center gap-2 text-sm">
                                <Radio
                                    id="override-demo-radio-a"
                                    v-model="demoRadio"
                                    name="override-demo-radio"
                                    value="a"
                                />

                                Opção A
                            </label>

                            <label class="flex items-center gap-2 text-sm">
                                <Radio
                                    id="override-demo-radio-b"
                                    v-model="demoRadio"
                                    name="override-demo-radio"
                                    value="b"
                                />

                                Opção B
                            </label>

                            <label class="flex items-center gap-2 text-sm">
                                <Checkbox
                                    id="override-demo-check"
                                    v-model:value="demoCheckbox"
                                    name="override-demo-check"
                                />

                                Checkbox
                            </label>

                            <label class="flex items-center gap-2 text-sm">
                                <Checkbox
                                    id="override-demo-switch"
                                    v-model:value="demoSwitch"
                                    name="override-demo-switch"
                                    checkbox-style="switch"
                                />

                                Switch
                            </label>
                        </div>

                        <ProgressBar
                            id="override-demo-volume"
                            v-model="progressValue"
                            label="Volume"
                            helper-text="Barra com track em gradiente"
                        />
                    </div>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Badges, avatar e skeleton
                    </h2>
                </template>

                <template #body>
                    <div class="mb-4 flex flex-wrap gap-2">
                        <Badge label="Novo" />

                        <Badge
                            label="Primário"
                            variant="primary"
                        />

                        <Badge
                            label="Aviso"
                            variant="warning"
                        />

                        <Badge
                            label="Ok"
                            variant="success"
                        />

                        <Badge
                            label="Chart"
                            variant="chart-2"
                        />
                    </div>

                    <div class="flex flex-wrap items-center gap-4">
                        <Avatar
                            size="medium"
                            status="online"
                        />

                        <Avatar
                            size="large"
                            status="away"
                        />

                        <div class="flex flex-col gap-2 min-w-[8rem]">
                            <Skeleton type="text" />
                            <Skeleton type="text" />
                            <Skeleton
                                type="avatar"
                                size="medium"
                            />
                        </div>

                        <ProgressBar
                            loading
                            variant="circular"
                            size="medium"
                        />
                    </div>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Navegação e painéis
                    </h2>
                </template>

                <template #body>
                    <Tabs variant="secondary">
                        <template #tab-title-0>
                            Resumo
                        </template>

                        <template #tab-content-0>
                            <p class="p-3 text-sm text-muted-foreground">
                                Conteúdo da primeira aba — tabs com cantos arredondados no override.
                            </p>
                        </template>

                        <template #tab-title-1>
                            Detalhes
                        </template>

                        <template #tab-content-1>
                            <p class="p-3 text-sm text-muted-foreground">
                                Segunda aba com o mesmo estilo de vidro.
                            </p>
                        </template>
                    </Tabs>

                    <Accordion
                        class="mt-4"
                        header="Accordion com override"
                        pinnable
                    >
                        <p class="text-sm text-muted-foreground">
                            Painel expansível; bordas e fundo seguem o tema de vidro do cliente.
                        </p>
                    </Accordion>

                    <div class="mt-4 flex flex-wrap items-center gap-2">
                        <Dropdown
                            header="Menu"
                            :options="dropdownOptions"
                        />

                        <Popover
                            header="Popover"
                            panel-class="p-3"
                        >
                            <template #button="{ toggle }">
                                <Button
                                    label="Popover"
                                    variant="outline"
                                    size="small"

                                    @click="toggle"
                                />
                            </template>

                            <p class="text-sm text-muted-foreground">
                                Painel flutuante estilizado pelo CSS global do cliente.
                            </p>
                        </Popover>
                    </div>
                </template>
            </Card>

            <Card class="lg:col-span-2">
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Tabela
                    </h2>
                </template>

                <template #body>
                    <Table
                        title="Equipe"
                        :headers="tableHeaders"
                        :data="tableData"
                    />
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Lista e opções
                    </h2>
                </template>

                <template #card>
                    <div class="flex flex-col gap-1 px-2 py-2 pb-3">
                        <Option label="Categorias" />

                        <Option
                            label="Design"
                            value="design"
                            icon="fa-palette"
                        />

                        <Option
                            label="Código"
                            value="code"
                            icon="fa-code"
                        />

                        <Option
                            label="Deploy"
                            value="deploy"
                            icon="fa-rocket"
                        />
                    </div>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Passos e paginação
                    </h2>
                </template>

                <template #body>
                    <Steps>
                        <template #step-title-0>
                            Tema
                        </template>

                        <template #step-0>
                            <p class="text-sm text-muted-foreground">
                                Tokens e override.css
                            </p>
                        </template>

                        <template #step-title-1>
                            Componentes
                        </template>

                        <template #step-1>
                            <p class="text-sm text-muted-foreground">
                                Herdam classes globais
                            </p>
                        </template>

                        <template #step-title-2>
                            Publicar
                        </template>
                    </Steps>

                    <Pagination
                        id="override-demo-pagination"
                        class="mt-6"
                        :amount="7"
                        :use-memo="false"

                        @update:page="demoPage = $event"
                    />

                    <p class="mt-2 text-center text-xs text-muted-foreground">
                        Página {{ demoPage }}
                    </p>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Carrossel e QR
                    </h2>
                </template>

                <template #body>
                    <Carousel edge-click>
                        <template #item-0>
                            <div class="override-demo-carousel-slide">
                                Slide 1
                            </div>
                        </template>

                        <template #item-1>
                            <div class="override-demo-carousel-slide">
                                Slide 2
                            </div>
                        </template>

                        <template #item-2>
                            <div class="override-demo-carousel-slide">
                                Slide 3
                            </div>
                        </template>
                    </Carousel>

                    <div class="mt-4 flex justify-center">
                        <QrCode
                            value="https://github.com/celiy/cht-main"
                            :size="96"
                        />
                    </div>
                </template>
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-lg font-semibold">
                        Confirmação
                    </h2>
                </template>

                <template #body>
                    <p class="mb-4 text-sm text-muted-foreground">
                        Modal de confirmação com ícone e cores semânticas.
                    </p>

                    <Button
                        label="Confirmation modal"
                        variant="warning"

                        @click="confirmModalOpen = true"
                    />

                    <ConfirmationModal
                        variant="warning"
                        title="Aplicar override?"
                        description="Este modal também herda bordas e sombras do tema do cliente."
                        confirm-text="Sim"
                        cancel-text="Não"
                        :is-open="confirmModalOpen"

                        @update:is-open="confirmModalOpen = $event"
                        @confirm="confirmModalOpen = false"
                        @cancel="confirmModalOpen = false"
                    />
                </template>
            </Card>
        </div>

        <Modal
            :is-open="demoModalOpen"

            @update:value="demoModalOpen = $event"
        >
            <template #header>
                Modal de exemplo
            </template>

            <template #description>
                Painel com fundo semitransparente e blur (via override).
            </template>

            <template #body>
                <p class="text-sm text-muted-foreground">
                    Feche pelo X ou clique fora. O conteúdo por trás mantém os orbes coloridos visíveis.
                </p>
            </template>

            <template #footer>
                <Button
                    label="Fechar"
                    variant="primary"
                    class="w-full"

                    @click="demoModalOpen = false"
                />
            </template>
        </Modal>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "IndexPage",

    data() {
        return {
            demoRadio: "a",
            demoCheckbox: true,
            demoSwitch: true,
            selectValue: "medium",
            progressValue: 62,
            demoPage: 1,
            demoModalOpen: false,
            confirmModalOpen: false,
            selectOptions: [
                { label: "Baixa", value: "low" },
                { label: "Média", value: "medium" },
                { label: "Alta", value: "high" }
            ],
            dropdownOptions: [
                { label: "Duplicar", value: "dup", icon: "fa-copy" },
                { label: "Arquivar", value: "arch", icon: "fa-box-archive" },
                { separator: true },
                { label: "Excluir", value: "del", icon: "fa-trash", variant: "destructive" }
            ],
            tableHeaders: [
                { label: "Nome", field: "name", position: "start" },
                { label: "Status", field: "badge", position: "center" },
                { label: "Função", field: "role", position: "end" }
            ],
            tableData: [
                { name: "Ana", badge: { label: "Ativo", variant: "success" }, role: "Design" },
                { name: "Bruno", badge: { label: "Beta", variant: "chart-1" }, role: "Front-end" },
                { name: "Carla", badge: { label: "Pausa", variant: "warning" }, role: "QA" }
            ]
        };
    }
});
</script>
