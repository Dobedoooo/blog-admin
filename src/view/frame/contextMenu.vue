<template>
    <div class="context-menu-wrapper" :style="{ transform: `translate(${-x - 5}px, ${y}px)` }">
        <ul>
            <li 
                v-for="item in props.menu" 
                :class="{ 'disabled': item.disabled }" 
                @click="!item.disabled && item.handler(item.args)" 
                :style="item.stytle"
                v-html="item.html"
            ></li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, Ref } from 'vue';


export interface MenuItem<T> {
    html: string
    args?: T
    handler: Function
    stytle?: CSSProperties
    disabled?: boolean
}
export type Menu<T> = { [key: string]: MenuItem<T> } | null

const props = defineProps<{
    menu: Menu<unknown>,
    mouse: MouseEvent | null
}>()

const x: Ref<number> = computed(() => document.body.clientWidth - (props.mouse?.pageX as number))
const y: Ref<number> = computed(() => props.mouse?.pageY as number)

</script>

<style lang="scss" scoped>
.context-menu-wrapper {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 900;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: .1);
    border-radius: 6px;
    background-color: rgba($color: #fff, $alpha: .1);
    backdrop-filter: blur(20px) saturate(180%);
    transition: top .25s cubic-bezier(0.14, 0.38, 0.3, 1.06),
    right .2s cubic-bezier(0.14, 0.38, 0.3, 1.06);
    color: #333;
    ul {
        li {
            line-height: 1.5;
            padding: 4px 10px;
            user-select: none;
            transition: background-color .15s;
            cursor: pointer;
            &:hover:not(.disabled) {
                background-color: var(--border-color);
            }
            &:not(:last-child) {
                border-bottom: 1px solid var(--border-color);
            }
            &.disabled {
                cursor: not-allowed;
            }
        }
    }
}
</style>