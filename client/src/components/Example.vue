<template>
    <div class="bg-stone-900 py-3 px-5 rounded-md text-white">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Example'
})
</script>