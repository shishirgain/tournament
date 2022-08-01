import Application from '../layouts/Application.vue'

import Dashboard from '../page/app/Dashboard.vue'

export default {
    path: '/application',
    component: Application,
    children: [
        {
            path: '',
            name: 'dashboard',
            component: Dashboard,
        }
    ],
    meta: { requireAdmin: true },
}