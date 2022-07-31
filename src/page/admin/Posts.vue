<template>
  <div class="relative h-full">
    <div class="p-2 font-semibold flex justify-between items-center">
      <span>Posts</span>
      <div>
        <button class="btn bg-green-500 text-white" @click="modal = !modal">New</button>
      </div>
    </div>
    <hr />

    <div>
      <PostView :posts="posts" />
    </div>

    <DialogInside v-if="modal">
      <PostNew @cancel="modal = !modal" />
    </DialogInside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DialogInside from "@/components/DialogInside";
import PostView from '@/components/admin/post/PostView.vue';
import PostNew from '@/components/admin/post/PostNew.vue';

const context = {
  slots: useSlots(),
  attrs: useAttrs(),
};

const store = useStore();
const modal = ref(false);
const posts = computed(() => store.getters['post/posts']);

onMounted(() => {
  store.dispatch('post/getPosts');
})

const save = () => {
  console.log('save');
  modal.value = !modal.value;
}
</script>

<style scoped>
</style>