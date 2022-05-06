<template>
  <main class="main-wrapper container">
    <Spinner :size="12" v-if="isLoading" />

    <section v-if="error">
      <h1>{{ typeof error === 'string' ? error : error.message }}</h1>
    </section>

    <section v-else-if="!isLoading">
      <h1>Heroes</h1>
      <div v-for="hero in heroes" :key="hero.key" class="max-w-sm rounded overflow-hidden shadow-lg">

        <img class="w-full" :src="hero.portrait" alt="Sunset in the mountains">

        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ hero.name.toUpperCase() }}</div>
          <p class="text-gray-700 text-base">
            {{ hero.role.toUpperCase() }}
          </p>
        </div>

        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import axios, { AxiosError } from 'axios'

import { defineComponent, ref, onMounted } from 'vue'

import Spinner from '@/components/Spinner.vue'

import RequestError from '@/types/RequestError'

export default defineComponent({
  name: 'HeroesView',
  components: {
    Spinner,
  },
  setup() {
    const isLoading = ref<boolean>(true)
    const heroes = ref<any>()
    const error = ref<RequestError>()

    onMounted(async (): Promise<void> => {
      try {
        const data = (await axios.get('/api/overwatch/heroes')).data
        
        heroes.value = data
        console.log(heroes.value)
      } catch (err: any) {
        let result: RequestError

        if(err.response.status === 500) {
          result = 'Error getting heroes'
        } else {
          result = err as AxiosError
        }

        error.value = result
      } finally {
        isLoading.value = false
      }
    })

    return {
      isLoading,
      heroes,
      error
    }
  }
})
</script>