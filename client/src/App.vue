<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer
  }
})
</script>

<style>
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .main-wrapper {
    flex: 1 0 auto;
  }
</style>