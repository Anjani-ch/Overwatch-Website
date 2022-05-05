<template>
  <main class="main-wrapper container flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-around">
    <section>
      <h1 class="text-3xl text-center mb-6 mt-3 sm:text-4xl md:!text-5xl lg:text-left lg:text-7xl lg:mt-0">Overwatch</h1>
      <p class="font-bold mb-5 lg:w-4/5">overwatch is a colorful team-based action game starring a diverse cast of powerful heroes. Travel the world, build a team, and contest objectives in exhilarating 6v6 combat.</p>
    </section>

    <img class="w-44 lg:w-3/12" src="../assets/overwatch-logo.svg" alt="overwatch-logo">
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>