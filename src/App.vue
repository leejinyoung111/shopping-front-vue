<script setup>
import SidebarItem from "@/components/ui/SidebarItem.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import HeaderItem from "./components/ui/HeaderItem.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div
    class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"
  >
    <!-- 헤더 -->
    <HeaderItem />

    <!-- 사이드바 -->
    <SidebarItem />

    <!-- 메인 -->
    <MainLayout>
      <router-view />
      <ModalsContainer />
    </MainLayout>
  </div>
</template>
