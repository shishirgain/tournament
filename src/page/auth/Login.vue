<script lang="ts" setup>
import { reactive, computed } from 'vue'
const user = reactive<{ email: string, password: string }>({ email: '', password: '' })
const isSubmitable = computed(()=> user.email && user.password ? false : true)
const submit = (event: Event) => {
  console.log(event);
}
</script>

<template>
  <form class="flex flex-col gap-y-5 rounded-2xl max-w-[400px] w-full p-3" @submit.prevent="submit">
    <input type="email" v-model="user.email" name="email" placeholder="Type here" class="input input-bordered input-md w-full" required>
    <input type="password" v-model="user.password" name="password" placeholder="Type here" class="input input-bordered input-md w-full" required>
    <hr>
    <input class="btn btn-info btn-block" type="submit" value="Login" :disabled="isSubmitable">
  </form>
</template>