<template>
    <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" :id="id" tabindex="-1" :aria-labelledby="id + 'Label'" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800" :id="id + 'Label'">
                        {{ title }}
                    </h5>
                    <button type="button"
                    class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    :data-bs-dismiss="id" aria-label="Close"></button>
                </div>
                <div class="modal-body relative p-4">
                    {{ body }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'Modal',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        },
        title: {
            type: String as PropType<string>,
            required: true
        },
        body: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup({ id, title, body }): object {
        return {
            id, title, body
        }
    }
})
</script>