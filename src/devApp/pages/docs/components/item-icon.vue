<template>
    <article class="container-sm docs-article">
        <section>
            <h1>ItemIcon</h1>

            <p>
                Ícone dentro de um recorte com fundo. Serve de base para o <code>Item</code>, mas
                também funciona sozinho. Sem <code>icon</code>, o componente não renderiza nada.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="ItemIcon">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon icon="fa-home" />
                    <ItemIcon icon="fa-solid fa-user" />
                    <ItemIcon icon="fa-brands fa-github" />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Ícone</h3>

            <p>
                <code>icon</code> aceita o nome curto (<code>"home"</code> ou
                <code>"fa-home"</code>, tratado como <code>fa-solid</code>) ou as classes completas.
                Para ícones de marca, use as classes completas, como
                <code>"fa-brands fa-github"</code>.
            </p>
        </section>

        <section>
            <h3>Variante</h3>

            <p>
                <code>variant="default / primary / secondary / success / warning / destructive /
                info"</code>. O padrão é <code>primary</code>. Em <code>default</code>, nada é
                pintado e o ícone herda a cor do texto ao redor.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Variante">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon
                        icon="fa-home"
                        variant="default"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="primary"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="secondary"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="success"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="warning"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="destructive"
                    />
                    <ItemIcon
                        icon="fa-home"
                        variant="info"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tamanho</h3>

            <p>
                <code>size="sm / md / lg"</code>. O padrão é <code>md</code>.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tamanho">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon
                        icon="fa-home"
                        size="sm"
                    />
                    <ItemIcon
                        icon="fa-home"
                        size="md"
                    />
                    <ItemIcon
                        icon="fa-home"
                        size="lg"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Tipo</h3>

            <p>
                <code>type="card / icon"</code>. Em <code>card</code> (padrão) o ícone fica num
                recorte com fundo. Em <code>icon</code> fica só o ícone, sem fundo nem padding.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Tipo">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon
                        icon="fa-home"
                        type="card"
                    />
                    <ItemIcon
                        icon="fa-home"
                        type="icon"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Desativado</h3>

            <p>
                <code>disabled</code> reduz a opacidade do fundo.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Desativado">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon icon="fa-home" />
                    <ItemIcon
                        icon="fa-home"
                        disabled
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Estilo do fundo e do ícone</h3>

            <p>
                <code>backgroundStyle</code> recebe classes que pintam o fundo do recorte, e
                <code>iconStyle</code> recebe classes do ícone. Com <code>iconStyle</code>, o
                tamanho e a cor da variante deixam de ser aplicados.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Estilo do fundo e do ícone">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon
                        icon="fa-star"
                        background-style="bg-warning/20"
                        icon-style="text-2xl text-warning"
                    />
                    <ItemIcon
                        icon="fa-heart"
                        background-style="bg-destructive/20"
                        icon-style="text-2xl text-destructive"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>Conteúdo próprio</h3>

            <p>
                O slot padrão substitui o ícone, por exemplo por uma imagem. Mesmo assim,
                <code>icon</code> precisa ter algum valor para o componente renderizar. Para uma cor
                que não existe como classe, use <code>variant="default"</code> e passe o fundo em
                <code>style</code>, que vai direto para o elemento raiz.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Conteúdo próprio">
                <div class="flex flex-wrap items-center gap-3 p-4">
                    <ItemIcon
                        v-for="tech in techs"
                        :key="tech.name"

                        :icon="tech.name"
                        size="sm"
                        variant="default"
                        :style="{ backgroundColor: `${tech.color}26` }"
                    >
                        <img
                            class="h-8 w-8"

                            :src="tech.image"
                            :alt="tech.name"
                        />
                    </ItemIcon>
                </div>
            </DocsExample>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemIcon from "@design/components/ItemIcon.vue";

export default defineComponent({
    name: "ComponentsItemIcon",

    components: {
        ItemIcon
    },

    data() {
        return {
            techs: [
                {
                    name: "Vue.js",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
                    color: "#4FC08D"
                },
                {
                    name: "TypeScript",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                    color: "#3178C6"
                },
                {
                    name: "Docker",
                    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                    color: "#2496ED"
                }
            ]
        };
    }
});
</script>
