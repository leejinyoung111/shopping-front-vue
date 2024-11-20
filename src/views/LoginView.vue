<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

// storage
const authStore = useAuthStore();

// 변수
const email = ref("");
const password = ref("");
const router = useRouter();

// 로그인
const submit = async () => {
  try {
    let value = {
      email: email.value,
      password: password.value,
    };

    // 유저정보 저장
    authStore.setUserInfo(value);

    alert("로그인 성공!");

    router.push("/");

    // let getUser = JSON.parse(localStorage.getItem("userInfo"));

    // console.log(getUser);

    // const result = await LoginApi(value);

    // if (result.status == 201) {
    //   // 유저 정보 가져오기
    //   const getUserInfo = await GetUserApi(result.data.result);

    //   // 유저정보 저장
    //   authStore.setUserInfo(getUserInfo);

    //   let getUser = JSON.parse(localStorage.getItem("userInfo"));

    //   // 경로 이동
    //   if (getUser.role == "admin") {
    //     router.replace("/dashboard");
    //   } else {
    //     router.go(0);
    //   }
    // } else if (result.status == 422) {
    //   // 에러 처리
    //   errorMessageHandling(result.response.data);
    // }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        로그인
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit()">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >이메일</label
          >
          <div class="mt-2">
            <InputItem
              type="email"
              placeholder="이메일"
              v-model="email"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >비밀번호</label
            >
          </div>
          <div class="mt-2">
            <InputItem
              type="password"
              placeholder="비밀번호"
              v-model="password"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
        </div>

        <div class="mt-6">
          <BlueButton value="submit" text="로그인" />
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        회원이 아닌가요?
        <a
          href="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500 mx-3"
          >계정 생성하기</a
        >
      </p>
    </div>
  </div>
</template>
