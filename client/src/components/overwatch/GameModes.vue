<template>
    <section>
        <h1 class="text-3xl mb-6">Game Modes</h1>

        <div class="grid gap-4 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-4 lg:grid-cols-4">
            <GameModeComponent v-for="gameMode in gameModes" :key="gameMode.key" :gameMode="gameMode" />
        </div>
    </section>
</template>

<script lang="ts">
import {  defineComponent, PropType } from 'vue'

import GameModeComponent from '@/components/overwatch/GameMode.vue'

import IGameMode from '@/interfaces/overwatch/IGameMode'

export default defineComponent({
    name: 'GameModes',
    components: {
        GameModeComponent
    },
    props: {
        gameModes: {
            type: Array as PropType<IGameMode[]>,
            required: true
        }
    },
    setup({ gameModes }): object {
        return {
            gameModes
        }
    }
})
</script>