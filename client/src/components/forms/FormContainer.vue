<template>
    <form class="bg-white max-w-2xl mx-auto px-6 py-5 rounded-lg shadow-xl">
        <slot></slot>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Form'
})
</script>