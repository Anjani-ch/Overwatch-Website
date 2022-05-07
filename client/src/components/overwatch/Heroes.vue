<template>
    <section>
        <h1 class="text-4xl">Heroes</h1>
        <p class="mt-5 mb-12">When you enter a game of Overwatch, you'll need to choose a hero to play. Maybe a cannon-toting ape from the moon appeals to you. Perhaps you prefer a time-traveling freedom fighter. Or is a beat-dropping battlefield DJ more your style? Whoever you want to be, there's an Overwatch hero for you.</p>

        <div class="grid gap-4 grid-cols-1 grid-rows-1 sm:grid-rows-2 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 lg:grid-rows-5 lg:grid-cols-5">
            <HeroComponent v-for="hero in heroes" :key="hero.key" :hero="hero" />
        </div>
    </section>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import Button from '@/components/Button.vue'
import HeroComponent from '@/components/overwatch/Hero.vue'

import Hero from '@/interfaces/overwatch/HeroInterface'

export default defineComponent({
    name: 'Heroes',
    components: {
        Button,
        HeroComponent
    },
    props: {
        heroes: {
            type: Array as PropType<Hero[]>,
            required: true
        }
    },
    setup({ heroes }): object {
        return {
            heroes
        }
    }
})
</script>