<template>
    <div class="add-wrapper">
        <div class="form-wrapper">
            <div class="close cur" @click.stop="coverStore.change({ flag: false })">✖</div>
            <form>
                <div class="title-input">
                    <input type="text" v-model="errorData.error_title" placeholder="Untitled" autocomplete="off">
                    <div v-if="errorData.error_timestamp">{{ errorData.error_timestamp }}</div>
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
                    <DatePicker watch-key="date"></DatePicker>
                </div>
                <div class="input-with-label nowrap">
                    <label for="tag">Tag</label>
                    <input type="text" id="tag" placeholder="Empty (Use semicolons to separate)" autocomplete="off">
                </div>
                <div class="input-with-label">
                    <label for="desc">Description</label>
                    <textarea id="desc" rows="2" v-model="errorData.error_desc" autocomplete="off"></textarea>
                </div> 
                <div class="input-with-label">
                    <label for="analysis">Analysis</label>
                    <textarea id="analysis" rows="10" v-model="errorData.error_desc" autocomplete="off"></textarea>
                </div> 
                <div class="input-with-label">
                    <label for="resolve">Solution</label>
                    <textarea id="resolve" rows="10" v-model="errorData.error_desc" autocomplete="off"></textarea>
                </div> 
            </form>
            <div class="btn-grp">
                <div><img src="../../../assets/svgs/application/submit.svg"></div>
                <div><img src="../../../assets/svgs/application/clear.svg"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { ErrorEntity } from '../../../api/errorApi';

import SelectComponent, { Option } from '../../../components/select.vue';
import DatePicker from '../../../components/datePicker.vue';

import { useCoverStore } from '../../../store/coverstore'

const coverStore = useCoverStore()

const props = defineProps<{
    errorId: number | null
}>()

const errorData: Ref<ErrorEntity> = ref({
    error_title: '',
    error_timestamp: '',
    error_create_user: 'root',
    error_desc: '',
    error_type: '',
    error_subtype: '',
    error_create_time: '',
    error_analysis: '',
    error_resolve: '',
    universal_tag: '',
    error_deleted: null
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

</script>

<style lang="scss" scoped>
.add-wrapper {
    position: relative;
    perspective: 80px;
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
            border: 1px solid rgba($color: #999, $alpha: .1);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            backdrop-filter: blur(20px) saturate(180%);
            margin-bottom: 10px;
            box-shadow: 0 0 15px rgba($color: #000000, $alpha: .1);
        }
    }
}
</style>