<template>
    <nav class="bg-white rounded border-b border-gray-200 px-2 py-2.5 mb-16 sm:px-4">
        <div class="container flex flex-wrap justify-between items-center">
            <!-- Nav Logo -->
            <router-link :to="{ name: 'Home' }" class="flex items-center">
                <img src="../assets/overwatch-logo.svg" class="mr-3 h-6 sm:h-9" alt="overwatch-logo">
            </router-link>
            
            <button data-collapse-toggle="menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="menu" aria-expanded="false" @click="toggleNav">
                <!-- Close Icon -->
                <svg :class="[isToggled ? 'hidden' : '', 'w-6 h-6']" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>

                <!-- Menu Icon -->
                <svg :class="[!isToggled ? 'hidden' : '', 'w-6 h-6']" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>

            <div class="w-full md:block md:w-auto" id="menu">
                <ul :class="[!isToggled ? 'hidden' : '', 'md:flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium']">
                    <li>
                        <router-link :to="{ name: 'Home' }" :class="navLinkClass" :active-class="navLinkActiveClass">Home</router-link>
                    </li>

                    <li v-if="user">
                        <router-link :to="{ name: 'Heroes' }" :class="navLinkClass" :active-class="navLinkActiveClass">Heroes</router-link>
                    </li>

                    <li v-if="user">
                        <router-link :to="{ name: 'Maps' }" :class="navLinkClass" :active-class="navLinkActiveClass">Maps</router-link>
                    </li>

                    <li v-if="user">
                        <router-link :to="{ name: 'GameModes' }" :class="navLinkClass" :active-class="navLinkActiveClass">Game Modes</router-link>
                    </li>

                    <li v-if="user">
                        <router-link :to="{ name: 'HostingDocs' }" :class="navLinkClass" :active-class="navLinkActiveClass">Hosting</router-link>
                    </li>

                    <li @click="handleLogout" v-if="user">
                        <button :class="navLinkClass" :active-class="navLinkActiveClass">Logout</button>
                    </li>

                    <li v-if="!user">
                        <router-link :to="{ name: 'Login' }" :class="navLinkClass" :active-class="navLinkActiveClass">Login</router-link>
                    </li>

                    <li v-if="!user">
                        <router-link :to="{ name: 'Signup' }" :class="navLinkClass" :active-class="navLinkActiveClass">Signup</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue'
import { useRouter, Router } from 'vue-router'

import { useStore } from '../store/store'
import MutationTypes from '../enums/mutationTypes'

import IUser from '@/interfaces/IUser'

export default defineComponent({
    name: 'Navbar',
    setup(): object {
        const router: Router = useRouter()

        const store = useStore()

        const isToggled = ref<boolean>(false)

        const navLinkClass: string = 'block py-2 pr-4 pl-3 font-bold text-gray-700 transition-colors ease-in hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0'
        const navLinkActiveClass: string = '!text-white !bg-amber-500 !rounded md:!bg-transparent md:!text-amber-500 md:!p-0'

        const user: ComputedRef<IUser> = computed(() => store.state.user)

        const toggleNav: Function = (): void => {
            isToggled.value = !isToggled.value
        }

        const handleLogout: Function = (): void => {
            store.commit(MutationTypes.RESET_AUTH, null)
            router.push({ name: 'Login', params: {
                redirectMsg: 'You have been successfully logged out',
                redirectType: 'success',
                redirectTitle: 'Success'
            }})
        }
        
        return {
            isToggled,
            navLinkClass,
            navLinkActiveClass,
            toggleNav,
            handleLogout,
            user
        }
    }
})
</script>