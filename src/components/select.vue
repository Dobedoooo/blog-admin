<template>
    <div :class="{'select-wrapper': true, 'open': listControl}" ref="box">
        <input 
            class="input" 
            @click="listSwitch"
            ref="input"
            :style="{
                width: `${width}px`,
                height: `${height}px`
            }"
            :aria-status="status"
            v-model="option"
            readonly
            :placeholder="placeholder"
        >
        <transition name="fade">
            <ul v-show="listControl"
                :style="{
                    'padding-top': `${height}px`
                }"
            >
                <li v-for="item in options" v-html="item.name" @click="clickOption($event, item.value)"></li>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { ComputedRef, onMounted, Ref, ref, watchEffect } from 'vue';

import { observer } from '../utils/globalClick';

export interface Option {
    name: string,
    value: string
}

interface Props {
    options: Option[]
    option: string
    placeholder?: string
    width?: number
    height?: number
    watchKey: string
}
const { options, option, 
    placeholder = '<Click to select>', 
    width = 160,
    height = 30,
    watchKey
} = defineProps<Props>()

const emit = defineEmits(['update:option'])

// 列表开关
const listControl: Ref<boolean> = ref(false)
const listSwitch = () => {
    listControl.value = !listControl.value;
}

//
const status: ComputedRef<'unselected' | 'selected'> = computed(() => {
    return option ? 'selected' : 'unselected'
})
const clickOption = (e: Event, value: string) => {
    emit('update:option', value)
    listSwitch()
}

const box = ref()
onMounted(() => {
    observer.watch(watchKey, box.value, function() { listControl.value = false })
})

</script>

<style lang="scss" scoped>
.select-wrapper {
    display: inline-block;
    position: relative;
    margin-left: -10px;
    &.open {
        z-index: 10;
    }
    .input {
        position: relative;
        z-index: 20;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 5px 10px;
        color: #999;
        background-color: #fff;
        font-style: italic;
        &[aria-status=selected] {
            font-style: normal;
            color: #333;
        }
    }
    ul {
        position: absolute;
        top: 0;
        background-color: rgba($color: #fff, $alpha: .1);
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: .1);
        backdrop-filter: blur(20px) saturate(180%);
        max-height: 200px;
        overflow: auto;
        li {
            box-sizing: border-box;
            cursor: pointer;
            padding: 5px 10px;
            transition: background-color .15s;
            border-top: 1px solid var(--border-color);
            &:hover {
                background-color: var(--border-color);
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
    z-index: 10;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>