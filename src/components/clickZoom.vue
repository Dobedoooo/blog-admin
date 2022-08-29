<template>
    <div 
        class="click-wrapper"
        :style="{ transform: clickFlag ? `scale(${props.rate})` : '' }"
        @mousedown="click" 
        @mouseup="clickOver" 
        @mouseleave="clickOver"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'

const props = defineProps<{
    rate: number
}>()

const clickFlag: Ref<boolean> = ref(false)
const click = () => {
    clickFlag.value = true
}
const clickOver = () => {
    clickFlag.value = false

}
</script>

<style lang="scss" scoped>
.click-wrapper {
    position: relative;
    z-index: 200;
    text-indent: 0;
    display: inline-block;
    transition: transform .15s;
}

</style>