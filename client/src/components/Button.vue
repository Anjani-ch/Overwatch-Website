<template>
    <button v-if="!isLink" :class="buttonClasses">
        <slot></slot>
    </button>

    <router-link v-else :class="buttonClasses" :to="linkRoute">
        <slot></slot>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'Button',
    props: {
        isLink: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        linkRoute: {
            type: Object as PropType<{ name: string, params?: object }>,
            default: { name:'' }
        },
        useFlex: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup({ useFlex }): object {
        let buttonClasses: string = 'font-bold py-2 px-4 rounded bg-amber-500 text-white transition-colors ease-in hover:bg-amber-600'

        if(useFlex) {
            buttonClasses += ' flex items-center'
        }

        return {
            buttonClasses,
        }
    }
})
</script>