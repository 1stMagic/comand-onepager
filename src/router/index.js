import {createRouter, createWebHistory} from "vue-router"
import {usePiniaStore} from "../stores/pinia"

const routes = [
    {
        path: '/:lang([a-z]{2})?',
        name: 'home',
        component: {}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const store = usePiniaStore()
    if (to.params.lang) {
        store.currentLanguage = to.params.lang
        return
    }
    if (!store.currentLanguage) {
        store.currentLanguage = "de"
    }
    return {name: 'home', params:{lang: store.currentLanguage}}
})

export default router
