<template>
    <div class="w-full bg-white rounded overflow-hidden shadow-2xl mx-auto sm:mx-0">
        <div class="block p-6 rounded-lg max-w-sm">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ gameMode.name.toUpperCase() }}</h5>

            <p class="text-gray-700 text-base">
                {{ gameMode.description }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import IGameMode from '@/interfaces/overwatch/IGameMode'

export default defineComponent({
    name: 'GameMode',
    props: {
        gameMode: {
            type: Object as PropType<IGameMode>,
            required: true
        }
    },
    setup({ gameMode }): object {
        return {
            gameMode
        }
    }
})
</script>