import { reactive } from "vue";
import { defineStore } from "pinia";

export const users = defineStore("users", {
    state: () => ({
        user: null as { id: number, name: string, email: string } | null
    }),
    getters: {
        get_user: (state) => state.user
    }
});