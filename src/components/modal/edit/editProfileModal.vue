<script setup lang="ts">
import { ref } from "vue";
import BlueButton from "@/components/button/BlueButton.vue";
import ModalLayout from "@/components/layout/ModalLayout.vue";
import ModalBody from "../layout/ModalBody.vue";
import ModalFooter from "../layout/ModalFooter.vue";
import ModalHeader from "../layout/ModalHeader.vue";
import InputItem from "@/components/form/InputItem.vue";
import LabelItem from "@/components/text/LabelItem.vue";
import ErrorMessage from "@/components/text/ErrorMessage.vue";
import { nameValidate, passwordValidate } from "@/utils/Validation";
import { UpdateUserApi } from "@/api/user";
import { useAuthStore } from "@/stores/auth";

// props
const props = defineProps(["title", "item", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok", user: any): void;
  (e: "close"): void;
}>();

// storage
const authStore = useAuthStore();

// 변수
const email = ref(props.item.email);
const name = ref(props.item.name);
const password = ref(props.item.password);
const postCode = ref(props.item.postCode);
const address = ref(props.item.address);
const detailAddress = ref(props.item.detailAddress);
const nameMessage = ref("");
const passwordMessage = ref("");
let daum;

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

// 회원 정보 수정
const submit = async () => {
  try {
    // 유효성 체크
    const nameCheck = validateCheck(nameValidate(name.value), nameMessage);
    const passwordCheck = validateCheck(
      passwordValidate(password.value),
      passwordMessage
    );

    // 모두 일치할 경
    if (nameCheck && passwordCheck) {
      let value = {
        id: props.item.id,
        email: props.item.email,
        name: name.value,
        password: password.value,
        postCode: postCode.value,
        address: address.value,
        detailAddress: detailAddress.value,
      };

      const result = await UpdateUserApi(value);

      const getData = result.data.result;
      const status = result.data.status;

      if (status.status == "success") {
        // 기존 토큰 삭제
        localStorage.removeItem("accessToken");

        // 토큰 저장
        authStore.setToken(getData.accessToken);

        // 변경된 토큰으로 유저 정보 가져오기
        const user = await authStore.getUserInfo(
          JSON.parse(localStorage.getItem("accessToken"))
        );

        alert("수정 성공!");
        emit("ok", user);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <ModalLayout>
    <!-- header  -->
    <ModalHeader>
      {{ title }}
    </ModalHeader>

    <!-- body -->
    <ModalBody>
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
        <div>
          <LabelItem type="email" text="이메일" />
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="이메일"
              v-model="email"
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
        <!-- footer  -->
        <ModalFooter>
          <BlueButton type="submit" :text="props.buttonOk" />
          <BlueButton type="button" text="취소" @click="emit('close')" />
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalLayout>
</template>
