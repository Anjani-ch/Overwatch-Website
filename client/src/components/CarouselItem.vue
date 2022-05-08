<template>
    <div class="carousel-inner relative w-full overflow-hidden">
        <div v-for="(item, index) in items" :key="index" :class="['carousel-item relative float-left w-full', index === 0 ? 'active' : '']">
            <img
                :src="item.thumbnail"
                class="block w-full"
                :alt="item.title"
            />

            <div class="carousel-caption hidden md:block absolute text-center">
                <h5 class="text-3xl">{{ `${item.title}` }}</h5>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'CarouselItem',
    props: {
        items: {
            type: Array as PropType<object[]>,
            required: true
        }
    },
    setup({ items }): object{
        return {
            items
        }
    }
})
</script>