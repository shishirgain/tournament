import Auth from '../layouts/Auth.vue'

import Login from '../page/auth/Login.vue'
import Registration from '../page/auth/Registration.vue'

export default {
    path: '/account',
    component: Auth,
    children: [
        {
            path: 'login',
            name: 'login',
            component: Login
        },
        {
            path: 'registration',
            name: 'registration',
            component: Registration,
        },
    ]
}