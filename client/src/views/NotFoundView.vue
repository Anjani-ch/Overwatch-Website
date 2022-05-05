<template>
    <main class="main-wrapper container mx-auto text-center flex flex-col items-center justify-center">
        <img class="w-20 mb-12" src="../assets/overwatch-logo.svg" alt="overwatch-logo">
        <p class="text-2xl"><span class="text-amber-500">404</span> ERROR</p>
        <h1 class="text-6xl mb-5">Page Not Found</h1>
        <p class="mb-4 font-bold">Sorry, we couldn't find the page you're looking for.</p>

        <router-link class="flex items-center font-bold py-2 px-4 rounded bg-amber-500 text-white transition-colors ease-in hover:bg-amber-600" :to="{ name: 'Home' }">
            <span>Go back home</span>

            <!-- Right Arrow Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </router-link>
    </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NotFoundView'
})
</script>