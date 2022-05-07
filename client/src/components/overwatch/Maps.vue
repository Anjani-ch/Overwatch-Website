<template>
    <section>
        <h1 class="text-4xl">Maps</h1>
        <p class="mt-5 mb-12">In Overwatch, heroes do battle in diverse locations around the world. From the technological marvels of Busan to the snowy slopes of Nepal, every map has objectives, secrets, and strategies to explore.</p>

        <div class="grid gap-4 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-4 lg:grid-cols-4">
            <MapComponent v-for="map in maps" :key="map.key" :map="map" />
        </div>
    </section>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import MapComponent from '@/components/overwatch/Map.vue'

import Map from '@/interfaces/overwatch/MapInterface'

export default defineComponent({
    name: 'Maps',
    components: {
        MapComponent
    },
    props: {
        maps: {
            type: Array as PropType<Map[]>,
            required: true
        }
    },
    setup({ maps }): object {
        return {
            maps
        }
    }
})
</script>