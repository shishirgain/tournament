<template>
  <div class="relative h-full">
    <div class="p-2 font-semibold flex justify-between items-center">
      <span>Categories</span>
      <div>
        <button class="btn bg-green-500 text-white" @click="modal = !modal">New</button>
      </div>
    </div>
    <hr />
    <CategoriesView :categories="categories" />
    <DialogInside v-if="modal">
      <CategoryNew @cancel="modal = !modal" />
    </DialogInside>
  </div>
</template>

<script setup>
import DialogInside from "@/components/DialogInside";
import CategoryNew from '@/components/admin/category/CategoryNew';
import CategoriesView from '@/components/admin/category/CategoriesView';
import { ref, computed } from "vue";
import { useStore } from 'vuex'

const store = useStore();
const modal = ref(false);
const save = () => {
  console.log('save');
}
const categories = computed(() => store.getters['categories/categories']);
</script>

<style scoped>
</style>