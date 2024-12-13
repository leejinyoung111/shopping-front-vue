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
import LabelItem from "@/components/text/LabelItem.vue";
import MainTitle from "@/components/text/MainTitle.vue";

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
    <MainTitle>회원가입</MainTitle>

    <!-- 회원가입 폼 -->
    <div class="mt-5 w-full md:w-2/3 lg:w-2/4">
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
        <div>
          <LabelItem type="email" text="이메일" />
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
          <LabelItem type="name" text="이름" />
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
            <LabelItem type="password" text="비밀번호" />
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
          <LabelItem type="postCode" text="우편번호" />
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
          <LabelItem type="address" text="주소" />
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
          <LabelItem type="detailAddress" text="상세 주소" />
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
          <BlueButton type="submit" text="회원가입" add-class="w-full" />
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
