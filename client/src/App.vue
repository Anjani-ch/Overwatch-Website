<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from './store/store'
import ActionTypes from './enums/actionTypes'

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
            await store.dispatch(ActionTypes.VERIFY_JWT_TOKEN, userInStorage)
          }
        } catch (err) {
          console.log(err)
        }
    }

    verifyUser()
  }
})
</script>