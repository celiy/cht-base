<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Avatar
            </h1>

            <p>
                Foto circular ou silhueta padrão. Opcionalmente mostra presença com
                <code>status</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Avatar">
                <div class="p-8 flex flex-wrap gap-4 items-end">
                    <Avatar />

                    <Avatar :image="avatarImage" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Tamanho
            </h3>

            <p>
                <code>size="small / medium / large"</code>. O padrão é <code>medium</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="p-8 flex flex-wrap gap-4 items-end">
                    <Avatar
                        size="small"
                        :image="avatarImage"
                    />

                    <Avatar
                        size="medium"
                        :image="avatarImage"
                    />

                    <Avatar
                        size="large"
                        :image="avatarImage"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Status
            </h3>

            <p>
                <code>status="online / away / do-not-disturb / offline"</code>.
                Sem <code>status</code>, o ponto não aparece.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Status">
                <div class="p-8 flex flex-wrap gap-4 items-end">
                    <Avatar
                        status="online"
                        :image="avatarImage"
                    />

                    <Avatar
                        status="away"
                        :image="avatarImage"
                    />

                    <Avatar
                        status="do-not-disturb"
                        :image="avatarImage"
                    />

                    <Avatar
                        status="offline"
                        :image="avatarImage"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Sem imagem
            </h3>

            <p>
                Sem a prop <code>image</code>, o Avatar usa o SVG padrão com
                <code>--color-muted</code> e <code>--color-muted-foreground</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Sem imagem">
                <div class="p-8 flex flex-wrap gap-4 items-end">
                    <Avatar size="small" />

                    <Avatar size="medium" />

                    <Avatar
                        size="large"
                        status="online"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Loading
            </h3>

            <p>
                <code>loading</code> troca o Avatar por um <code>Skeleton</code> do tipo
                <code>avatar</code> no mesmo <code>size</code>. O exemplo abaixo espera 2 segundos.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Loading">
                <div class="p-8 flex flex-wrap gap-4 items-center">
                    <Avatar
                        :image="loadedImage"
                        :loading="isLoading"
                    />

                    <Button
                        label="Carregar imagem"
                        variant="secondary"
                        :disabled="isLoading"

                        @click="loadImage"
                    />
                </div>
            </DocsExample>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "@design/components/Avatar.vue";
import Button from "@design/components/Button.vue";
import avatarImage from "@/assets/images/celi_avatar.png";

export default defineComponent({
    name: "ComponentsAvatar",

    components: {
        Avatar,
        Button
    },

    data() {
        return {
            avatarImage,
            loadedImage: undefined as string | undefined,
            isLoading: false,
            loadTimer: null as number | null
        };
    },

    beforeUnmount() {
        this.clearLoadTimer();
    },

    methods: {
        /**
         * Clears the demo load timeout if it is still pending.
         */
        clearLoadTimer() {
            if (this.loadTimer == null) {
                return;
            }

            window.clearTimeout(this.loadTimer);
            this.loadTimer = null;
        },

        /**
         * Simulates a 2s fetch: skeleton first, then the sample image.
         */
        loadImage() {
            this.clearLoadTimer();
            this.loadedImage = undefined;
            this.isLoading = true;

            this.loadTimer = window.setTimeout(() => {
                this.loadedImage = this.avatarImage;
                this.isLoading = false;
                this.loadTimer = null;
            }, 2000);
        }
    }
});
</script>
