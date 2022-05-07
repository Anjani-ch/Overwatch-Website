<template>
    <main class="main-wrapper container">
        <Spinner v-if="isLoading" />
        <Error v-if="error" :error="error" />

        <section v-else-if="!isLoading">
            <Carousel :items="hero.medias" />

            <div class="grid gap-4 grid-rows-1 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2">
                <div>
                    <h1 class="text-3xl mt-9">Biography</h1>

                    <p class="mt-3 italic">"{{ hero.story.catch_phrase }}"</p>

                    <List :items="formatBiograpy(hero.story.biography)" list-style-classes="border-t border-b"  />

                    <Button class="mt-3" data-bs-toggle="modal" data-bs-target="#modal">View Story</Button>

                    <Modal id="modal" :title="`${hero.name}'s Story`" :body="hero.story.back_story" />
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import {  defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import Carousel from '@/components/Carousel.vue'
import List from '@/components/List.vue'
import Modal from '@/components/Modal.vue'

import Hero from '@/interfaces/overwatch/HeroInterface'

import getHero from '@/composables/overwatch/getHero'

export default defineComponent({
    name: 'HeroView',
    components: {
        Spinner,
        Button,
        Error,
        Carousel,
        List,
        Modal
    },
    setup(): object {
        const route = useRoute();

        const {
            data,
            error,
            isLoading,
            load
        } = getHero(route.params.id)

        const formatBiograpy = (biography: any): string[] => {
            const results: string[] = []

            for(const property in biography) {
                results.push(`${property.toUpperCase().replace(/_/g, ' ')}: ${biography[property].toUpperCase()}`)
            }

            return results
        }

        load()

        return {
            isLoading,
            hero: data as Hero,
            error,
            formatBiograpy
        }
    }
})
</script>

<style scoped>
    a {
        color: blue;
        text-decoration: underline;
    }
</style>