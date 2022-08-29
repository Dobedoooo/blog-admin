<template>
    <div>loading...{{ count }}s
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import router from '../../router';

const count = ref(2)

onMounted(() => {
    const t = setInterval(() => {
        if(count.value !== 0) {
            count.value -= 1
        } else {
            clearInterval(t)
            router.push({ path: '/frame/dashboard' })
        }
    }, 1000)
})

</script>

<style lang="scss" scoped>

</style>