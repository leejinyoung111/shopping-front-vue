<script setup>
import SidebarItem from "@/components/ui/SidebarItem.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import HeaderItem from "./components/ui/HeaderItem.vue";
import { ModalsContainer } from "vue-final-modal";
import { useRoute } from "vue-router";

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
