import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import NProgress from 'nprogress'

import router from "../router";

import { Credentials, User } from '../interfaces'

import { LoginAPI } from '../_api/admin'

export const useUserStore = defineStore("users", {
    state: () => ({
        user: ref<User | null>(null),
        returnUrl: ref<null | string>(null),
        message: ref<string>('')
    }),
    getters: {
        get_user: state => state.user,
        get_message: stage => stage.message
    },
    actions: {
        login(credentials: Credentials) {
            NProgress.start()
            LoginAPI(credentials).then(res => {
                this.user = res.admin
                localStorage.token = res.token
                this.message = res.message
                setTimeout(() => {
                    this.message = ''
                    router.push('/application')
                }, 3000)
            }).catch(err => {
                this.message = err
            })
        },
    },
});