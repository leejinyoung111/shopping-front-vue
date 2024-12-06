<script setup>
defineProps(["type", "text"]);
</script>
<template>
  <label :for="type" class="block text-sm/6 font-medium text-gray-900">{{
    text
  }}</label>
</template>
