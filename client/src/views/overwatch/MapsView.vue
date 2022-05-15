<template>
  <main class="main-wrapper container" v-if="maps">
    <Spinner v-if="isLoading" />
    <Alert v-if="error" type="error" title="Error" :message="error" />
    <Maps v-else-if="!isLoading" :maps="maps" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Spinner from '@/components/Spinner.vue'
import Alert from '@/components/Alert.vue'
import Maps from '@/components/overwatch/Maps.vue'

import getMaps from '@/composables/overwatch/getMaps'

export default defineComponent({
  name: 'MapsView',
  components: {
    Spinner,
    Alert,
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