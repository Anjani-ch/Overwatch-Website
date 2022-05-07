<template>
    <ul class="text-gray-700 text-base mt-4">
        <ListItem :class="listStyleClasses" v-for="(item, index) in items" :key="index" :item="item.toUpperCase()" />
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import ListItem from './ListItem.vue'

export default defineComponent({
    name: 'List',
    components: {
        ListItem
    },
    props: {
        items: {
            type: Array as PropType<any[]>,
            required: true
        },
        listStyleClasses: {
            type: String as PropType<string>,
        }
    },
    setup({ items, listStyleClasses }): object {
        return {
            items,
            listStyleClasses
        }
    }
})
</script>