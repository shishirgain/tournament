import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import NProgress from 'nprogress'

// Layouts
import Default from '../layouts/Default.vue'
import Error from '../layouts/Error.vue'

// Pages
import Home from '../page/Home.vue'

// routes
import accountRoute from "./account"
import applicationRoute from "./application"

const routes: RouteRecordRaw[] = [
    { path: '/', component: Default, children: [{ path: '', component: Home }] },
    { ...applicationRoute },
    { ...accountRoute },
    { path: '/:pathMatch(.*)*', component: Error }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active--exact',
    routes,
});

router.beforeEach((to, from, next) => {
    let authRequired = to.meta.authRequired;
    let token = localStorage.token;
    if (authRequired && !token) {
        next({ path: '/account/login' });
    } else {
        next();
    }

    next()
    if (!NProgress.isStarted()) {
        NProgress.start();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router
