<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import InputItem from "@/components/form/InputItem.vue";
import BlueButton from "@/components/button/BlueButton.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";
import { UpdateUserApi } from "@/api/user";
import { nameValidate, passwordValidate } from "@/utils/Validation";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import LabelItem from "@/components/text/LabelItem.vue";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const router = useRouter();
const changeName = ref("");
const changePassword = ref("");
const changePostCode = ref("");
const changeAddress = ref("");
const changeDetailAddress = ref("");
const nameMessage = ref("");
const passwordMessage = ref("");

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user;

    // 관리자 여부
    if (getUser.value.role == "admin") {
      router.replace("/");
    }
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

// 주소 검색
const searchAddress = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      changeAddress.value = data.address;
      changePostCode.value = data.zonecode;
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

// 개인정보 변경
const submit = async () => {
  try {
    // 유효성 체크
    const nameCheck = validateCheck(
      nameValidate(changeName.value),
      nameMessage
    );
    const passwordCheck = validateCheck(
      passwordValidate(changePassword.value),
      passwordMessage
    );

    // 모두 일치할 경우
    if (nameCheck && passwordCheck) {
      let value = {
        id: getUser.value.id,
        email: getUser.value.email,
        name: changeName.value,
        password: changePassword.value,
        postCode: changePostCode.value,
        address: changeAddress.value,
        detailAddress: changeDetailAddress.value,
      };

      const result = await UpdateUserApi(value);

      const getData = result.data.result;
      const status = result.data.status;

      if (status.status == "success") {
        // 기존 토큰 삭제
        localStorage.removeItem("accessToken");

        // 토큰 저장
        authStore.setToken(getData.accessToken);
        getUserInfo();

        alert("수정 성공!");
        window.location.replace("/profile");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <ContainerLayout v-if="getUser != null">
    <!-- 유저 정보 -->
    <div class="pt-5">
      <img
        class="w-32 h-32 rounded-full mx-auto"
        src="https://picsum.photos/200"
        alt="Profile picture"
      />
      <h2 class="text-center text-2xl font-semibold mt-3">
        {{ getUser.email }}
      </h2>
    </div>

    <!-- 정보 변경 폼 -->
    <div
      class="border-2 border-gray-500/30 rounded-lg mt-5 p-3 w-full md:w-2/3 lg:w-2/4"
    >
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
        <div>
          <LabelItem type="email" text="이메일" />
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="이메일"
              v-model="getUser.email"
              class="py-2 px-3 font-bold border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              readonly="true"
            />
          </div>
        </div>

        <!-- 이름 -->
        <div>
          <LabelItem type="name" text="이름" />
          <div class="mt-2">
            <InputItem
              type="text"
              :placeholder="getUser.name"
              v-model="changeName"
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
              v-model="changePassword"
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
              :placeholder="getUser.postCode"
              v-model="changePostCode"
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
              :placeholder="getUser.address"
              v-model="changeAddress"
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
              :placeholder="getUser.detailAddress"
              v-model="changeDetailAddress"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
        </div>

        <!-- 버튼 -->
        <div class="mt-6">
          <BlueButton type="submit" text="개인정보 변경" add-class="w-full" />
        </div>
      </form>
    </div>
  </ContainerLayout>
</template>
