<template>
    <div class="p-4 rounded-md text-white !bg-black my-3">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TerminalExample'
})
</script>