<template>
    <button v-if="!isLink" :class="buttonClasses">
        <slot></slot>
    </button>

    <router-link v-else :class="buttonClasses" :to="{ name: linkRoute }">
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
        addFlex: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        linkRoute: {
            type: String as PropType<string>,
            default: ''
        }
    },
    setup({ addFlex, linkRoute }: { addFlex: boolean, linkRoute: string }) {
        let buttonClasses: string = ''
        let linkValue: string = linkRoute;

        if(addFlex) {
            buttonClasses = 'flex items-center'
        }

        buttonClasses += ' font-bold py-2 px-4 rounded bg-amber-500 text-white transition-colors ease-in hover:bg-amber-600'

        return {
            buttonClasses,
            linkValue
        }
    }
})
</script>