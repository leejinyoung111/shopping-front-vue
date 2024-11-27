<script setup>
import { LogoutApi } from "@/api/user";
import { onMounted, ref } from "vue";

// 변수
const isLogin = ref(false);

// 메뉴리스트
const loginBefore = [
  {
    title: "로그인",
    url: "/login",
  },
];

const loginAfter = [
  {
    title: "장바구니",
    url: "/cart",
  },
  {
    title: "프로필",
    url: "/profile",
  },
];

// 유저 정보 가져오기
const getUser = async () => {
  let getUser = JSON.parse(localStorage.getItem("userInfo"));
  if (getUser == null) {
    isLogin.value = false;
  } else {
    isLogin.value = true;
  }
};

// 로그아웃
const logout = async () => {
  await LogoutApi();
  window.location.reload();
};

onMounted(() => {
  getUser();
});
</script>
<template>
  <div
    class="fixed flex flex-col top-14 left-0 w-14 hover:w-64 sm:w-64 bg-gray-700 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar"
  >
    <div
      class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"
    >
      <ul v-if="!isLogin" class="flex flex-col py-4 space-y-1">
        <li v-for="(item, key) in loginBefore" :key="key">
          <router-link
            :to="item.url"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">{{
              item.title
            }}</span>
          </router-link>
        </li>
      </ul>
      <ul v-if="isLogin" class="flex flex-col py-4 space-y-1">
        <li v-for="(item, key) in loginAfter" :key="key">
          <router-link
            :to="item.url"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span class="inline-flex justify-center items-center ml-4">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
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
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
