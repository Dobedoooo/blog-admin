import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";

import initLoading from '../view/initLoading/initLoading.vue'
import frame from '../view/frame/frame.vue'
import error from '../view/frame/error/error.vue'
import note from '../view/frame/note.vue'
import idea from '../view/frame/idea.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'initLoading', component: initLoading },
    { 
        path: '/frame', name: 'frame', component: frame,
        children: [
            { path: 'error', name: 'error', component: error },
            { path: 'note', name: 'note', component: note },
            { path: 'idea', name: 'idea', component: idea },
        ]
    },
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

