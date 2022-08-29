<template>
    <div :class="{'date-picker-wrapper': true, 'open': pickerControl}" ref="box" @click="pickerSwitch">
        <div :style="{ width: `${width}px`, height: `${height}px` }" class="input-wrapper cur">
            <img src="../assets/svgs/application/date.svg" class="input-img">
            <input class="input" v-model="date" readonly>
        </div>
        <transition name="fade">
            <div
                class="dial"
                v-show="pickerControl"
                :style="{
                    'padding-top': `${height}px`
                }"
            >
                <ul class="year">
                    <li v-for="item in yearAry" @click="pickYear(item)"
                        :class="{'picked': year === item}"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
                <ul class="month">
                    <li v-for="item in monthAry" @click="pickMonth(item)"
                        :class="{'picked': month === item}"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
                <ul class="day">
                    <li v-for="item in dayAry[month]" @click="pickDay(item)"
                        :class="{'picked': day === item}"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, ComputedRef, computed } from 'vue';

import { observer } from '../utils/globalClick'

interface Props {
    height?: number
    width?: number
    watchKey: string
}
const {
    width = 300,
    height = 30,
    watchKey
} = defineProps<Props>()

defineEmits([''])

const pickerControl: Ref<boolean> = ref(false)
const pickerSwitch = () => {
    pickerControl.value = !pickerControl.value;
}

const year: Ref<number> = ref(0)
const yearAry: Ref<number[]> = ref([])
const month: Ref<number> = ref(0)
const monthAry: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const day: Ref<number> = ref(0)
const dayAry: Ref<number[]> = ref([])
const date: ComputedRef<string> = computed((): string => `${year.value}/${month.value}/${day.value}`)
const dayOfMonthInCurrentYear = (year: number): number[] => {
    let feb = 28
    if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        feb = 29
    }
    return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

const box = ref()
onMounted(() => {
    observer.watch(watchKey, box.value, function() { pickerControl.value = false })

    const date = new Date()
    year.value = date.getFullYear()
    month.value = date.getMonth()
    day.value = date.getDate()
    yearAry.value = [year.value - 1 ,year.value]
    dayAry.value = dayOfMonthInCurrentYear(year.value)

})

const pickYear = (arg: number) => year.value = arg
const pickMonth = (arg: number) => month.value = arg
const pickDay = (arg: number) => day.value = arg

</script>

<style lang="scss" scoped>
.date-picker-wrapper {
    display: inline-block;
    position: relative;
    margin-left: -10px;
    &.open {
        z-index: 10;
    }
    .input-wrapper {
        position: relative;
        z-index: 1;
        padding-left: 10px;
        padding-top: 6px;
        box-sizing: border-box;
        display: flex;
        justify-content: start;
        align-items: center;
        .input {
            position: relative;
            box-sizing: border-box;
            cursor: pointer;
            user-select: none;
            padding-left: 7px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            color: #333;
            transition: text-align .15s cubic-bezier(0.14, 0.38, 0.3, 1.06);
        }
    }
    .dial {
        position: absolute;
        top: 0;
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: .1);
        backdrop-filter: blur(20px) saturate(180%);
        display: flex;
        height: 180px;
        ul {
            width: 33.4%;
            height: 100%;
            overflow: auto;
            &:not(:last-child) {
                margin-right: 5px;
            }
            li {
                box-sizing: border-box;
                cursor: pointer;
                transition: background-color .15s;
                border-top: 1px solid var(--border-color);
                color: #999;
                &:hover {
                    background-color: var(--border-color);
                }
                &.picked {
                    background-color: var(--border-color);
                    color: #333;
                }
                span {
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    padding: 5px 0;
                }
                .click-wrapper { width: 100%; }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .15s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>