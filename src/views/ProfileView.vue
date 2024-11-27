<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import { onMounted, ref } from "vue";

// 변수
const postcode = ref("");
const address = ref("");
const detailAddress = ref("");
const getUser = ref();

// 유저 정보 가져오기
const getUserInfo = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  getUser.value = userInfo;
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center">
    <!-- 유저 정보 -->
    <div v-if="getUser != null" class="pt-5">
      <img
        class="w-32 h-32 rounded-full mx-auto"
        src="https://picsum.photos/200"
        alt="Profile picture"
      />
      <h2 class="text-center text-2xl font-semibold mt-3">
        {{ getUser.email }}
      </h2>
      <p class="text-center text-gray-600 mt-1">{{ getUser.name }}</p>
    </div>
  </div>
</template>
