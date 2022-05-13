<template>
    <div role="alert">
        <div :class="headingClass">
            <p>{{ title }}</p>

            <!-- Close Icon -->
            <svg v-if="useClose" @click="$emit('closeAlert')" class="h-8 w-8 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>

        <div :class="bodyClass">
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'Error',
    props: {
        message: {
            type: String as PropType<string>,
            required: true
        },
        title: {
            type: String as PropType<string>,
            required: true
        },
        type: {
            type: String as PropType<string>,
            required: true
        },
        useClose: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup({ message, title, type, useClose }): object {
        let headingClass: string = 'text-white font-bold rounded-t px-4 py-2 flex items-center justify-between '
        let bodyClass: string = 'px-4 py-3 border border-t-0 rounded-b '

        switch(type) {
            case 'error':
                headingClass += 'bg-red-500'
                bodyClass += 'border-red-400 bg-red-100 text-red-700'
                break
            case 'success':
                headingClass += 'bg-lime-600'
                bodyClass += 'border-lime-500 bg-lime-200 text-lime-800'
                break
        }

        return {
            message,
            title,
            useClose,
            headingClass,
            bodyClass
        }
    }
})
</script>