<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Chat
            </h1>

            <p>
                Lista de mensagens em bolhas. A prop <code>messages</code> é um array de objetos.
                Com <code>sent</code>, <code>read</code>, <code>pending</code> ou <code>failed</code>
                a bolha vai para a direita; sem isso, para a esquerda.
                Clique direito (ou long-press) abre o menu: copiar texto ou a imagem clicada.
                Só um menu de contexto fica aberto de cada vez.
            </p>
        </section>

        <section>
            <h3>
                Texto, estado e agrupamento
            </h3>

            <p>
                Bolhas consecutivas do mesmo lado partilham cantos
                (<code>rounded-xl</code> / <code>rounded-md</code>).
                <code>date</code> mostra a hora; <code>edited</code> e <code>editedAt</code>
                marcam a mensagem como editada.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Texto e estado">
                <div class="p-4">
                    <Chat :messages="statusMessages" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Links
            </h3>

            <p>
                URLs <code>https://</code> ou <code>www.</code> no <code>text</code> viram links
                (sublinhados, abrem noutro separador). A cor vem de <code>text-contrast</code>
                para ficar legível no fundo da bolha.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Links">
                <div class="p-4">
                    <Chat :messages="linkMessages" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Imagens
            </h3>

            <p>
                <code>images</code> é um array de URLs. Uma imagem fica no formato original;
                várias ficam numa grelha 1:1. Clique em qualquer foto abre o carousel
                da mensagem nesse índice. Mais de quatro mostra <code>+N</code> na 4.ª.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Imagens">
                <div class="p-4">
                    <Chat :messages="imageMessages" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Reações
            </h3>

            <p>
                <code>reactions: [{ reaction, amount }]</code>. Até três emojis visíveis;
                o resto fica num tooltip <code>+N</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Reações">
                <div class="p-4">
                    <Chat :messages="reactionMessages" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Menu de contexto
            </h3>

            <p>
                Clique direito no <strong>texto</strong> → Copiar texto.
                Clique direito numa <strong>imagem</strong> → Copiar imagem (só essa).
                Responder, Encaminhar e Excluir ainda são só visuais.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent, type Component } from "vue";
import Chat from "@design/components/custom/Chat.vue";
import avatarImage from "@/assets/images/celi_avatar.png";
import landscapeImage from "@/assets/images/landscape.jpg";
import verticalLandscapeImage from "@/assets/images/vertical_landscape.jpg";
import squareImage from "@/assets/images/square_image.webp";
import portraitImage from "@/assets/images/portrait.jpg";

const docsComponents: Record<string, Component> = {
    Chat: Chat as Component
};

export default defineComponent({
    name: "ComponentsChat",

    components: docsComponents,

    data() {
        return {
            statusMessages: [
                { text: "Só texto, à esquerda." },
                { text: "Enviada.", sent: true, date: new Date() },
                { text: "Agrupada com a anterior.", sent: true, date: new Date() },
                { text: "Editada.", read: true, edited: true, editedAt: new Date(), date: new Date() },
                { text: "Ainda a enviar.", pending: true, date: new Date() },
                { text: "Falhou o envio.", failed: true, date: new Date() }
            ],
            linkMessages: [
                {
                    text: "Docs do Chat: https://cht-dev.netlify.app/docs/components/chat",
                    date: new Date()
                },
                {
                    text: "Também www.example.com no meio da frase.",
                    sent: true,
                    date: new Date()
                }
            ],
            imageMessages: [
                { text: "Uma imagem", images: [landscapeImage], date: new Date() },
                { images: [verticalLandscapeImage, landscapeImage], date: new Date() },
                { images: [verticalLandscapeImage, landscapeImage, squareImage], date: new Date() },
                {
                    text: "Mais de quatro",
                    images: [
                        verticalLandscapeImage,
                        landscapeImage,
                        squareImage,
                        portraitImage,
                        avatarImage,
                        landscapeImage
                    ],
                    date: new Date()
                }
            ],
            reactionMessages: [
                {
                    text: "Uma reação",
                    reactions: [{ reaction: "👋", amount: 3 }],
                    sent: true,
                    date: new Date()
                },
                {
                    text: "Várias reações",
                    reactions: [
                        { reaction: "🤏", amount: 1 },
                        { reaction: "🙌", amount: 3 },
                        { reaction: "👌", amount: 1 },
                        { reaction: "🤙", amount: 1 },
                        { reaction: "☝️", amount: 4 },
                        { reaction: "👀", amount: 1 }
                    ],
                    date: new Date()
                }
            ]
        };
    }
});
</script>
