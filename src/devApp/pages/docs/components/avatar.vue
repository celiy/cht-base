<template>
    <article class="container-sm docs-article">
        <section>
            <h1>Avatar</h1>

            <p>
                Foto circular ou silhueta padrão. Opcionalmente mostra presença com
                <code>status</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Avatar">
                <div class="flex flex-wrap items-end gap-4 p-8">
                    <Avatar />

                    <Avatar :image="avatarImage" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanho</h3>

            <p>
                <code>size="small / medium / large"</code>. O padrão é <code>medium</code>. Também
                aceita qualquer medida CSS, como <code>size="5rem"</code>, aplicada como largura e
                altura.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap items-end gap-4 p-8">
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
            <h3>Tamanho customizado</h3>

            <p>
                Qualquer medida CSS em <code>size</code> define a largura e a altura do avatar. Com
                tamanho customizado, o ponto de <code>status</code> e a <code>badge</code> seguem as
                posições dos tamanhos padrão.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho customizado">
                <div class="flex flex-wrap items-end gap-4 p-8">
                    <Avatar
                        size="3rem"
                        :image="avatarImage"
                    />

                    <Avatar
                        size="5rem"
                        :image="avatarImage"
                    />

                    <Avatar
                        size="8rem"
                        :image="avatarImage"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Status</h3>

            <p>
                <code>status="online / away / do-not-disturb / offline"</code>. Sem
                <code>status</code>, o ponto não aparece.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Status">
                <div class="flex flex-wrap items-end gap-4 p-8">
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
            <h3>Badge</h3>

            <p>
                Pode receber uma badge customizavel. <code>badge</code> recebe
                <code>attributes</code> que são os atributos da badge e <code>position</code> que
                pode ser <code>"top-left" | "top-right" | "bottom-left" | "bottom-right"</code>
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Status">
                <div class="flex flex-wrap items-end gap-8 p-8">
                    <Avatar
                        :image="avatarImage"
                        :badge="{
                            attributes: { label: '1', variant: 'destructive' },
                            position: 'top-right'
                        }"
                    />

                    <Avatar
                        :image="avatarImage"
                        :badge="{
                            attributes: {
                                label: 'Online',
                                variant: 'success',
                                class: 'text-[0.5rem] px-[0.3rem]'
                            },
                            position: 'bottom-right'
                        }"
                    />

                    <Avatar
                        :image="avatarImage"
                        :badge="{
                            attributes: { label: '1', variant: 'destructive' },
                            position: 'top-left'
                        }"
                    />

                    <Avatar
                        :image="avatarImage"
                        :badge="{
                            attributes: { label: '1', variant: 'destructive' },
                            position: 'bottom-left'
                        }"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Sem imagem</h3>

            <p>
                Sem a prop <code>image</code>, o Avatar usa o SVG padrão com
                <code>--color-muted</code> e <code>--color-muted-foreground</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Sem imagem">
                <div class="flex flex-wrap items-end gap-4 p-8">
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
            <h3>Loading</h3>

            <p>
                <code>loading</code> troca o Avatar por um <code>Skeleton</code> do tipo
                <code>avatar</code> no mesmo <code>size</code>. O exemplo abaixo espera 2 segundos.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Loading">
                <div class="flex flex-wrap items-center gap-4 p-8">
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

        <section>
            <h3>Lazy</h3>

            <p>
                <code>lazy</code> só define a imagem quando o Avatar entra na tela. Até lá, aparece
                o SVG padrão. Role a lista abaixo: os avatares do fim só carregam ao aparecer.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Lazy">
                <div class="h-64 overflow-y-auto p-4">
                    <div class="flex flex-col gap-3">
                        <Avatar
                            v-for="item in 40"
                            :key="item"

                            lazy
                            :image="avatarImage"
                        />
                    </div>
                </div>
            </DocsExample>
        </section>
    </article>
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
