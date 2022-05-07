<template>
    <div class="w-full rounded overflow-hidden shadow-2xl mx-auto sm:mx-0">

        <img class="w-full" :src="hero.portrait" alt="Sunset in the mountains">

        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ hero.name.toUpperCase() }}</div>

            <p class="text-gray-700 text-base">
                {{ hero.role.toUpperCase() }}
            </p>
        </div>

        <div class="px-6 pt-4 pb-2">
            <Button isLink :linkRoute="{ name: 'Hero', params: { key: hero.key } }">Details</Button>
        </div>
    </div>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import Button from '@/components/Button.vue'

import Hero from '@/interfaces/overwatch/HeroInterface'

export default defineComponent({
    name: 'Heroe',
    components: {
        Button
    },
    props: {
        hero: {
            type: Object as PropType<Hero>,
            required: true
        }
    },
    setup({ hero }): object {
        return {
            hero
        }
    }
})
</script>