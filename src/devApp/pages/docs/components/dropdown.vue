<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-8">
        <section>
            <h1 class="mb-2">
                Dropdown
            </h1>

            <p class="text-muted-foreground!">
                Menu de ações a partir de um botão. Opções podem ter ícone, valor e separadores.
            </p>
        </section>

        <section class="mb-8">
            <Card variant="transparent">
                <template #body>
                    <div class="p-4 max-w-xs">
                        <Dropdown
                            header="Ações"

                            :options="[
                                { label: 'Account' },
                                { label: 'User', value: 'user', icon: 'fa-user' },
                                { label: 'Email', value: 'email', icon: 'fa-envelope' },
                                { separator: true },
                                { label: 'Exit', value: 'exit', icon: 'fa-right-from-bracket' }
                            ]"
                        />
                    </div>
                </template>
            </Card>
        </section>

        <section>
            <h3 class="mb-2">
                Props
            </h3>

            <p>
                <code>options</code>, <code>header</code>, <code>search</code> opcional para filtrar itens.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@design/components/Card.vue";
import Dropdown from "@design/components/Dropdown.vue";

export default defineComponent({
    name: "ComponentsDropdown",

    components: {
        Card,
        Dropdown
    }
});
</script>
