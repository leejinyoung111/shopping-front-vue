<script setup>
defineProps(["type", "text", "addClass"]);
</script>
<template>
  <button
    :type="type"
    class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    :class="addClass"
  >
    {{ text }}
  </button>
</template>
