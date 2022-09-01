<template>
    <div :class="{'date-picker-wrapper': true, 'open': pickerControl}" ref="box" @click="pickerSwitch">
        <div :style="{ width: `${width}px`, height: `${height}px` }" class="input-wrapper cur">
            <img src="../assets/svgs/application/date.svg" class="input-img">
            <input class="input" :value="computedDate" readonly>
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
                    <li v-for="item in yearAry" @click.stop="dateChange('y', item)"
                        :class="{'picked': year === item}"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
                <ul class="month">
                    <li v-for="item in monthAry" @click.stop="dateChange('m', item)"
                        :class="{'picked': month === item}"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>
                <ul class="day">
                    <li v-for="item in dayAry[month - 1]" @click.stop="dateChange('d', item)"
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
import { onMounted, ref, Ref, ComputedRef, computed, watch } from 'vue';

import { observer } from '../utils/globalClick'

interface Props {
    height?: number
    width?: number
    watchKey: string
    date: Date
}
let {
    width = 300,
    height = 30,
    watchKey,
    date
} = defineProps<Props>()

const emit = defineEmits(['update:date'])

const pickerControl: Ref<boolean> = ref(false)
const pickerSwitch = () => {
    // 打开日期选择框时再进行初始化
    if(yearAry.value.length === 0) {
        yearAry.value = [2020, date.getFullYear()]
        // yearAry.value = [date.getFullYear() - 1, date.getFullYear()]
        dayAry.value = dayOfMonthInCurrentYear(date.getFullYear())
        year.value = date.getFullYear()
        month.value = date.getMonth() + 1
        day.value = date.getDate()
    }
    pickerControl.value = !pickerControl.value;
}

const year: Ref<number> = ref(0)
const yearAry: Ref<number[]> = ref([])
const month: Ref<number> = ref(0)
const monthAry: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const day: Ref<number> = ref(0) 
const dayAry: Ref<number[]> = ref([])
const computedDate = computed(() => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
})
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
    
})
// 日期溢出。有溢出时，先设置日再设置年、月
const testDateOverflow = (callback: Function) => {
    day.value > dayAry.value[month.value - 1] && date.setDate(day.value = dayAry.value[month.value - 1])
    callback()
}
const dateChange = (type: 'y' | 'm' | 'd', data: number) => {
    if(type === 'y') {
        // TODO 日期溢出
        year.value = data
        dayAry.value = dayOfMonthInCurrentYear(data)
        testDateOverflow(() => date.setFullYear(data))
    } else if(type === 'm') {
        // 日期溢出问题，有溢出时，先设置日再设置月
        month.value = data
        testDateOverflow(() => date.setMonth(data - 1))
    } else if(type === 'd') {
        day.value = data
        date.setDate(data)
    }
    emit('update:date', new Date(date))
}
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
                    font-weight: 500;
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