<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";
import InputItem from "@/components/form/InputItem.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { LoginApi } from "@/api/user";
import { emailValidate, passwordValidate } from "@/utils/Validation";

// storage
const authStore = useAuthStore();

// 변수
const email = ref("");
const password = ref("");
const emailMessage = ref("");
const passwordMessage = ref("");

// 유효성 체크
const validateCheck = (check, message) => {
  if (check != true) {
    message.value = check;
  } else {
    message.value = "";
    return true;
  }
};

// 로그인
const submit = async () => {
  try {
    // 유효성 체크
    const emailCheck = validateCheck(emailValidate(email.value), emailMessage);
    const passwordCheck = validateCheck(
      passwordValidate(password.value),
      passwordMessage
    );

    if (emailCheck && passwordCheck) {
      let value = {
        email: email.value,
        password: password.value,
      };

      const result = await LoginApi(value);

      if (result.status == 200) {
        delete result.data.user.password;

        authStore.setUserInfo(result.data.user);
        alert("로그인 성공!");
        window.location.replace("/");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="flex flex-col gap-5 justify-center items-center">
    <!-- 타이틀 -->
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        로그인
      </h2>
    </div>

    <!-- 로그인 폼 -->
    <div class="mt-5 w-full md:w-2/3 lg:w-2/4">
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >이메일</label
          >
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="이메일"
              v-model="email"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <ErrorMessage :text="emailMessage" />
        </div>

        <!-- 비밀번호 -->
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
          <ErrorMessage :text="passwordMessage" />
        </div>

        <!-- 버튼 -->
        <div class="mt-6">
          <BlueButton value="submit" text="로그인" />
        </div>
      </form>

      <p class="mt-10 text-center text-lg text-gray-500">
        회원이 아닌가요?

        <router-link
          to="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500 mx-10"
        >
          회원가입
        </router-link>
      </p>
    </div>
  </div>
</template>
