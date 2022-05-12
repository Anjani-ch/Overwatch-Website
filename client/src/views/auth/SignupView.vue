<template>
        <main class="main-wrapper container">
        <form class="bg-white max-w-2xl mx-auto px-6 py-5 rounded-lg shadow-xl">
            <h1 class="text-3xl">Signup</h1>

            <div class="form-group my-6">
                <label for="username" class="form-label inline-block mb-2 text-gray-700 font-bold">Username</label>
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
                    id="username"
                    name="username"
                    placeholder="Enter Username">
            </div>

            <div class="form-group my-6">
                <label for="email" class="form-label inline-block mb-2 text-gray-700 font-bold">Email address</label>
                <input type="email" class="
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

            <div class="form-group mb-6">
                <label for="confirmPassword" class="form-label inline-block mb-2 text-gray-700 font-bold">Confirm Password</label>
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
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password">
            </div>

            <Button type="submit" class="w-full">
                Signup
            </Button>

            <p class="text-center mt-6 font-bold">
                Already have an account? <router-link :to="{ name: 'Login' }" class="text-blue-700">Login</router-link>
            </p>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Button from '@/components/Button.vue'

export default defineComponent({
    name: 'Signup',
    components: {
        Button
    }
})
</script>