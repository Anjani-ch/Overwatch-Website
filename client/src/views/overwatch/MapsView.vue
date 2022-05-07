<template>
  <main class="main-wrapper container">
    <Spinner v-if="isLoading" />
    <Error v-if="error" :error="error" />
    <Maps v-else-if="!isLoading" :maps="maps" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Error from '@/components/Error.vue'
import Maps from '@/components/overwatch/Maps.vue'

import getMaps from '@/composables/overwatch/getMaps'

export default defineComponent({
  name: 'MapsView',
  components: {
    Spinner,
    Error,
    Maps
  },
  setup(): object {
    const {
      data,
      error,
      isLoading,
      load
    } = getMaps()

    load()

    return {
      isLoading,
      maps: data,
      error
    }
  }
})
</script>