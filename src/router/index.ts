import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

const layout = (name: string) => () => import(`../layouts/${name}.vue`);
const page = (name: string) => () => import(`../page/${name}.vue`);

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: layout('Default'),
        children: [
            {
                path: '',
                component: page('Home'),
            }
        ]
    },
    {
        path: '/admin',
        component: layout('Admin'),
        children: [
            {
                path: '',
                component: page('admin/Dashboard'),
            },
            {
                path: 'posts',
                component: page('admin/Posts'),
            },
            {
                path: 'categories',
                component: page('admin/Categories'),
            },
            {
                path: 'files',
                component: page('admin/Files'),
            },
            {
                path: 'teachers',
                component: page('admin/TeacherPanel'),
            },
            {
                path: 'students',
                component: page('admin/StudentPanel'),
            },
            {
                path: 'officers',
                component: page('admin/OfficeStuff'),
            },
        ],
        meta: { requireAdmin: true },
    },
    {
        path: '/auth',
        component: layout('Auth'),
        children: [
            {
                path: 'login',
                component: page('auth/Login'),
            },
            {
                path: 'registration',
                component: page('auth/Registration'),
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    if (!NProgress.isStarted()) {
        NProgress.start();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});


router.beforeEach((to, from, next) => {
    let isAdmin = to.meta.requireAdmin;
    let adminToken = localStorage.adminToken;
    if (isAdmin && !adminToken) {
        next({ path: '/auth/login' });
    } else {
        next();
    }
})

export default router
