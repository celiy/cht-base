<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Pagination
            </h1>

            <p>
                Navegação por páginas com ellipsis e popover para páginas ocultas.
            </p>
        </section>

        <section class="mb-8">
            <DocsExample label="Pagination">
                <div class="p-4">
                    <Pagination
                        id="docs-pagination"
                        :amount="12"
                        :show-max="5"
                    />
                </div>
            </DocsExample>
        </section>

        <section>
            <h3>
                Props
            </h3>

            <p>
                <code>amount</code> total de páginas, <code>showMax</code> quantas ficam visíveis,
                <code>useMemo</code> para persistir a página.
            </p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Pagination from "@design/components/custom/Pagination.vue";

export default defineComponent({
    name: "ComponentsPagination",

    components: {
        Pagination
    }
});
</script>
