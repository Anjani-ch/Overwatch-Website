<template>
    <li class="py-2 border-gray-200 w-full">
        {{ item }}
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListItem',
    props: {
        item: {
            type: undefined,
            required: true
        }
    },
    setup({ item }): object {
        return {
            item
        }
    }
})
</script>