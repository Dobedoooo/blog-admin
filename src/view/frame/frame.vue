<template>
    <div class="flex width-100p height-100p frame-wrapper">
        <nav class="frame-nav">
            <div class="frame-nav-logo">
                <img src="../../assets/svgs/logo.svg">
                <span class="name">Root Manager</span>
            </div>
            <FrameNavVue></FrameNavVue>
        </nav>
        <section class="frame-content">
            <header class="frame-content-header">
                <div class="search-wrapper">
                    <input class="search-box" type="text" placeholder="Search">
                    <img class="search-icon" src="../../assets/svgs/frame/search.svg">
                </div>
                <div class="functional-btn">
                    <img class="notification-icon" src="../../assets/svgs/frame/notifications.svg">
                    <img class="settings-icon" src="../../assets/svgs/frame/gear.svg">
                </div>
            </header>        
            <main class="frame-main-content">
                <router-view></router-view>
            </main>
        </section>
        <div id="cover" :class="{'cover': true, 'shadow': coverStore.coverType === 'shadow'}" v-show="coverStore.coverFlag" @click="coverStore.change()"></div>
    </div>
</template>

<script lang="ts" setup>
import { provide, ref, Ref } from 'vue';
import { useCoverStore } from '../../store/coverstore'
import FrameNavVue from './frameNav.vue';
import { CoverArgument } from '../types';

const coverStore = useCoverStore()

// 遮罩开关
const coverEvent = (arg: CoverArgument = { type: 'plain', flag: true }): void => {
    // coverStore.change()
}

</script>

<style lang="scss" scoped>
.frame-wrapper {
    --nav-width: 280px;
    --header-height: 50px;
    min-height: 780px;
}
.frame-nav {
    width: var(--nav-width);
    height: 100%;
    border-right: 2px solid #f2f4f6;
    background-color: #f7f9fb;
    box-sizing: border-box;
    .frame-nav-logo {
        height: var(--header-height);
        border-bottom: 1px solid var(--border-color);
        padding: 7px 0 0 25px;
        box-sizing: border-box;
        img {
            vertical-align: middle;
            width: 35px;
            margin-right: 15px;
        }
        .name {
            font-family: 'Lobster';
            font-size: 25px;
            color: #333;
            vertical-align: middle;
        }
    }
    
}
.frame-content {
    position: relative;
    width: calc(100% - var(--nav-width));
    .frame-content-header {
        position: relative;
        z-index: 300;
        height: var(--header-height);
        border-bottom: 1px solid #f2f4f6;
        background-color: transparent;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
        backdrop-filter: blur(20px) saturate(180%);
        .search-wrapper {
            position: relative;
        }
        .search-box {
            border: none;
            height: 25px;
            padding-left: 30px;
        }
        .search-icon {
            position: absolute;
            top: 2px;
            left: 0px;
        }
        img {
            width: 20px;
            cursor: pointer;
            margin-right: 15px;
        }
    }
    .frame-main-content {
        box-sizing: border-box;
        margin-top: calc(-1 * var(--header-height));
        // height: calc(100% - var(--header-height));
        height: 100%;
        padding: calc(var(--header-height) + 25px) 25px 25px;
        overflow: auto;
    }
}
.cover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 800;
    &.shadow {
        backdrop-filter: blur(2px) saturate(180%); 
        background-color: rgba($color: #000000, $alpha: .1);
    }
}
</style>