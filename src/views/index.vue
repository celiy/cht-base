<template>
    <main class="min-h-screen flex items-center justify-center bg-background">
        <Card class="max-w-md">
            <template #body>
                <h4>Credenciais</h4>

                <small class="mb-4 text-muted-foreground!">
                    Entre na sua conta para continuar
                </small>

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Digite seu email"
                    class="w-full mb-4"
                />

                <Input
                    id="password"
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    class="w-full"
                />
            </template>

            <template #footer>
                <Button type="submit">
                    Entrar
                </Button>
            </template>
        </Card>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "@design/components/Input.vue";
import Button from "@design/components/Button.vue";
import Card from "@design/components/Card.vue";

export default defineComponent({
    name: "IndexPage",
    components: {
        Input,
        Button,
        Card
    }
});
</script>