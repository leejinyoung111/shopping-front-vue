<script setup>
import { LogoutApi } from "@/api/user";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import IconBase from "../icon/IconBase.vue";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();

// 메뉴리스트
const loginBefore = [
  {
    title: "로그인",
    url: "/login",
    icon: "login",
  },
];
const loginAfter = [
  {
    title: "추천도서",
    url: "/recommend",
    icon: "book",
    role: "user",
  },
  {
    title: "장바구니",
    url: "/cart",
    icon: "cart",
    role: "user",
  },
  {
    title: "주문리스트",
    url: `/order`,
    icon: "order",
    role: "user",
  },
  {
    title: "상품관리",
    url: "/admin/product",
    icon: "product",
    role: "admin",
  },
];

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user.userInfo.user;
  }
};

// 로그아웃
const logout = async () => {
  await LogoutApi();
  window.location.reload();
  window.location.replace("/");
};

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div
    class="fixed flex flex-col top-14 left-0 w-14 hover:w-64 sm:w-64 bg-gray-700 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar"
  >
    <div
      class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"
    >
      <!-- 로그인 전 -->
      <ul v-if="getUser == null" class="flex flex-col py-4 space-y-1">
        <li v-for="(item, key) in loginBefore" :key="key">
          <router-link
            :to="item.url"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <IconBase :title="item.icon" :class-change="'w-5 h-5'" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">{{
              item.title
            }}</span>
          </router-link>
        </li>
      </ul>

      <!-- 로그인 후 -->
      <ul v-if="getUser != null" class="flex flex-col py-4 space-y-1">
        <li v-for="(item, key) in loginAfter" :key="key">
          <router-link
            v-if="getUser.role == item.role"
            :to="item.url"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <IconBase :title="item.icon" :class-change="'w-5 h-5'" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">{{
              item.title
            }}</span>
          </router-link>
        </li>
        <li>
          <button
            class="w-full relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            @click="logout"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <IconBase title="logout" :class-change="'w-5 h-5'" />
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
