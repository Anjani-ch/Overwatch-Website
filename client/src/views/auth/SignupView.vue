<template>
        <main class="main-wrapper container">
        <form @submit.prevent="handleSignup" class="bg-white max-w-2xl mx-auto px-6 py-5 rounded-lg shadow-xl">
            <Alert class="mb-6" @closeAlert="closeAlert" v-if="error" :message="error" :useClose="true" title="Error" type="error" />

            <h1 class="text-3xl">Signup</h1>

            <div class="form-group my-6">
                <label for="username" class="form-label inline-block mb-2 text-gray-700 font-bold">Username</label>
                <input v-model="username" type="text" class="
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
                    id="username"
                    name="username"
                    placeholder="Enter Username">
            </div>

            <div class="form-group my-6">
                <label for="email" class="form-label inline-block mb-2 text-gray-700 font-bold">Email address</label>
                <input v-model="email" type="text" class="
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
                <input v-model="password" type="password" class="
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

            <div class="form-group mb-6">
                <label for="confirmPassword" class="form-label inline-block mb-2 text-gray-700 font-bold">Confirm Password</label>
                <input v-model="confirmPassword" type="password" class="
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
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password">
            </div>

            <Spinner class="mb-4" v-if="isLoading" />

            <Button type="submit" class="w-full" :disabled="isLoading">
                Signup
            </Button>

            <p class="text-center mt-6 font-bold">
                Already have an account? <router-link :to="{ name: 'Login' }" class="text-blue-700">Login</router-link>
            </p>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter, Router } from 'vue-router'

import { useStore } from '@/store/store'
import ActionTypes from '@/enums/actionTypes'

import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'

export default defineComponent({
    name: 'Signup',
    components: {
        Button,
        Alert,
        Spinner
    },
    setup(): object {
        const store = useStore()
        const router: Router = useRouter()

        const username: Ref = ref<string>('')
        const email: Ref = ref<string>('')
        const password: Ref = ref<string>('')
        const confirmPassword: Ref = ref<string>('')

        const error: Ref = ref<string>('')
        const isLoading: Ref = ref<boolean>(false)

        const handleSignup: Function = async (): Promise<void> => {
            error.value = ''
            isLoading.value = true

            try {
                await store.dispatch(ActionTypes.SIGNUP_USER, {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value
                })

                router.push({ name: 'Login', params: {
                    redirectMsg: 'You are now signed up, and can log in'
                } })
            } catch(err: any) {
                const errMsg: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

                error.value = errMsg
                console.log(error.value)
            } finally {
                isLoading.value = false
            }
        }

        const closeAlert: Function = () => {
            error.value = ''
        }

        return {
            username,
            email,
            password,
            confirmPassword,
            error,
            isLoading,
            handleSignup,
            closeAlert
        }
    }
})
</script>