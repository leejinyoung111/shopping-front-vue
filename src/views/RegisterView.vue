<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";
import InputItem from "@/components/form/InputItem.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

// 변수
const email = ref("");
const name = ref("");
const password = ref("");
const postcode = ref("");
const address = ref("");
const detailAddress = ref("");

const emailMessage = ref("존재하는 이메일입니다.");
const nameMessage = ref("한글 또는 영어만 가능합니다.");
const passwordMessage = ref("8자 이상 16자 이하 가능합니다.");

const router = useRouter();

// 주소 검색
const searchAddress = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      address.value = data.address;
      postcode.value = data.zonecode;
    },
  }).open();
};

// 회원가입
const submit = async () => {
  try {
    let value = {
      email: email.value,
      name: name.value,
      postcode: postcode.value,
      address: address.value,
      detailAddress: detailAddress.value,
      password: password.value,
    };

    console.log(value);

    // alert("회원가입 성공!");

    // router.push("/login");

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
  <div class="flex flex-col gap-5 justify-center items-center">
    <!-- 타이틀 -->
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        회원가입
      </h2>
    </div>
    <!-- 회원가입 폼 -->
    <div class="mt-5 w-full md:w-2/3 lg:w-2/4">
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
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
          <ErrorMessage :text="emailMessage" />
        </div>

        <!-- 이름 -->
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900"
            >이름</label
          >
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="이름"
              v-model="name"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <ErrorMessage :text="nameMessage" />
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

        <!-- 우편번호 -->
        <div>
          <label
            for="postcode"
            class="block text-sm/6 font-medium text-gray-900"
          >
            우편번호</label
          >
          <div class="grid grid-cols-2 gap-2 items-center justify-center">
            <InputItem
              type="text"
              placeholder="우편번호"
              v-model="postcode"
              readonly="true"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
            <input
              type="button"
              class="cursor-pointer py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              value="주소 검색"
              @click="searchAddress"
            />
          </div>
        </div>

        <!-- 주소 -->
        <div>
          <label for="address" class="block text-sm/6 font-medium text-gray-900"
            >주소</label
          >
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="주소"
              v-model="address"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
        </div>

        <!-- 상세 주소 -->
        <div>
          <label
            for="detailAddress"
            class="block text-sm/6 font-medium text-gray-900"
            >상세 주소</label
          >
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="상세 주소"
              v-model="detailAddress"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
        </div>
        <!-- 버튼 -->
        <div class="mt-6">
          <BlueButton value="submit" text="회원가입" />
        </div>
      </form>

      <p class="mt-10 text-center text-lg text-gray-500">
        회원인가요?
        <router-link
          to="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500 mx-10"
        >
          로그인
        </router-link>
      </p>
    </div>
  </div>
</template>
