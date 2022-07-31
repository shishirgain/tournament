<template>
  <div class="container mx-auto">
    <div class="max-w-sm mt-20 mx-auto my-4 font-semibold text-2xl">
      Login to admin panel
    </div>
    <form class="form" method="post" @submit.prevent="login">
      <div class="form__item">
        <label for="email">Email</label>
        <input type="email" name="email" required />
      </div>
      <div class="form__item">
        <label for="password">Password</label>
        <input type="password" name="password" required />
      </div>
      <div class="form__item">
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();

    const login = (event) => {
      const email = event.target[0].value;
      const password = event.target[1].value;
      store.dispatch("admin/login", { email, password });
    };
    
    return { login };
  },
};
</script>

<style scoped>
.form {
  border: 1px solid #ddd;
  @apply max-w-sm py-2 mx-auto px-4 rounded-md shadow-sm;
}
.form__item {
  @apply flex py-2;
  flex-direction: column;
}

.form__item input {
  border: 1px solid #ddd;
  @apply p-2 rounded-md;
}
.form__item input[type="submit"] {
  border: none;
  cursor: pointer;
}
.form__item input[type="submit"]:hover {
  border: none;
  background: #ddd;
}

.form__item label {
  @apply ml-2;
}
</style>