<template>
    <main class="main-wrapper container">
        <Spinner v-if="isLoading" />
        <Alert v-if="error" title="Error" type="error" :message="error" />

        <section v-else-if="!isLoading">
            <Carousel class="hidden lg:block" :items="filterMedia(hero.medias, 'pdf')" />

            <div class="grid gap-4 grid-rows-1 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2">
                <div>
                    <h1 class="text-3xl mt-0 lg:mt-9">Biography</h1>

                    <p class="mt-3 italic">"{{ hero.story.catch_phrase }}"</p>

                    <List :items="formatBiograpy(hero.story.biography)" list-style-classes="border-t-2 border-amber-500"  />

                    <Button class="mt-3" data-bs-toggle="modal" data-bs-target="#modal">View Story</Button>

                    <Modal id="modal" :title="`${hero.name}'s Story`" :body="hero.story.back_story" />
                </div>

                <div class="lg:box-border lg:px-12">
                    <h1 class="text-3xl mt-9">Overview</h1>

                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-2xl">Role</h3>
                            <p class="text-xl">{{ hero.role }}</p>
                        </div>

                        <div>
                            <h3 class="text-2xl">Difficulty</h3>

                            <!-- Represent Hero Difficulty With Stars -->
                            <svg v-for="i in hero.difficulty" :key="i" class="inline w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                    </div>

                    <p class="mt-5">{{ hero.description }}</p>
                </div>

                <div>
                    <h1 class="text-3xl mt-3 mb-5">Weapons</h1>

                    <div v-for="(weapon, index) in hero.weapons" :key="weapon.name" class="flex flex-col justify-between lg:flex-row lg:items-center mb-12 lg:mb-0">
                        <img class="box-border pr-8 lg:flex-1" :src="weapon.icon" :alt="`weapon-${index + 1}`">

                        <div class="box-border lg:flex-1">
                            <div class="mb-3" v-if="weapon.primary_fire">
                                <h3 class="text-xl">{{ weapon.primary_fire.name }}</h3>
                                <p>{{ weapon.primary_fire.description }}</p>
                            </div>

                            <div v-if="weapon.secondary_fire">
                                <h3 class="text-xl">{{ weapon.secondary_fire.name }}</h3>
                                <p>{{ weapon.secondary_fire.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:box-border lg:px-12">
                    <h1 class="text-3xl mt-3 mb-5">Abilities</h1>

                    <div v-for="(ability, index) in hero.abilities" :key="index" class="flex items-center justify-between mb-6 ability">
                        <div class="flex-1">
                            <img class="bg-amber-500 p-3 rounded-lg" :src="ability.icon" :alt="ability.name">
                        </div>

                        <div class="flex-1">
                            <h3 class="text-2xl">{{ ability.name }}</h3>
                            <p>{{ ability.description }}</p>
                        </div>
                    </div>
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
import Alert from '@/components/Alert.vue'
import Carousel from '@/components/Carousel.vue'
import List from '@/components/List.vue'
import Modal from '@/components/Modal.vue'

import getHero from '@/composables/overwatch/getHero'

export default defineComponent({
    name: 'HeroView',
    components: {
        Spinner,
        Button,
        Alert,
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
        } = getHero(route.params.id as string)

        const formatBiograpy: Function = (biography: any): string[] => {
            const results: string[] = []

            for(const property in biography) {
                const formatedPropertyName: string = property.toUpperCase().replace(/_/g, ' ') // Replace _ with space
                const formatedValue: string = biography[property].toUpperCase()

                results.push(`${formatedPropertyName}: ${formatedValue}`)
            }

            return results
        }

        const filterMedia: Function = (medias: any[], filterVal: string): object[] => {
            const result = medias.filter((media: any) => media.type !== filterVal)

            return result
        }

        load()

        return {
            isLoading,
            hero: data,
            error,
            formatBiograpy,
            filterMedia
        }
    }
})
</script>

<style scoped>
.ability img {
    width: 90px !important;
    height: 90px !important;
}
</style>