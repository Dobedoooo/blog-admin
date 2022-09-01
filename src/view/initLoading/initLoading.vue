<template>
    <div class="loading-wrapper">
        <div @animationend="redirect">
            <img src="../../assets/logo.svg" class="logo">
            <span class="title">Root<br/>Manager</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const redirect = () => {
    router.push({ path: '/frame' })
}

</script>

<style lang="scss" scoped>
@use "sass:math";
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.loading-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
        -webkit-background-clip: text;
        padding-bottom: 10px;
        animation: spring-scale 3s;
        animation-fill-mode: forwards;
    }
    .logo {
        width: 100px;
        margin-right: 35px;
    }
    .title {
        font-family: 'Lobster';
        font-size: 120px;
        text-align: center;
        color: transparent;
    }
}

@function spring-wobbly($t) {
    @return -0.5 * math.pow(math.$e, -6 * $t) * (-2 * math.pow(math.$e, 6 * $t) + math.sin(12 * $t) + 2 * math.cos(12 * $t));
}

@keyframes spring-scale {
    @for $i from 1% through 100% {
        #{$i} {
            transform: scale(spring-wobbly(math.div(math.div($i, $i * 0 + 1), 60)), spring-wobbly(math.div(math.div($i, $i * 0 + 1), 40)));
        }
    }
    60% {
        opacity: 1;
    }
    90% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
</style>