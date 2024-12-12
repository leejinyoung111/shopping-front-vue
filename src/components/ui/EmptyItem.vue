<script setup>
import IconBase from "../icon/IconBase.vue";

defineProps(["title", "content"]);
</script>
<template>
  <div class="w-full flex items-center flex-wrap justify-center gap-10">
    <div class="grid gap-4 w-60">
      <div
        class="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex"
      >
        <IconBase title="empty" />
      </div>
      <div>
        <h2 class="text-center text-black text-lg font-semibold leading-7 pb-1">
          {{ title }}
        </h2>
        <p
          class="text-center text-black text-base font-normal leading-relaxed pb-4"
        >
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>
