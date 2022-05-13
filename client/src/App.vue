<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from './store/store'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import IUser from '@/interfaces/IUser'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup(): void {
    const store = useStore()

    const userInStorage: IUser | null = JSON.parse(localStorage.getItem('user') as string)

    store.commit('SET_USER', userInStorage)

    // setTimeout(() => {
    //   store.commit('SET_USER', {
    //     username: '',
    //     email: ''
    //   })
    // }, 5000)
  }
})
</script>

<style>
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: rgb(236, 236, 236);
  }

  .main-wrapper {
    flex: 1 0 auto;
  }
</style>