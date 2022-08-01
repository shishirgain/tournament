<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useUserStore } from '../../store/users'
const userStore = useUserStore();

const message = computed(() => userStore.get_message)
const user = reactive<{ email: string, password: string }>({ email: '', password: '' })
const isSubmitable = computed(()=> user.email && user.password ? false : true)
const submit = (event: Event) => {
  let [ email, password ]:any = event.target;
  userStore.login({ email: email.value, password: password.value })
}
</script>

<template>
  <div v-if="message" class="alert alert-warning shadow-lg absolute top-0">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>{{ message }}</span>
    </div>
  </div>
  <form class="flex flex-col gap-y-5 rounded-2xl max-w-[400px] w-full p-3" @submit.prevent="submit">
    <input type="email" v-model="user.email" name="email" placeholder="Type here" class="input input-bordered input-md w-full" required>
    <input type="password" v-model="user.password" name="password" placeholder="Type here" class="input input-bordered input-md w-full" required>
    <div class="divider"></div> 
    <input class="btn btn-info btn-block" type="submit" value="Login" :disabled="isSubmitable">
  </form>
</template>