<template>
    <main class="min-h-screen flex items-center justify-center bg-background">
        <section>

        </section>

        <article class="grid md:grid-cols-4 gap-4 md:mx-8">
            <section>
                <Card>
                    <template #body>
                        <div class="flex flex-col gap-6">
                            <div class="flex gap-2">
                                <Button label="Button" right-icon="fa-arrow-right" variant="primary" />
                                <Button label="Seconday" variant="secondary" />
                                <Button label="Outline" variant="outline" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <Input id="name" type="text" placeholder="Name"/>
                                <Input id="name" type="textarea" placeholder="Message"/>
                            </div>

                            <div class="flex justify-between gap-2">
                                <div class="flex gap-2">
                                    <Badge label="Badge" variant="primary" />
                                    <Badge label="Secondary" variant="secondary" />
                                </div>

                                <div class="flex items-center gap-1">
                                    <Radio id="r-1" />
                                    <Radio id="r-2" />
                                    <Checkbox id="c-1" />
                                    <CheckboxSwitch id="cs-1" />
                                </div>
                            </div>

                            <div class="flex justify-between gap-2">
                                <Button label="Warning modal" @click="alertModal = true" variant="outline" />

                                <ConfirmationModal
                                    variant="warning"
                                    title="Atenção"
                                    description="Variante warning"
                                    body="Confirmation modal"
                                    confirmText="Continuar"
                                    cancelText="Cancelar"
                                    :isOpen="alertModal"
                                    @update:isOpen="alertModal = $event"
                                    @confirm="alertModal = false"
                                    @cancel="alertModal = false"
                                />

                                <div class="btn-group">
                                    <Button label="Group" variant="outline" />
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

                <div>
                    
                </div>
            </section>

            <section>
                <Card>
                    <template #header>
                        <h5>Vendas</h5>
                        <small class="text-muted-foreground!">
                            Vendas nos ultimos 5 meses
                        </small>
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
                                :hideLabel="true"
                            />

                            <div class="flex gap-2">
                                <Item head="EM BREVE" label="Previsão" description="Marcado" variant="secondary" :hoverEffect="false" class="w-full" />
                                <Item head="PLANOS" label="A seguir" description="Salvo" variant="secondary" :hoverEffect="false" class="w-full" />
                            </div>

                            <Button label="Ver todas as vendas" class="w-full" variant="primary" />
                        </div>
                    </template>
                </Card>
            </section>

            <section>
                <Card>
                    <template #header>
                        <h5>Definir meta</h5>
                        <small class="text-muted-foreground!">
                            Define uma meta financeira para ajudar com sua economias
                        </small>
                    </template>
                    
                    <template #body>
                        <div class="flex flex-col gap-4">
                            <Input label="Nome da meta" id="meta" type="text" placeholder="ex. Novo carro, Casa nova" />

                            <div class="grid grid-cols-2 gap-2">
                                <Input
                                    id="alvo"
                                    type="text"
                                    label="Alvo"
                                    placeholder="$ 5,000.00"
                                />

                                <Input label="Data limite" id="data-limite" type="date" />

                                
                            </div>

                            <div class="flex flex-col gap-2">
                                <Button label="Criar meta" variant="primary" class="w-full" />
                                <Button label="Canelar" variant="outline" class="w-full" />
                            </div>
                        </div>
                    </template>
                </Card>
            </section>

            <section>
                <Card>
                    <template #body>
                        <div class="flex flex-col gap-4 justify-center items-center w-full">
                            <QrCode value="https://example.com" />
                            
                            <div class="px-8">
                                <h5 class="text-center">Escaneie para conectar</h5>
                                <p class="text-muted-foreground! text-center">Abra a camera do celu celular e escaneie o QR code para se conectar.</p>
                            </div>
                        </div>
                    </template>
                </Card>
            </section>
        </article>
    </main>
</template>

<script lang="ts">
import type { OptionItem } from "@design/components/internal/OptionsList.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "IndexPage",

    data() {
        return {
            alertModal: false,
            actionOptions: [
                { label: "Conta" },
                { label: "Perfil", value: "user", icon: "fa-user" },
                { label: "Email", value: "email", icon: "fa-envelope", tooltip: "Abrir caixa de entrada" },
                { separator: true },
                { label: "Sair", value: "exit", icon: "fa-right-from-bracket", variant: "destructive" }
            ] as OptionItem[],
        }
    }
});
</script>