<template>
    <div>error
        <button>添加error</button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import { findAll, ErrorEntity } from '../../../api/errorApi/index'

const errorList: Ref<ErrorEntity[]> = ref([])
const pageTake: Ref<number> = ref(10)
const pageSkip: Ref<number> = ref(0)

onMounted(() => {
    
    errorList.value = await findAll(pageTake.value, pageSkip.value)
})

</script>

<style lang="scss" scoped>

</style>