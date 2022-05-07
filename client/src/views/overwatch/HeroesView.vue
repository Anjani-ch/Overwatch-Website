<template>
  <main class="main-wrapper container">
    <Spinner v-if="isLoading" />
    <Error v-if="error" :error="error" />
    <Heroes v-else-if="!isLoading" :heroes="heroes" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Heroes from '@/components/overwatch/Heroes.vue'

import getHeroes from '@/composables/overwatch/getHeroes'

export default defineComponent({
  name: 'HeroesView',
  components: {
    Spinner,
    Error,
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