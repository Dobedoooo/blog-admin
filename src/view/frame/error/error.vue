<template>
    <div class="application-wrapper">
        <div class="application-wrapper-header">
            <div class="application-wrapper-title">Errors 🐞</div>
            <div class="application-function">
                <div class="search-wrapper">
                    <input type="text" placeholder="Search...">
                    <img src="../../../assets/svgs/frame/search.svg">
                </div>
                <div class="search-filter">
                    <img class="w-20" src="../../../assets/svgs/application/filter.svg">
                    <span>Filter</span>
                </div>
                <div class="add-new" @click="openPane()">
                    <img src="../../../assets/svgs/application/add.svg">
                </div>
            </div>
        </div>
        <div class="application-content">
            <table class="application-table">
                <thead>
                    <tr>
                        <th>
                            <span>No</span>
                            <img src="../../../assets/svgs/application/sort.svg" class="ver-m mgl-5 cur" @click="sort">
                        </th>
                        <th>Caption</th>
                        <th>Type</th>
                        <th>Date of Record</th>
                        <th>Tag</th>
                        <th>Deleted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in errorList">
                        <td class="id">#{{ item.error_id }}</td>
                        <td class="title">{{ item.error_title }}</td>
                        <td>{{ item.error_type }}</td>
                        <td>{{ timeFormatConversion(item.error_create_time) }}</td>
                        <td>
                            <span v-for="tag in item.universal_tag?.split(';')" class="tag">
                                {{ tag }}
                            </span>
                        </td>
                        <td :class="{ 'deleted': item.error_deleted === null}">
                            {{ item.error_deleted === null ? '<not deleted>' : timeFormatConversion(item.error_deleted) }}
                        </td>
                        <td class="action">
                            <img src="../../../assets/svgs/application/review.svg" class="cur" @click="review(item.error_id as number)">
                            <ClickZoom :rate="0.8">
                                <img src="../../../assets/svgs/application/more.svg" class="cur mgl-5 more" @click="more($event, item)">
                            </ClickZoom>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Teleport to="#outside_wrapper">
        <transition name="fade">
            <AddError v-show="paneControl" @close="closePane" :error-id="reviewId"></AddError>
        </transition>
    </Teleport>
    <transition name="menu">
            <ContextMenu v-show="contextMenuControl" :menu="menu" :mouse="mouseArgument"></ContextMenu>
    </transition>
</template>

<script lang="ts" setup>
import { inject, onMounted, Ref, ref, watch, watchEffect } from 'vue';
import { findAll, ErrorBriefEntity } from '../../../api/errorApi/index'

import AddError from './addError.vue'
import ContextMenu, { MenuItem, Menu } from '../contextMenu.vue'
import ClickZoom from '../../../components/clickZoom.vue';

import { useCoverStore, CoverArgument } from '../../../store/coverstore';

const errorList: Ref<ErrorBriefEntity[]> = ref([])
const pageTake: Ref<number> = ref(10)
const pageSkip: Ref<number> = ref(0)

// 获得错误列表
const getErrorList = async() => {
    errorList.value = [
        {"error_id":14,"error_title":"test update 4","error_create_user":"root","error_create_time":"2022-08-18 09:40:35","error_type":"node","universal_tag":"java;thread","error_deleted":null},
        {"error_id":15,"error_title":"test","error_create_user":"root","error_create_time":"2022-08-18 09:40:35","error_type":"html","universal_tag":"ts;type","error_deleted":"2022-08-18T01:40:35.000Z"},
        {"error_id":16,"error_title":"test","error_create_user":"root","error_create_time":"2022-08-18 09:40:35","error_type":"css","universal_tag":"css;trick","error_deleted":"2022-08-18T11:12:37.000Z"},
        {"error_id":17,"error_title":"test","error_create_user":"root","error_create_time":"2022-08-18 09:40:35","error_type":"test","universal_tag":"linux;package;dnf","error_deleted":null}
    ]
    // errorList.value = await findAll(pageTake.value, pageSkip.value)
}

onMounted(() => {
    // return
    getErrorList()
})

// 按 id 排序
let sortFlag = false
const sort = () => {
    errorList.value.sort((a: ErrorBriefEntity, b: ErrorBriefEntity): number => {
        return sortFlag ? (a.error_id as number - (b.error_id as number)) : (b.error_id as number - (a.error_id as number))
    })
    sortFlag = !sortFlag
}

// 时间格式转换 2022-08-18T01:40:35.000Z -> 2022/8/18
const timeFormatConversion = (ISOStirng: string): string => {
    const time = new Date(ISOStirng)
    const year = time.getFullYear()
    const month = time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth()
    const date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    const ret = `${month}/${date}/${year}`
    return ret
}

// 
const reviewId: Ref<number | null> = ref(null)
const review = (id: number) => {
    reviewId.value = id
    openPane()
}

// 遮罩
const coverStore = useCoverStore()
// “更多”菜单默认值
const menu: Ref<Menu> = ref({
    restore: { name: 'restore', handler: () => { console.log('restore') } },
    soft_delete: { name: 'soft delete', handler: () => { console.log('soft') } },
    delete: { name: 'delete', handler: () => {}, stytle: { color: '#c0392b' } },
})
const initMenu = () => {
    menu.value = {
        restore: { name: 'restore', handler: () => { console.log('restore') } },
        soft_delete: { name: 'soft delete', handler: () => { console.log('soft') } },
        delete: { name: 'delete', handler: () => {}, stytle: { color: '#c0392b' } },
    }
}
// 点击时的鼠标点击事件对象，传给子组件以便定位
const mouseArgument: Ref<MouseEvent | null> = ref(null)
// 菜单开关
const contextMenuControl: Ref<boolean> = ref(false) 
// 打开菜单
const more = (event: MouseEvent, errorItem: ErrorBriefEntity) => {
    // 初始化并设置菜单
    initMenu()
    errorItem.error_deleted === null 
    ? menu.value['restore'].disabled = true 
    : menu.value['soft_delete'].disabled = true;
    
    mouseArgument.value = event
    // 显示菜单
    contextMenuControl.value = true
    coverStore.change({ flag: true })
}
// 遮罩关闭时，关闭菜单
watch(() => coverStore.coverFlag, (flag) => {
    !flag && (contextMenuControl.value = false)
})

// 面板和遮罩
const paneControl = ref(false)
watch(() => coverStore.coverFlag, (flag) => {
    !flag && (paneControl.value = false)
})
// 打开 修改(添加)面板
const openPane = (): void => {
    paneControl.value = true
    coverStore.change({ flag: true, type: 'shadow' })
}
// 关闭 修改(添加)面板
const closePane = () => {
    paneControl.value = false
    coverStore.change({ flag: false })
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: transform .25s cubic-bezier(0.14, 0.38, 0.3, 1.06), opacity .15s;
    transform-origin: center center;
}
.fade-enter-from,
.fade-leave-to {
    transform: scale(1.1);
    opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
    transition: opacity .15s;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}

.context-menu-box {
    // transition: transform;
    position: absolute;
    top: 0;
    left: 0;
}
</style>