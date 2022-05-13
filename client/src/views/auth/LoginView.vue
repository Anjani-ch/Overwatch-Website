<template>
    <main class="main-wrapper container">
        <form @submit.prevent="login($event)" class="bg-white max-w-2xl mx-auto px-6 py-5 rounded-lg shadow-xl">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="redirectMsg" :message="redirectMsg" :useClose="true" title="Success" type="success" />    

            <h1 class="text-3xl">Login</h1>

            <div class="form-group my-6">
                <label for="email" class="form-label inline-block mb-2 text-gray-700 font-bold">Email address</label>
                <input type="text" class="
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border-2 border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none"
                    id="email"
                    name="email"
                    placeholder="Enter Email">
            </div>

            <div class="form-group mb-6">
                <label for="password" class="form-label inline-block mb-2 text-gray-700 font-bold">Password</label>
                <input type="password" class="
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border-2 border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Enter Password">
            </div>

            <Button type="submit" class="w-full">
                Login
            </Button>

            <p class="text-center mt-6 font-bold">
                Don't have an account? <router-link :to="{ name: 'Signup' }" class="text-blue-700">Signup</router-link>
            </p>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'

import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'

import LoginData from '@/types/auth/LoginData'

export default defineComponent({
    name: 'Login',
    components: {
        Button,
        Alert
    },
    setup(): object {
        const { params: { redirectMsg:redirect } } = useRoute()

        const redirectMsg: Ref = ref<string>('')

        if(redirect) {
            redirectMsg.value = redirect
        }

        const login: Function = (e: Event) => {
            const { email, password } = e.target as any

            const data: LoginData = {
                email: email.value,
                password: password.value
            }

            console.log(data)
        }

        const closeAlert: Function = () => {
            redirectMsg.value = ''
        }

        return {
            login,
            redirectMsg,
            closeAlert
        }
    }
})
</script>