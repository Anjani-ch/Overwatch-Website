<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from './store/store'
import ActionTypes from './enums/actionTypes'
import MutationTypes from './enums/mutationTypes'

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

    const verifyUser: Function = async (): Promise<void> => {
        try {
          if(userInStorage) {
            const isValid = await store.dispatch(ActionTypes.VERIFY_JWT_TOKEN, userInStorage.token)

            if(isValid) {
              store.commit(MutationTypes.SET_USER, userInStorage)
            } else {
              store.commit(MutationTypes.RESET_AUTH, null)
            }
          }
        } catch (err) {
          console.log(err)
        }
    }

    verifyUser()
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