<template>
  <main class="main-wrapper container" v-if="heroes">
    <Spinner v-if="isLoading" />
    <Alert v-if="error" title="Error" type="error" :message="error" />
    <Heroes v-else-if="!isLoading" :heroes="heroes" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Alert from '@/components/Alert.vue'
import Heroes from '@/components/overwatch/Heroes.vue'

import getHeroes from '@/composables/overwatch/getHeroes'

export default defineComponent({
  name: 'HeroesView',
  components: {
    Spinner,
    Alert,
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