<template>
    <div class="frame-nav-content">
        <div class="user"></div>
        <div v-for="item in nav" class="nav-item-wrapper">
            <span class="nav-title">{{ item.displayName }}</span>
            <div v-for="subItem in item.subNav">
            <router-link :to="subItem.href" 
            :class="{'nav-link': true, 'nav-active': subItem.href === currentNav}" 
            @click="onLinkClick(subItem)">
                <img :src="subItem.icon" class="nav-link-icon">
                <span :ref="getLinkY">{{ subItem.displayName }}</span>
            </router-link>
            </div>
        </div>
        <div class="focus" :style="`transform: translateY(${foucs_Y}px)`"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
// 链接图标
import dashboardIcon from '../../assets/svgs/frame/dashboard.svg'
import notesIcon from '../../assets/svgs/frame/notes.svg'
import ideasIcon from '../../assets/svgs/frame/ideas.svg'
import errorsIcon from '../../assets/svgs/frame/errors.svg'
import notificationsIcon from '../../assets/svgs/frame/notifications.svg'
import membershipIcon from '../../assets/svgs/frame/membership.svg'
import suspensionsIcon from '../../assets/svgs/frame/suspensions.svg'
import noshowsIcon from '../../assets/svgs/frame/noshows.svg'
import typesIcon from '../../assets/svgs/frame/type.svg'
import { useRoute } from 'vue-router'

import ClickZoom from '../../components/clickZoom.vue'

interface SubNav {
    displayName: string
    href: string
    icon: string
    y: number
}
interface Nav {
    displayName: string
    subNav: SubNav[]
}
interface LinkDOM {
    text: string
    y: number
    DOM: HTMLElement
}
interface LinkDOMs {
    [key: string]: LinkDOM
}
const linkDOMs: Ref<LinkDOMs> = ref({})
// 该函数中无法获取 DOM 来设置 y，原因未知
const getLinkY = (el: HTMLElement) => {
    linkDOMs.value[el?.innerText] = { text: el?.innerText, y: 0, DOM: el }
    return undefined
}
// 导航信息
const nav: Ref<Nav[]> = ref([
    { 
        displayName: 'ANALYTICS',
        subNav: [
            { displayName: 'Dashboard', href: '/frame/dashboard', icon: dashboardIcon, y: 0 }
        ] 
    },
    {
        displayName: 'APPLICATION',
        subNav: [
            { displayName: 'Notes', href: '/frame/note', icon: notesIcon, y: 0 },
            { displayName: 'Ideas', href: '/frame/idea', icon: ideasIcon, y: 0 },
            { displayName: 'Errors', href: '/frame/error', icon: errorsIcon, y: 0 },
        ] 
    },
    {
        displayName: 'OTHERS',
        subNav: [
            { displayName: 'Types', href: '/frame/type', icon: typesIcon, y: 0 },
            { displayName: 'Notifications', href: '/frame/notifiacation', icon: notificationsIcon, y: 0 },
            { displayName: 'Membership', href: '/frame/membership', icon: membershipIcon, y: 0 },
            { displayName: 'Suspensions', href: '/frame/suspension', icon: suspensionsIcon, y: 0 },
            { displayName: 'No Shows', href: '/frame/noshow', icon: noshowsIcon, y: 0 },
        ] 
    }
])
// 当前激活的导航
const currentNav: Ref<string> = ref('Dashboard')
// 聚焦块垂直位移
const foucs_Y: Ref<number> = ref(200)

const onLinkClick = (link: SubNav) => {
    currentNav.value = link.href
    foucs_Y.value = link.y
}

const route = useRoute()

onMounted(() => {
    for(const linkDOM in linkDOMs.value) {
        // getLinkY中无法获取 DOM，改为在挂载时赋值
        linkDOMs.value[linkDOM].y = Number(linkDOMs.value[linkDOM].DOM.getBoundingClientRect().y.toFixed()) - 8
    }
    currentNav.value = route.path
    // 1.记录每个导航的 y，以在点击时供聚焦块定位使用 2.初始化聚焦块垂直位置
    nav.value.forEach((item: Nav) => {
        item.subNav.forEach((subItem: SubNav) => {
            subItem.y = linkDOMs.value[subItem.displayName].y
            // 2.初始化聚焦块垂直位置
            if(subItem.href === route.path) {
                foucs_Y.value = subItem.y
            }
        })
    })
    // 初始化聚焦块垂直位置
})


</script>

<style lang="scss" scoped>
.frame-nav-content {
    padding: 0 25px;
    .user {
        height: 60px;
        margin: 25px 0;
        border: 1px solid #f2f4f6;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0px 0px 5px 0px rgba($color: #000000, $alpha: .1);
    }
    .nav-item-wrapper {
        margin-bottom: 10px;
        padding-bottom: 10px;
        &:not(:last-of-type) {
            border-bottom: 2px solid #f2f4f6;
        }
    }
    .nav-title {
        position: relative;
        z-index: 200;
        display: inline-block;
        color: #888;
        margin: 10px 0;
    }
    .nav-link {
        position: relative;
        z-index: 200;
        width: 100%;
        display: inline-block;
        color: #666;
        padding: 7px 0;
        margin: 2px 0;
        cursor: pointer;
        transition: color .2s;
        .nav-link-icon {
            width: 18px;
            margin-right: 10px;
            transform: translateX(-100px);
            filter: drop-shadow(100px 0 0 #888);
            vertical-align: top;
        }
        &.nav-active {
            color: #6955e5;
            .nav-link-icon {
                filter: drop-shadow(100px 0 0 #6955e5) !important;
            }
        }
    }
    .focus {
        position: absolute;
        top: 0px;
        left: 15px;
        height: 40px;
        width: calc(var(--nav-width) - 30px);
        border-radius: 10px;
        background-color: #efedfb;
        z-index: 100;
        // transition: transform .4s cubic-bezier(0.13, 0.61, 0.33, 1);
        transition: transform .25s cubic-bezier(0.14, 0.38, 0.3, 1.06);
    }
}
</style>