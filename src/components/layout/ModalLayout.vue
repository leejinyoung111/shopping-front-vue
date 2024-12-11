<script setup>
import { VueFinalModal } from "vue-final-modal";
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col w-3/4 sm:w-2/4 lg:w-2/4 xl:w-1/3 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <slot />
  </VueFinalModal>
</template>
