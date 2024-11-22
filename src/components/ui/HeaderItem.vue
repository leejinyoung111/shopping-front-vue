<script setup>
import LogoIcon from "../icon/LogoIcon.vue";
</script>
<template>
  <div
    class="fixed w-full flex items-center justify-between h-14 text-white z-10"
  >
    <router-link
      to="/"
      class="flex items-center justify-start gap-2 md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-500 dark:bg-gray-800 border-none"
    >
      <LogoIcon class="w-[30px] h-[30px]" />
      <span class="hidden md:block font-semibold">북 스토어</span>
    </router-link>

    <div
      class="flex justify-center items-center h-14 bg-gray-500 dark:bg-gray-800 header-right"
    >
      <!-- <ul class="flex items-center">
          <li>
            <a
              href="/login"
              class="flex items-center mr-4 hover:text-blue-100 text-black"
            >
              <span class="inline-flex mr-1">
                <Login class="w-[30px] h-[30px]" />
              </span>
              로그인
            </a>
          </li>
        </ul> -->
    </div>
  </div>
</template>
