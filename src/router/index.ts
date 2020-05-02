import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/:lang',
        name: 'home'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.params.lang) {
        store.commit('currentLanguage', to.params.lang);
        next();
        return;
    }
    if (!store.state.currentLanguage) {
        store.commit('currentLanguage', 'de');
    }
    next({name: 'home', params:{lang: store.state.currentLanguage}});
});

export default router