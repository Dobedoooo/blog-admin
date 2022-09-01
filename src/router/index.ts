import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";

import loading from '../view/initLoading/initLoading.vue'
import frame from '../view/frame/frame.vue'
import error from '../view/frame/error/error.vue'
import note from '../view/frame/note.vue'
import idea from '../view/frame/idea.vue'
import type_vue from '../view/frame/type/type.vue'

const routes: RouteRecordRaw[] = [
    { path: '/' , name: 'loading', component: loading },
    { 
        path: '/frame', name: 'frame', component: frame, redirect: '/frame/dashboard',
        children: [
            { path: 'dashboard', name: 'dashboard', component: error },
            { path: 'error', name: 'error', component: error },
            { path: 'note', name: 'note', component: note },
            { path: 'idea', name: 'idea', component: idea },
            { path: 'notifiacation', name: 'notifiacation', component: idea },
            { path: 'membership', name: 'membership', component: idea },
            { path: 'suspension', name: 'suspension', component: idea },
            { path: 'noshow', name: 'noshow', component: idea },
            { path: 'type', name: 'type', component: type_vue },
        ]
    },
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

