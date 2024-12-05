<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";
import InputItem from "@/components/form/InputItem.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { RegisterApi } from "@/api/user";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
} from "@/utils/Validation";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";

// 변수
const email = ref("");
const name = ref("");
const password = ref("");
const postCode = ref("");
const address = ref("");
const detailAddress = ref("");
const emailMessage = ref("");
const nameMessage = ref("");
const passwordMessage = ref("");
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const router = useRouter();

// 주소 검색
const searchAddress = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      address.value = data.address;
      postCode.value = data.zonecode;
    },
  }).open();
};

// 유효성 체크
const validateCheck = (check, message) => {
  if (check != true) {
    message.value = check;
  } else {
    message.value = "";
    return true;
  }
};

// 회원가입
const submit = async () => {
  try {
    // 유효성 체크
    const emailCheck = validateCheck(emailValidate(email.value), emailMessage);
    const nameCheck = validateCheck(nameValidate(name.value), nameMessage);
    const passwordCheck = validateCheck(
      passwordValidate(password.value),
      passwordMessage
    );

    // 모두 일치할 경우
    if (emailCheck && nameCheck && passwordCheck) {
      let value = {
        email: email.value,
        name: name.value,
        password: password.value,
        postCode: postCode.value,
        address: address.value,
        detailAddress: detailAddress.value,
        role: "user",
      };

      const result = await RegisterApi(value);

      const getData = result.data.result;
      const status = result.data.status;

      if (status.status == "success") {
        alert(getData.data);
        router.push("/login");
      } else {
        alert(status.message + " 다시 확인하세요.");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  if (getToken.value != null) {
    router.replace("/");
  }
});
</script>
<template>
  <ContainerLayout>
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
              type="text"
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
            for="postCode"
            class="block text-sm/6 font-medium text-gray-900"
          >
            우편번호</label
          >
          <div class="grid grid-cols-2 gap-2 items-center justify-center">
            <InputItem
              type="text"
              placeholder="우편번호"
              v-model="postCode"
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
          <BlueButton value="submit" text="회원가입" add-class="w-full" />
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
  </ContainerLayout>
</template>
