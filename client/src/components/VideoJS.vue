<template>
    <video
        :id="id"
        class="video-js vjs-default-skin"
        controls
        :width="width"
        :height="height"
        :data-setup="dataSetup"
    >
    </video>
</template>

<script lang="ts">
// https://www.youtube.com/watch?v=r2S89Hm1Uq0
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'VideoJS',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        },
        width: {
            type: String as PropType<string>,
            required: true,
        },
        height: {
            type: String as PropType<string>,
            required: true
        },
        src: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup({ id, width, height, src }): object {
        const dataSetup = `{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${src}"}] }`

        return {
            id,
            width,
            height,
            dataSetup
        }
    }
})
</script>

<style scoped>
@media(max-width: 1024px) {
    .video-js {
        max-height: 550px !important;
    }
}
</style>