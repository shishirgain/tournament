<template>
  <div class="root">
    <header class="header">
      <div class="font-bold text-lg">Admin Panel</div>
      <div>
        <span>{{ admin && admin.name }}</span>
        <button class="ml-3 py-1 px-4 bg-red-500 text-sm rounded-sm" @click="logout">Logout</button>
      </div>
    </header>
    <div class="main">
      <aside class="nav">
        <div class="list">
          <div class="list__item" v-for="(nav, index) in navigatorList" :key="`nav-item-${index}`">
            <router-link exact-active-class="active" :to="nav.url">{{ nav.name }}</router-link>
          </div>
        </div>
      </aside>
      <main class="w-full overflow-y-scroll">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
const list = [
  { name: "Dashboard", url: "/admin/" },
  { name: "Posts", url: "/admin/posts" },
  { name: "Category", url: "/admin/categories" },
  { name: "Files", url: "/admin/files" },
  { name: "Teacher Panel", url: "/admin/teachers" },
  { name: "Student Panel", url: "/admin/students" },
  { name: "Office Stuff", url: "/admin/officers" },
];

import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const navigatorList = ref(list);

    onMounted(() => store.dispatch("admin/admin"));

    const admin = computed(() => store.getters['admin/admin']);
    const logout = () => store.dispatch("admin/logout");

    return { navigatorList, logout, admin };
  },
};
</script>

<style scoped>
.root {
  @apply h-screen;
  display: flex;
  flex-direction: column;
}
.header {
  @apply p-3 shadow-md bg-black text-white flex justify-between items-center;
}
.main {
  @apply flex h-full w-full;
}
.nav {
  min-width: 200px;
  @apply bg-gray-100 h-full;
}
.list {
  @apply flex;
  flex-direction: column;
}
.list__item {
  @apply bg-transparent;
}
.list__item a {
  @apply block px-4 py-2 w-full text-gray-800 font-semibold;
}
.list__item a:hover {
  @apply bg-gray-200 text-gray-900;
}
.list__item .active {
  @apply bg-gray-200 text-gray-900;
}
</style>