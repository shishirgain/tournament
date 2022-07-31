import { ref } from "vue";
import { defineStore } from "pinia";

export const users = defineStore("users", () => {
    const user = ref<object>({ name: 'shishir' });

    return { user };
});