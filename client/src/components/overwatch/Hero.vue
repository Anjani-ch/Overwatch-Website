<template>
    <div class="w-full rounded overflow-hidden shadow-2xl mx-auto sm:mx-0">

        <img class="w-full" :src="hero.portrait" :alt="hero.name">

        <div class="px-6 pt-4">
            <div class="font-bold text-xl mb-2 flex items-center justify-between">
                <p>{{ hero.name.toUpperCase() }}</p>

                <span class="font-semibold text-sm">
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

import IHero from '@/interfaces/overwatch/IHero'

export default defineComponent({
    name: 'Hero',
    components: {
        Button
    },
    props: {
        hero: {
            type: Object as PropType<IHero>,
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