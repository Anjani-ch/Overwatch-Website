<template>
  <main class="main-wrapper container">
    <div id="loading-wrapper" class="text-center">
      <Spinner v-if="isLoading" />
    </div>

    <h1 v-if="error">{{ error }}</h1>

    <Heroes v-else-if="!isLoading" :heroes="heroes" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Heroes from '@/components/overwatch/Heroes.vue'

import getHeroes from '@/composables/overwatch/getHeroes'

export default defineComponent({
  name: 'HeroesView',
  components: {
    Spinner,
    Heroes
  },
  setup(): object {
    const {
      data,
      error,
      isLoading,
      load
    } = getHeroes()

    load()

    return {
      isLoading,
      heroes: data,
      error
    }
  }
})
</script>