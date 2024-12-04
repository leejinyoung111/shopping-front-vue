<script setup>
import { VueFinalModal } from "vue-final-modal";
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col w-2/3 sm:w-2/4 lg:w-1/3  p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <slot />
  </VueFinalModal>
</template>
