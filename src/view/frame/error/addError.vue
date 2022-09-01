<template>
    <div class="add-wrapper">
        <div class="form-wrapper" :style="{pointerEvents: submitStatus === 'submitting' ? 'none' : 'all'}">
            <div class="close cur" @click.stop="coverStore.change({ flag: false })">✖</div>
            <form>
                <div class="title-input">
                    <input type="text" v-model="errorData.error_title" placeholder="Untitled" autocomplete="off" @input="submittable">
                    <!-- <div v-if="errorData.error_timestamp">{{ errorData.error_timestamp }}</div> -->
                </div>
                <div class="input-with-label nowrap readonly">
                    <label for="author">Author</label>
                    <input id="author" type="text" v-model="errorData.error_create_user" readonly autocomplete="off">
                </div>
                <div class="input-with-label nowrap">
                    <label>Type</label>
                    <SelectComponent v-model:option="errorData.error_type" :options="TypeOptions" watch-key="type_select"></SelectComponent>
                </div>
                <div class="input-with-label nowrap">
                    <label for="subtype">Subtype</label>
                    <input id="subtype" type="text" v-model="errorData.error_subtype" placeholder="Empty" autocomplete="off">
                </div>
                <div class="input-with-label nowrap">
                    <label for="date">Date</label>
                    <DatePicker watch-key="date" v-model:date="errorData.error_create_time"></DatePicker>
                </div>
                <div class="input-with-label nowrap">
                    <label for="tag">Tag</label>
                    <input type="text" id="tag" v-model="errorData.universal_tag" placeholder="Empty (Use semicolons to separate)" autocomplete="off">
                </div>
                <div class="input-with-label">
                    <label for="desc">Description</label>
                    <textarea id="desc" rows="2" v-model="errorData.error_desc" autocomplete="off"></textarea>
                </div> 
                <div class="input-with-label">
                    <label for="analysis">Analysis</label>
                    <textarea id="analysis" rows="10" v-model="errorData.error_analysis" autocomplete="off"></textarea>
                </div> 
                <div class="input-with-label">
                    <label for="resolve">Solution</label>
                    <textarea id="resolve" rows="10" v-model="errorData.error_resolve" autocomplete="off"></textarea>
                </div> 
            </form>
            <div class="btn-grp">
                <div @click="submit" :aira-status="submitStatus">
                    <svg @animationiteration="smoothEnd" class="submit" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M463.7 746.5l-160-81.5c-49.5-24-75.3-3.9-57.8 54.4 0 0 95.3 230.5 94.8 240.5l143.1-97.2c18.1-17.1 27.6-41.5 22.7-67.1-3.8-19-22.9-38.4-42.8-49.1zM878.6 74.1L93.3 470.8c-33.1 18.5-36.1 44.6-10.5 61.7 4.9 3.3 10.4 5.7 16 7.4l156.3 62.5c45.7 16.4 84.5 4.2 123.8-25.2l351.7-282.5c11.3-9.1 18.1 0.5 8.3 8.6L427.5 605.7c-13 12.7-18.6 31.2-14.6 49 3.8 17.6 17.9 29 33.6 37.3l14 6.3 283.3 134.9 2.9 1.3c36.4 15.8 78.2-4.8 88.5-43.6l1.1-4.3 118.6-655.5c16.2-52.8-29.9-84.5-76.3-57z"></path>
                    </svg>
                </div>
                <div @click="clearField" :class="{'clear': clearing}"><img @animationend="clearing = false" src="../../../assets/svgs/application/clear.svg"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch, ComputedRef, computed, onMounted } from 'vue';
import { ErrorEntity } from '../../../api/errorApi';

import SelectComponent, { Option } from '../../../components/select.vue';
import DatePicker from '../../../components/datePicker.vue';

import { useCoverStore } from '../../../store/coverstore'
// api
import { upsert } from '../../../api/errorApi/index'

const coverStore = useCoverStore()

const props = defineProps<{
    errorData: ErrorEntity | null
}>()

const errorData: Ref<ErrorEntity> = ref({
    error_title: '',
    error_timestamp: '',
    error_create_user: 'root',
    error_desc: '',
    error_type: '',
    error_subtype: '',
    error_create_time: new Date(),
    error_analysis: '',
    error_resolve: '',
    universal_tag: '',
    error_deleted: null
})

onMounted(() => {
    if(props.errorData) {
        errorData.value = props.errorData
    } else {
        clearField()
    }
})

const TypeOptions: Option[] = [
    { name: '<img style="width: 16px; margin-right: 10px" src="https://www.python.org/static/favicon.ico"/><span>python</span>', value: 'python' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
    { name: '<img style="width: 16px; margin-right: 10px" src="https://nodejs.org/static/images/favicons/favicon.ico"/><span>node</span>', value: 'node' },
]

// 提交
const submittable = () => {
    submitStatus.value = errorData.value.error_title === '' ? 'disabled' : 'enabled'
}
type SubmitStatus = 'disabled' | 'enabled' | 'submitting' | 'done' | 'error'
const submitStatus: Ref<SubmitStatus>  = ref('disabled')
const submitDone: Ref<'success' | 'error' | false> = ref(false)
const submit = async() => {
    if(submitStatus.value === 'disabled') return
    submitDone.value = false
    submitStatus.value = 'submitting'
    // const result = await upsert(errorData.value)
    // if(result.success) {
    //     submitDone.value = 'success'
    // }
    
}
const smoothEnd = (e: Event) => {
    submitStatus.value = submitDone.value === 'success' ? 'done' : 'error'
}

// 清空
const clearing: Ref<boolean> = ref(false)
const clearField = () => {
    clearing.value = true
    errorData.value.error_title = ''
    errorData.value.error_type = ''
    errorData.value.error_subtype = ''
    errorData.value.universal_tag = ''
    errorData.value.error_desc = ''
    errorData.value.error_analysis = ''
    errorData.value.error_resolve = ''
}
</script>

<style lang="scss" scoped>
.add-wrapper {
    position: relative;
    perspective: 1px;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 900;
    border: 1px solid var(--border-color);
    box-shadow: 0px 0px 15px 0px rgba($color: #000000, $alpha: .1), inset 0px 0px 2px var(--border-color);
    border-radius: 15px;
    transform-origin: 0 0;
    .form-wrapper {
        box-sizing: border-box;
        padding: 30px;
        overflow: overlay;
        width: 500px;
        height: 90vh;
    }
    label {
        color: #111;
        font-weight: 500;
    }
    input:read-only {
        cursor: not-allowed;
        color: #333;
    }
    .close {
        position: fixed;
        top: 30px;
        right: 30px;
        user-select: none;
        transition: text-shadow .15s;
        &:hover {
            text-shadow: 0px 0px 15px rgba($color: #000000, $alpha: .3);
        }
    }
    .title-input {
        font-size: 25px;
        margin-bottom: 20px;
        input {
            color: #333;
            width: 100%;
        }
    }
    .input-with-label {
        input {
            width: calc(100% - 120px );
            color: #333;
            &::placeholder {
                font-style: italic;
            }
        }
        &.nowrap {
            label { display: inline-block; width: 120px; }
        }
        &.inline { 
            display: inline-block;
        }
        &.readonly {
            label { color: #999; }
        }
        label {
            display: block;
            margin: 10px 0;
        }
        textarea {
            box-sizing: border-box;
            width: 100%;
            resize: none;
            font-size: 14px;
            color: #333;
            padding: 12px 10px;
            background-color: transparent;
            border-color: var(--border-color);
            border-radius: 8px;
            transition: box-shadow .15s;
            &:focus {
                outline: none;
                box-shadow: 0px 0px 8px 0px rgba($color: #000000, $alpha: .1);
            }
            &:hover {
                box-shadow: 0px 0px 8px 0px rgba($color: #000000, $alpha: .1);
            }
        }
    }
    .btn-grp {
        position: fixed;
        bottom: 25px;
        right: -15px;
        div {
            width: 35px;
            height: 35px;
            box-sizing: border-box;
            border: 1px solid rgba($color: #999, $alpha: .1);
            border-radius: 50%;
            cursor: pointer;
            background-color: #fff;
            margin-bottom: 10px;
            box-shadow: 0 0 15px rgba($color: #000000, $alpha: .1);
            padding: 6px;
            overflow: hidden;
            svg {
                transition: fill .25s;
                width: 20px;
            }
            &[aira-status=disabled] { cursor: not-allowed; fill: #bdc3c7; }
            &[aira-status=enabled] { fill: #707070; }
            &[aira-status=submitting] {
                pointer-events: none;
                fill: #bdc3c7;
                svg {
                    animation: submit 1.2s infinite;
                }
            }
            &[aira-status=done] { pointer-events: none; fill: #4cd137; }
            &[aira-status=error] { pointer-events: none; fill: crimson; }
            &.clear {
                img {
                    animation: clear 1.2s;
                }
            }
        }
    }
}

@keyframes submit {
    0% {
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    15% {
        transform: matrix(1, 0, 0, 1, -5, 5);
        opacity: 1;
    }
    33% {
        transform: matrix(1, 0, 0, 1, 20, -20);
        opacity: 0;
    }
    50% {
        transform: matrix(1, 0, 0, 1, -20, 20);
        opacity: 0;
    }
    100% {
        transform: matrix(1, 0, 0, 1, 0, 0);
        opacity: 1;
    }
}
@keyframes clear {
    0% {
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
    15% {
        transform: matrix(1, 0, 0, 1, -5, 0);
        opacity: 1;
    }
    33% {
        transform: matrix(1, 0, 0, 1, 20, 0);
        opacity: 0;
    }
    50% {
        transform: matrix(1, 0, 0, 1, -20, 0);
        opacity: 0;
    }
    100% {
        transform: matrix(1, 0, 0, 1, 0, 0);
        opacity: 1;
    }
}
</style>