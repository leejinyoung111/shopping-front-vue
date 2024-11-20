<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// 변수
const getUser = ref();
const router = useRouter();
const pathname = window.location.pathname;
const beforeLoginMenu = [
  {
    title: "로그인",
    url: "/login",
  },
];
const afterLoginMenu = [
  {
    title: "장바구니",
    url: "/cart",
  },
  {
    title: "프로필",
    url: "/profile",
  },
];
const isToggle = ref(false);

// 토글바 전환
const sidebarToggle = () => {
  isToggle.value = !isToggle.value;
};

// 로그아웃
const logout = async () => {
  try {
    isToggle.value = false;
    localStorage.clear();
    router.replace("/");
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getUser.value = JSON.parse(localStorage.getItem("userInfo"));
});
</script>
<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-red-500"
          >북 스토어</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        @click="sidebarToggle"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        class="w-full md:block md:w-auto"
        id="navbar-default"
        :class="isToggle ? '' : 'hidden'"
      >
        <ul
          v-if="getUser == null"
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="(item, key) in beforeLoginMenu" :key="key">
            <a
              :href="item.url"
              class="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-blue-700 font-semibold text-xl"
              :class="
                pathname == item.url
                  ? ' text-blue-500 md:text-blue-500 md:dark:text-blue-500'
                  : 'md:text-black md:dark:text-black'
              "
              aria-current="page"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>

        <ul
          v-else
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="(item, key) in afterLoginMenu" :key="key">
            <a
              :href="item.url"
              class="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:text-blue-700 font-semibold text-xl"
              :class="
                pathname == item.url
                  ? ' text-blue-500 md:text-blue-500 md:dark:text-blue-500'
                  : 'md:text-black md:dark:text-black'
              "
              aria-current="page"
              >{{ item.title }}</a
            >
          </li>
          <li>
            <button
              @click="logout"
              class="block py-2 px-3 md:text-black md:dark:text-white rounded md:bg-transparent md:p-0 hover:text-blue-700 font-semibold text-xl dark:text-white"
            >
              로그아웃
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
