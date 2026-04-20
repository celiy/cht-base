<template>
    <main>
        <Sidebar>
            <RouterView />
        </Sidebar>
    </main>
</template>

<script lang="ts">
import Sidebar from '@design/components/custom/Sidebar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',

    components: {
        Sidebar
    }
});
</script>