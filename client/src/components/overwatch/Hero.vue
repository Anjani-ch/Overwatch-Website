<template>
    <div class="w-full rounded overflow-hidden shadow-2xl mx-auto sm:mx-0">

        <img class="w-full" :src="hero.portrait" :alt="hero.name">

        <div class="px-6 pt-4">
            <div class="font-bold text-xl mb-2 flex items-center justify-between">
                <p>{{ hero.name.toUpperCase() }}</p>

                <span class="px-4 py-2 rounded-md text-gray-500 bg-gray-300 font-semibold text-sm flex align-center w-max active:bg-gray-300 transition duration-300 ease">
                {{ hero.role.toUpperCase() }}
            </span>
            </div>
        </div>

        <div class="px-6 pt-4 pb-2">
            <Button isLink :linkRoute="{ name: 'Hero', params: { id: hero.key } }">Details</Button>
        </div>
    </div>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import Button from '@/components/Button.vue'

import Hero from '@/interfaces/overwatch/HeroInterface'

export default defineComponent({
    name: 'Hero',
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