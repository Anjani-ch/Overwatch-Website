<template>
    <div class="w-full rounded overflow-hidden shadow-2xl mx-auto sm:mx-0">

        <img class="w-full" :src="map.thumbnail" :alt="map.name">

        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 flex items-center justify-between">
                <p>{{ map.name.toUpperCase() }}</p>
                <img class="w-1/6" :src="map.flag" :alt="`${map.name}-Flag`">
            </div>

            <List :items="map.gamemodes" list-style-classes="border-t" />
        </div>
    </div>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import Map from '@/interfaces/overwatch/MapInterface'
import List from '@/components/List.vue'

export default defineComponent({
    name: 'Map',
    components: {
        List
    },
    props: {
        map: {
            type: Object as PropType<Map>,
            required: true
        }
    },
    setup({ map }): object {
        return {
            map
        }
    }
})
</script>