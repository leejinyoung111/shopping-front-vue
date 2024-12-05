<script setup>
import { onMounted, ref } from "vue";
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
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user;

    // 관리자 여부
    if (getUser.value.role != "admin") {
      router.replace("/");
    }
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div>상품 페이지</div>
</template>
