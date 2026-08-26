<template>
    <main class="container-sm mt-4 md:mt-8 flex flex-col gap-4">
        <section>
            <h1>
                Marker
            </h1>

            <p>
                Em breve.
            </p>
        </section>

        <Marker separator/>
        <Marker separator class="h-24" orientation="vertical"/>
        <Marker separator label="Separator"/>

        <Marker label="Marker"/>
        <Marker left-icon="fa-location-pin" label="Marker with left icon"/>
        <Marker :left-number="1" label="Marker with left number"/>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Marker from "@design/components/Marker.vue";

export default defineComponent({
    name: "ComponentsMarker",

    components: {
        Marker
    }
});
</script>
