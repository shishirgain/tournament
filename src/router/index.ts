import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import NProgress from 'nprogress'

// Layouts
import Default from '../layouts/Default.vue'
import Application from '../layouts/Application.vue'
import Auth from '../layouts/Auth.vue'
import Error from '../layouts/Error.vue'


// Pages
import Home from '../page/Home.vue'
import Dashboard from '../page/app/Dashboard.vue'
import Login from '../page/auth/Login.vue'
import Registration from '../page/auth/Registration.vue'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '',
                component: Home,
            }
        ]
    },
    {
        path: '/app',
        component: Application,
        children: [
            {
                path: '',
                component: Dashboard,
            }
        ],
        meta: { requireAdmin: true },
    },
    {
        path: '/auth',
        component: Auth,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'registration',
                component: Registration,
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let isAdmin = to.meta.requireAdmin;
    let adminToken = localStorage.adminToken;
    if (isAdmin && !adminToken) {
        next({ path: '/auth/login' });
    } else {
        next();
    }

    if (!NProgress.isStarted()) {
        NProgress.start();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router
