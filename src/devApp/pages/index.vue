<template>
    <main class="bg-background">
        <article class="container mx-auto">
            <section
                class="mx-12 my-20 flex flex-col items-center justify-center text-center md:mx-4"
            >
                <h1 class="text-balance">A Fundação para o seu Projeto</h1>

                <p class="mt-3 text-balance">
                    Uma fundação em <code>Vue/TS</code> seguindo a filosofia de design aplicada pela
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/celiy/cht-main"
                        >Workspace CHT. <br />
                    </a>
                    Código open source. A base visual foi feita inspirada em
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ui.shadcn.com/"
                        >shadcn/ui</a
                    >.
                </p>

                <Button
                    variant="primary"
                    class="mt-6"

                    @click="$router.push('/docs')"
                >
                    <span> Explorar <span class="fa-solid fa-arrow-right text-xs" /> </span>
                </Button>
            </section>
        </article>

        <article
            class="relative mx-4 mb-8 grid gap-4 md:mx-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <div
                class="absolute bottom-0 z-50 h-82 w-full -translate-y-9 bg-linear-to-t from-background to-transparent"
            />
            <div class="absolute bottom-0 z-51 h-12 w-full translate-y-3 bg-background" />

            <section class="flex flex-col gap-4">
                <Card>
                    <template #body>
                        <div class="flex flex-col gap-4">
                            <div class="flex gap-2">
                                <Button
                                    label="Button"
                                    right-icon="fa-arrow-right"
                                    variant="primary"
                                />
                                <Button
                                    label="Seconday"
                                    variant="secondary"
                                />
                                <Button
                                    label="Outline"
                                    variant="outline"
                                />
                            </div>

                            <div class="flex flex-col gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                />
                                <Input
                                    id="name"
                                    type="textarea"
                                    placeholder="Message"
                                />
                            </div>

                            <div class="flex justify-between gap-2">
                                <div class="flex gap-2">
                                    <Badge
                                        label="Badge"
                                        variant="primary"
                                    />
                                    <Badge
                                        label="Secondary"
                                        variant="secondary"
                                    />
                                </div>

                                <div class="flex items-center justify-center gap-1">
                                    <Radio
                                        id="demo-radio-a"
                                        v-model="demoRadio"
                                        name="demo-radio"
                                        value="a"
                                    />

                                    <Radio
                                        id="demo-radio-b"
                                        v-model="demoRadio"
                                        name="demo-radio"
                                        value="b"
                                    />

                                    <Checkbox
                                        id="demo-checkbox"
                                        v-model:value="demoCheckbox"
                                        name="demo-checkbox"
                                    />

                                    <Checkbox
                                        id="demo-switch"
                                        v-model:value="demoSwitch"
                                        name="demo-switch"
                                        checkbox-style="switch"
                                    />
                                </div>
                            </div>

                            <div class="flex justify-between gap-2">
                                <Button
                                    label="Warning modal"
                                    variant="outline"

                                    @click="alertModal = true"
                                />

                                <ConfirmationModal
                                    variant="warning"
                                    title="Atenção"
                                    description="Variante warning"
                                    body="Confirmation modal"
                                    confirm-text="Continuar"
                                    cancel-text="Cancelar"
                                    :is-open="alertModal"

                                    @update:is-open="alertModal = $event"
                                    @confirm="alertModal = false"
                                    @cancel="alertModal = false"
                                />

                                <div class="btn-group">
                                    <Button
                                        label="Group"
                                        variant="outline"
                                    />
                                    <Dropdown :options="actionOptions">
                                        <template #button="{ toggle }">
                                            <Button
                                                variant="outline"
                                                label="Drop"

                                                @click="toggle"
                                            />
                                        </template>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>

                <div class="grid grid-cols-2 gap-4">
                    <Card>
                        <template #card>
                            <div class="flex flex-col gap-1 px-1 py-2 pb-3">
                                <Option label="Planejamento" />

                                <Option
                                    label="Documentos"
                                    value="documents"
                                    icon="fa-file-lines"
                                />
                                <Option
                                    label="Orçamento"
                                    value="budget"
                                    icon="fa-wallet"
                                />
                                <Option
                                    label="Relatórios"
                                    value="reports"
                                    icon="fa-clipboard-list"
                                />
                                <Option
                                    label="Metas"
                                    value="goals"
                                    icon="fa-bullseye"
                                />
                                <Option
                                    label="Calendário"
                                    value="calendar"
                                    icon="fa-calendar-days"
                                />
                            </div>
                        </template>
                    </Card>

                    <Card>
                        <template #card>
                            <div class="flex flex-col gap-1 px-1 py-2 pb-3">
                                <Option label="Suporte" />

                                <Option
                                    label="Central de Ajuda"
                                    value="help-center"
                                    icon="fa-circle-question"
                                />
                                <Option
                                    label="Documentação"
                                    value="docs"
                                    icon="fa-book"
                                />
                                <Option
                                    label="Fale Conosco"
                                    value="contact-us"
                                    icon="fa-envelope"
                                />
                                <Option
                                    label="Status"
                                    value="status"
                                    icon="fa-signal"
                                />
                                <Option
                                    label="Comunidade"
                                    value="community"
                                    icon="fa-users"
                                />
                            </div>
                        </template>
                    </Card>

                    <Card>
                        <template #card>
                            <div class="flex flex-col gap-1 px-1 py-2 pb-3">
                                <Option label="Visão geral" />

                                <Option
                                    label="Análise"
                                    value="analytics"
                                    icon="fa-chart-line"
                                />
                                <Option
                                    label="Transações"
                                    value="transactions"
                                    icon="fa-arrow-right-arrow-left"
                                    highlighted
                                />
                                <Option
                                    label="Investimentos"
                                    value="investments"
                                    icon="fa-piggy-bank"
                                />
                                <Option
                                    label="Contas"
                                    value="accounts"
                                    icon="fa-building-columns"
                                />
                                <Option
                                    label="Gastos"
                                    value="spending"
                                    icon="fa-credit-card"
                                />
                            </div>
                        </template>
                    </Card>

                    <Card>
                        <template #card>
                            <div class="flex flex-col gap-1 px-1 py-2 pb-3">
                                <Option label="Conta" />

                                <Option
                                    label="Perfil"
                                    value="profile"
                                    icon="fa-user"
                                    selected
                                    highlighted
                                    show-checkmark
                                />
                                <Option
                                    label="Cobrança"
                                    value="billing"
                                    icon="fa-file-invoice-dollar"
                                />
                                <Option
                                    label="Notificações"
                                    value="notifications"
                                    icon="fa-bell"
                                />
                                <Option
                                    label="Segurança"
                                    value="security"
                                    icon="fa-shield-halved"
                                />
                                <Option
                                    label="Aparência"
                                    value="appearance"
                                    icon="fa-palette"
                                />
                            </div>
                        </template>
                    </Card>
                </div>

                <Card>
                    <template #header>
                        <h5>Meta de economia</h5>
                        <small class="mb-2 text-muted-foreground!"
                            >Metas ativas para o ano de 2026 no seu portifólio. Monitore o quão
                            perto você está da sua meta.</small
                        >
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-2">
                            <Item
                                variant="secondary"
                                head="META ATUAL"
                                :hover-effect="false"
                            >
                                <template #body>
                                    <div class="mt-1 flex flex-col">
                                        <span class="text-3xl font-semibold text-foreground">
                                            $ 5,000
                                        </span>

                                        <ProgressBar
                                            v-model="ProgressBarValue"
                                            class="my-1 w-full"
                                            readonly
                                            show-progress
                                        />

                                        <div class="mt-2 flex justify-between">
                                            <small class="text-muted-foreground!">
                                                35% completo
                                            </small>

                                            <small> $ 50,000 </small>
                                        </div>
                                    </div>
                                </template>
                            </Item>

                            <Item
                                variant="secondary"
                                head="GUARDADO"
                                :hover-effect="false"
                            >
                                <template #body>
                                    <div class="mt-1 flex flex-col">
                                        <span class="text-3xl font-semibold text-foreground">
                                            $ 2,000
                                        </span>

                                        <ProgressBar
                                            v-model="ProgressBarValue2"
                                            class="my-1 w-full"
                                            readonly
                                            show-progress
                                        />

                                        <div class="mt-2 flex justify-between">
                                            <small class="text-muted-foreground!">
                                                15% completo
                                            </small>

                                            <small> $ 100,000 </small>
                                        </div>
                                    </div>
                                </template>
                            </Item>
                        </div>
                    </template>
                </Card>
            </section>

            <section class="flex flex-col gap-4">
                <Card>
                    <template #header>
                        <h5>Vendas</h5>
                        <small class="text-muted-foreground!"> Vendas nos ultimos 5 meses </small>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-6">
                            <BarChart
                                :data="{
                                    label: 'Vendas',
                                    displayAs: 'sum',
                                    items: [
                                        { date: new Date(2023, 0, 1), value: 12 },
                                        { date: new Date(2023, 0, 15), value: 8 },
                                        { date: new Date(2023, 1, 1), value: 28 },
                                        { date: new Date(2023, 2, 1), value: 24 },
                                        { date: new Date(2023, 3, 1), value: 32 },
                                        { date: new Date(2023, 4, 1), value: 30 }
                                    ]
                                }"
                                color="chart-2"
                                :hide-label="true"
                            />

                            <div class="flex gap-2">
                                <Item
                                    head="EM BREVE"
                                    label="Previsão"
                                    description="Marcado"
                                    variant="secondary"
                                    :hover-effect="false"
                                    class="w-full"
                                />
                                <Item
                                    head="PLANOS"
                                    label="A seguir"
                                    description="Salvo"
                                    variant="secondary"
                                    :hover-effect="false"
                                    class="w-full"
                                />
                            </div>

                            <Button
                                label="Ver todas as vendas"
                                class="w-full"
                                variant="primary"
                            />
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <div>
                            <small class="text-muted-foreground!"> Saldo sacável </small>

                            <h2 class="whitespace-nowrap">$ 2,200.00</h2>

                            <Badge
                                label="Pendente"
                                variant="warning"
                            />
                        </div>
                    </template>

                    <template #body>
                        <div>
                            <Item
                                variant="secondary"
                                class="my-2"
                            >
                                <template #body>
                                    <div class="flex flex-col gap-2">
                                        <div class="flex justify-between">
                                            <small class="text-muted-foreground!">Recebido</small>
                                            <small class="font-medium!">$ 2,300.00</small>
                                        </div>

                                        <div class="flex justify-between">
                                            <small class="text-muted-foreground!">Impostos</small>
                                            <small class="font-medium!">-$ 100.00</small>
                                        </div>

                                        <Marker separator />

                                        <div class="flex justify-between">
                                            <small class="text-muted-foreground!"
                                                >Total sacável</small
                                            >
                                            <small class="font-medium!">$ 2,100.00</small>
                                        </div>
                                    </div>
                                </template>
                            </Item>

                            <small class="text-muted-foreground!">
                                Assim que seu banco for conectado você irá poder sacar o seu saldo.
                                O valor fica na sua conta indefinidamente até você peformar a ação.
                            </small>
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <h5>Últimas movimentações</h5>
                        <small class="text-muted-foreground!">
                            Créditos e saques recentes na sua conta.
                        </small>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-2">
                            <Item
                                variant="success"
                                icon="fa-arrow-trend-up"
                                head="CRÉDITO"
                                label="$ 1,200.00"
                                small-text="Vendas · 12 ago"
                                :hover-effect="false"
                            />

                            <Item
                                variant="secondary"
                                icon="fa-building-columns"
                                head="SAQUE"
                                label="$ 450.00"
                                small-text="Banco ligado · 08 ago"
                                :hover-effect="false"
                            />

                            <Button
                                class="w-full"
                                variant="primary"
                                label="Ver extrato"
                            />
                        </div>
                    </template>
                </Card>
            </section>

            <section class="flex flex-col gap-4">
                <Card>
                    <template #header>
                        <h5>Definir meta</h5>
                        <small class="text-muted-foreground!">
                            Define uma meta financeira para ajudar com sua economias
                        </small>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-4">
                            <Input
                                id="meta"
                                type="text"
                                label="Nome da meta"
                                placeholder="ex. Novo carro, Casa nova"
                            />

                            <div class="grid grid-cols-2 gap-2">
                                <Input
                                    id="alvo"
                                    type="text"
                                    label="Alvo"
                                    placeholder="$ 5,000.00"
                                />

                                <Input
                                    id="data-limite"
                                    type="date"
                                    label="Data limite"
                                />
                            </div>

                            <div class="flex flex-col gap-2">
                                <Button
                                    class="w-full"
                                    variant="primary"
                                    label="Criar meta"
                                />

                                <Button
                                    class="w-full"
                                    variant="outline"
                                    label="Canelar"
                                />
                            </div>
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <h5>Limite de saque</h5>
                        <small class="text-muted-foreground!">
                            Defina a moeda e o valor mínimo para solicitar um saque.
                        </small>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-4">
                            <Select
                                id="preferred-currency"
                                v-model="currency"
                                label="Moeda preferida"
                                :options="currencyOptions"
                            />

                            <div class="flex flex-col">
                                <div class="flex items-end justify-between gap-2">
                                    <small class="text-muted-foreground!">
                                        Valor mínimo de saque
                                    </small>

                                    <span
                                        class="text-3xl font-semibold whitespace-nowrap text-foreground"
                                    >
                                        {{ formatMoney(payoutAmount) }}
                                    </span>
                                </div>

                                <ProgressBar
                                    v-model="payoutAmount"
                                    class="my-1 w-full"
                                    :min="50"
                                    :max="10000"
                                />

                                <div class="flex justify-between">
                                    <small class="text-muted-foreground!"> $ 50 (MIN) </small>

                                    <small class="text-muted-foreground!"> $ 10,000 (MAX) </small>
                                </div>
                            </div>

                            <Input
                                id="payout-notes"
                                v-model="payoutNotes"
                                type="textarea"
                                label="Notas"
                                placeholder="Adicione notas para esta configuração de saque..."
                            />

                            <Button
                                class="w-full"
                                variant="primary"
                                label="Guardar limite"
                            />
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <h5>Acesso à conta</h5>
                        <small class="text-muted-foreground!">
                            Atualize as credenciais ou autentique-se novamente.
                        </small>
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-4">
                            <Input
                                id="account-email"
                                v-model="accountEmail"
                                type="email"
                                label="Email"
                                placeholder="nome@exemplo.com"
                            />

                            <Input
                                id="account-password"
                                v-model="accountPassword"
                                label="Senha atual"
                                type="password"
                            />

                            <Button
                                class="w-full"
                                variant="primary"
                                label="Atualizar segurança"
                                left-icon="fa-lock"
                            />

                            <Item
                                icon="fa-circle-exclamation"
                                variant="destructive"
                                type="alert"
                                description="Ocorreu um erro inesperado."
                            />
                        </div>
                    </template>
                </Card>
            </section>

            <section class="flex flex-col gap-4 lg:hidden xl:flex">
                <Card>
                    <template #body>
                        <div class="flex w-full flex-col items-center justify-center gap-4">
                            <QrCode value="https://example.com" />

                            <div class="px-8">
                                <h5 class="text-center">Escaneie para conectar</h5>
                                <p class="text-center text-muted-foreground!">
                                    Abra a camera do celu celular e escaneie o QR code para se
                                    conectar.
                                </p>
                            </div>
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <h5>Novo chat</h5>
                        <small class="text-muted-foreground!">Como posso te ajudar hoje?</small>
                    </template>

                    <template #card>
                        <div>
                            <Marker
                                separator
                                class="mt-4"
                            />

                            <div
                                ref="chatThread"

                                class="max-h-80 min-h-40 overflow-y-auto px-4 pt-2"
                            >
                                <Chat :messages="chatMessages" />
                            </div>

                            <form
                                class="px-4 pb-4"

                                @submit.prevent="sendChatMessage"
                                @keydown.enter.exact.prevent="sendChatMessage"
                            >
                                <Input
                                    id="chat"
                                    v-model="chatDraft"
                                    type="textarea"
                                    hide-resize
                                    expand-on-typing
                                    placeholder="Escreva uma mensagem..."
                                    :min-height-px="30"
                                    :max-height-px="150"
                                    :max-size="2000"
                                >
                                    <template #input>
                                        <div class="flex w-full justify-between p-2">
                                            <Button
                                                label="Limpar"

                                                @click="resetChat"
                                            />

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                label="Enviar"
                                                :disabled="!canSendChat"
                                            />
                                        </div>
                                    </template>
                                </Input>
                            </form>
                        </div>
                    </template>
                </Card>

                <Card>
                    <template #header>
                        <h5>O que deseja fazer hoje?</h5>
                        <small class="text-muted-foreground!"
                            >Selecione uma ação para começar</small
                        >
                    </template>

                    <template #body>
                        <div class="flex flex-col gap-2">
                            <Item
                                icon="fa-home"
                                variant="secondary"
                                type="alert"
                                label="Home"
                                small-text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            />

                            <Item
                                icon="fa-user"
                                variant="secondary"
                                type="alert"
                                description="Perfil"
                                small-text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            />

                            <Item
                                icon="fa-bell"
                                variant="secondary"
                                type="alert"
                                description="Ative alertas e notifique-se sobre novidades."
                                small-text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            />

                            <Item
                                icon="fa-check"
                                variant="secondary"
                                type="alert"
                                description="Operação realizada com sucesso."
                                small-text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            />
                        </div>
                    </template>
                </Card>
            </section>
        </article>

        <section class="my-8 flex w-full items-center justify-center">
            <small class="text-muted-foreground!">
                Feito por
                <a
                    class="text-muted-foreground! hover:text-foreground!"
                    href="https://github.com/celiy"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Diogo</a
                >. Baseado no design de
                <a
                    class="text-muted-foreground! hover:text-foreground!"
                    href="https://ui.shadcn.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >shadcn</a
                >. O código está disponível no
                <a
                    class="text-muted-foreground! hover:text-foreground!"
                    href="https://github.com/celiy/cht-main"
                    target="_blank"
                    rel="noopener noreferrer"
                    >GitHub</a
                >.
            </small>
        </section>
    </main>
</template>

<script lang="ts">
import type { OptionItem } from "@design/components/internal/OptionsList.vue";
import { defineComponent } from "vue";
import landscapeImage from "@/assets/images/landscape.jpg";
import verticalLandscapeImage from "@/assets/images/vertical_landscape.jpg";
import squareImage from "@/assets/images/square_image.webp";
import portraitImage from "@/assets/images/portrait.jpg";

type DemoChatMessage = {
    text?: string;
    images?: string[];
    sent?: boolean;
    date?: Date;
};

const CANNED_REPLIES: Array<{ text?: string; images?: string[] }> = [
    { text: "Recebi a tua mensagem. Como posso ajudar?" },
    { text: "Aqui vai uma imagem de referência.", images: [landscapeImage] },
    { images: [squareImage] },
    { text: "Algumas vistas diferentes:", images: [verticalLandscapeImage, landscapeImage] },
    { text: "Daqui só envias texto. Eu respondo sempre com um destes exemplos." },
    {
        text: "Uma galeria rápida:",
        images: [portraitImage, squareImage, landscapeImage, verticalLandscapeImage]
    }
];

export default defineComponent({
    name: "IndexPage",

    data() {
        return {
            alertModal: false,
            demoRadio: "a",
            demoCheckbox: false,
            demoSwitch: true,
            actionOptions: [
                { label: "Conta" },
                { label: "Perfil", value: "user", icon: "fa-user" },
                {
                    label: "Email",
                    value: "email",
                    icon: "fa-envelope",
                    tooltip: "Abrir caixa de entrada"
                },
                { separator: true },
                {
                    label: "Sair",
                    value: "exit",
                    icon: "fa-right-from-bracket",
                    variant: "destructive"
                }
            ] as OptionItem[],
            ProgressBarValue: 35,
            ProgressBarValue2: 15,
            payoutAmount: 2500,
            payoutNotes: "",
            currency: "usd",
            currencyOptions: [
                { label: "USD — Dólar americano", value: "usd" },
                { label: "BRL — Real brasileiro", value: "brl" },
                { label: "EUR — Euro", value: "eur" }
            ] as OptionItem[],
            accountEmail: "artist@studio.inc",
            accountPassword: "",
            chatDraft: "",
            chatMessages: [
                {
                    text: "Olá! Envia uma mensagem e te respondo sempre com um exemplo pré-pronto.",
                    date: new Date()
                }
            ] as DemoChatMessage[],
            cannedReplyIndex: 0,
            chatReplyTimer: null as number | null,
            chatScrollRaf: null as number | null
        };
    },

    computed: {
        canSendChat(): boolean {
            return this.chatDraft.trim().length > 0;
        }
    },

    beforeUnmount() {
        this.clearChatReplyTimer();
        this.clearChatScrollRaf();
    },

    methods: {
        resetChat() {
            this.chatMessages = [];
        },

        formatMoney(value: number): string {
            return `$ ${new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value)}`;
        },

        clearChatReplyTimer() {
            if (this.chatReplyTimer == null) {
                return;
            }

            window.clearTimeout(this.chatReplyTimer);
            this.chatReplyTimer = null;
        },

        clearChatScrollRaf() {
            if (this.chatScrollRaf == null) {
                return;
            }

            window.cancelAnimationFrame(this.chatScrollRaf);
            this.chatScrollRaf = null;
        },

        snapChatToBottom() {
            const el = this.$refs.chatThread as HTMLElement | undefined;

            if (!el) {
                return;
            }

            el.scrollTop = el.scrollHeight;
        },

        scrollChatAfterImages() {
            const el = this.$refs.chatThread as HTMLElement | undefined;

            if (!el) {
                return;
            }

            const images = Array.from(el.querySelectorAll("img"));

            for (const img of images) {
                if (img.complete) {
                    continue;
                }

                const onDone = () => {
                    this.snapChatToBottom();
                };

                img.addEventListener("load", onDone, { once: true });
                img.addEventListener("error", onDone, { once: true });
            }
        },

        scrollChatToBottom() {
            this.clearChatScrollRaf();

            this.$nextTick(() => {
                this.snapChatToBottom();

                this.chatScrollRaf = window.requestAnimationFrame(() => {
                    this.chatScrollRaf = window.requestAnimationFrame(() => {
                        this.chatScrollRaf = null;
                        this.snapChatToBottom();
                        this.scrollChatAfterImages();
                    });
                });
            });
        },

        queueCannedReply() {
            this.clearChatReplyTimer();

            this.chatReplyTimer = window.setTimeout(() => {
                this.chatReplyTimer = null;

                const canned = CANNED_REPLIES[this.cannedReplyIndex % CANNED_REPLIES.length];

                this.cannedReplyIndex += 1;

                if (!canned) {
                    return;
                }

                this.chatMessages.push({
                    text: canned.text,
                    images: canned.images ? [...canned.images] : undefined,
                    date: new Date()
                });

                this.scrollChatToBottom();
            }, 700);
        },

        sendChatMessage() {
            const text = this.chatDraft.trim();

            if (!text) {
                return;
            }

            this.chatMessages.push({
                text,
                sent: true,
                date: new Date()
            });

            this.chatDraft = "";
            this.scrollChatToBottom();
            this.queueCannedReply();
        }
    }
});
</script>
