import { createWebHistory, createRouter } from 'vue-router'

import DevDesign from './views/DevDesign.vue'
import DevForm from './views/DevForm.vue'

const routes = [
    { path: '/dev', component: DevDesign },
    { path: '/dev/form', component: DevForm }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router