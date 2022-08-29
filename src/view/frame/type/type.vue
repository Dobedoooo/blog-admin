<template>
     <div class="application-wrapper">
        <div class="application-wrapper-header">
            <div class="application-wrapper-title">Types 💻</div>
            <div class="application-function">
                <div class="search-wrapper">
                    <input type="text" placeholder="Search...">
                    <img src="../../../assets/svgs/frame/search.svg">
                </div>
                <div class="search-filter">
                    <img class="w-20" src="../../../assets/svgs/application/filter.svg">
                    <span>Filter</span>
                </div>
                <div class="add-new">
                    <img src="../../../assets/svgs/application/add.svg">
                </div>
            </div>
        </div>
        <div class="application-content">
            <table class="application-table">
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>

const types = [
    { name: 'node', imgUrl: 'https://nodejs.org/static/images/favicons/favicon.ico' },
    { name: 'python', imgUrl: 'https://www.python.org/static/favicon.ico' }
]

</script>

<style lang="scss" scoped>

</style>