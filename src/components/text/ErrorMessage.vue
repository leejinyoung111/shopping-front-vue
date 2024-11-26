<script setup>
defineProps(["text"]);
</script>
<template>
  <div class="text-red-500 px-3 py-2 font-medium text-md">
    {{ text }}
  </div>
</template>