<template>
    <footer class="p-4 mt-20 bg-white rounded-lg border-t border-gray-300 font-medium md:p-6">
        <p class="text-center text-gray-700">
            &copy; {{ year }} Anjani Chapparapu. All Rights Reserved.
        </p>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Footer',
    setup(): object {
        const date: Date = new Date()

        const year: number = date.getFullYear()

        return {
            year
        }
    }
})
</script>