<template>
    <div class="form-group my-6">
        <label :for="id" class="form-label inline-block mb-2 text-gray-700 font-bold">{{ labelText }}</label>
        <input :type="type" class="
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border-2 border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none"
            :id="id"
            :name="id"
            :placeholder="placeholder">
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'FormInput',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        },
        labelText: {
            type: String as PropType<string>,
            required: true
        },
        type: {
            type: String as PropType<string>,
            required: true
        },
        placeholder: {
            type: String as PropType<string>,
            default: ''
        }
    },
    setup({ id, labelText, type, placeholder }): object {
        return {
            id,
            labelText,
            type,
            placeholder
        }
    }
})
</script>