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
    <!-- header -->
    <HeaderItem />

    <!-- sidebar -->
    <SidebarItem />

    <!-- main -->
    <MainLayout>
      <router-view />
      <ModalsContainer />
    </MainLayout>
  </div>
</template>
