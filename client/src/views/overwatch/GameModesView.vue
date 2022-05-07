<template>
  <main class="main-wrapper container">
    <Spinner v-if="isLoading" />
    <Error v-if="error" :error="error" />
    <GameModes v-else-if="!isLoading" :gameModes="gameModes" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import GameModes from '@/components/overwatch/GameModes.vue'

import getGameModes from '@/composables/overwatch/getGameModes'

export default defineComponent({
  name: 'MapsView',
  components: {
    Spinner,
    Error,
    GameModes
  },
  setup(): object {
    const {
      data,
      error,
      isLoading,
      load
    } = getGameModes()

    load()

    return {
      isLoading,
      gameModes: data,
      error
    }
  }
})
</script>