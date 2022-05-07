<template>
  <main class="main-wrapper">
    <section class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2 class="text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">Overwatch</h2>

        <p class="text-bookmark-grey text-lg text-center lg:text-left mb-3">
          Overwatch is a colorful team-based action game starring a diverse cast of powerful heroes. Travel the world, build a team, and contest objectives in exhilarating 6v6 combat.
        </p>
        
        <div class="flex justify-center flex-wrap gap-6">
          <Button isLink :linkRoute="{ name: 'Heroes' }">Get Started</Button>
        </div>
      </div>

      <div class="flex justify-center flex-1 mb-10 md:mb-4 lg:mb-0">
        <img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full lg:w-4/6 lg:h-4/6" src="../assets/overwatch-logo.svg" alt="overwatch-logo" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Button from '@/components/Button.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Button
  }
})
</script>