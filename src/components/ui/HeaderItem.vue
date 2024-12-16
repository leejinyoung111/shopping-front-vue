<script setup>
import { onMounted, ref } from "vue";
import IconBase from "../icon/IconBase.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const router = useRouter();

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user.userInfo.user;
  }
};

// 세션 스토리지 리셋
const sessionReset = () => {
  sessionStorage.clear();
};

// 프로필페이지 이동
const goToProfile = () => {
  const userId = getUser.value.id;
  router.push(`/profile/${userId}`);
};

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div
    class="fixed w-full flex items-center justify-between h-14 text-white z-10"
  >
    <!-- 로고 -->
    <router-link
      to="/"
      class="border border-red-500 flex items-center justify-start gap-2 md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-500 dark:bg-gray-800 border-none"
      @click="sessionReset"
    >
      <IconBase title="logo" :class-change="'w-[30px] h-[30px]'" />
      <span class="hidden md:block font-semibold">북 스토어</span>
    </router-link>

    <!-- 이미지, 유저이름 -->
    <div
      class="flex justify-end items-center pr-10 h-14 bg-gray-500 dark:bg-gray-800 header-right"
    >
      <span
        v-if="getUser != undefined"
        class="flex justify-center items-center gap-5 cursor-pointer"
        @click="goToProfile()"
      >
        <img
          class="w-8 h-8 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <span>
          {{ getUser.name }}
        </span>
      </span>
    </div>
  </div>
</template>
