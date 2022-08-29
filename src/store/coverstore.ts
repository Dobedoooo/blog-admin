import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export interface CoverArgument {
    type?: 'plain' | 'shadow'
    flag: boolean
}

export const useCoverStore = defineStore('cover', () => {
    const coverFlag: Ref<boolean> = ref(false)
    const coverType: Ref<'plain' | 'shadow' | undefined> = ref('plain')
    function change(arg: CoverArgument = { flag: false, type: 'plain' }): void {
        coverFlag.value = arg.flag
        coverType.value = arg.type
    }

    return { coverFlag, change, coverType }
})