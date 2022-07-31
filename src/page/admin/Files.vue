<template>
  <div class="relative h-full flex flex-col">
    <div class="p-2 font-semibold flex justify-between items-center">
      <span>Files</span>
      <div>
        <button class="btn bg-green-500 text-white" @click="modal = !modal">New</button>
      </div>
    </div>
    <hr />
    <div class="overflow-y-scroll">
      <FileView :files="files" />
    </div>
    <DialogInside v-if="modal">
      <FileNew @cancel="modal = !modal" />
    </DialogInside>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import DialogInside from "@/components/DialogInside";
import FileView from '@/components/admin/file/FileView.vue'
import FileNew from '@/components/admin/file/FileNew.vue'

const store = useStore();
const modal = ref(false);

onMounted(() => store.dispatch("file/getFiles"));

let files = computed(() => store.getters["file/files"]);
</script>

<style>
</style>