<script setup>
import SidebarItem from "@/components/ui/SidebarItem.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import HeaderItem from "./components/ui/HeaderItem.vue";
import { ModalsContainer } from "vue-final-modal";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { nextTick, onMounted } from "vue";

useHead({
  title: "북스토어",
  meta: [
    {
      name: "description",
      content: "이 사이트는 Vue3로 만든 SEO 최적화 북스토어입니다.",
    },
    { property: "og:title", content: "Vue3 북스토어" },
    { property: "og:description", content: "SEO가 적용된 Vue3 북스토어" },
  ],
});

onMounted(() => {
  setTimeout(() => {
    console.log(document.querySelector('meta[property="og:title"]'));
    console.log(document.querySelector('meta[property="og:description"]'));
  }, 1000);
});

// 라우트 설정
const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"
  >
    <!-- header -->
    <HeaderItem />

    <!-- sidebar -->
    <SidebarItem />

    <!-- main -->
    <MainLayout>
      <!-- 같은 페이지 replace -->
      <router-view :key="route.fullPath" />
      <ModalsContainer />
    </MainLayout>
  </div>
</template>
