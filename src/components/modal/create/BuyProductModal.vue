<script setup lang="ts">
import ModalLayout from "@/components/layout/ModalLayout.vue";
import ModalHeader from "../layout/ModalHeader.vue";
import ModalBody from "../layout/ModalBody.vue";
import LabelItem from "@/components/text/LabelItem.vue";
import InputItem from "@/components/form/InputItem.vue";
import BlueButton from "@/components/button/BlueButton.vue";
import ModalFooter from "../layout/ModalFooter.vue";

// props
const props = defineProps(["title", "user", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

const submit = () => {
  console.log("주문");
};
</script>
<template>
  <ModalLayout>
    <!-- header  -->
    <ModalHeader class="text-3xl lg:text-3xl">
      {{ title }}
    </ModalHeader>

    <!-- body -->
    <ModalBody class="px-2">
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 이메일 -->
        <div>
          <LabelItem type="email" text="이메일" />
          <div class="mt-2">
            <InputItem
              type="text"
              placeholder="이메일"
              v-model="props.user.email"
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
              v-model="props.user.name"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              readonly="true"
            />
          </div>
        </div>

        <!-- 우편번호 -->
        <div>
          <LabelItem type="postCode" text="우편번호" />
          <div class="grid grid-cols-2 gap-2 items-center justify-center">
            <InputItem
              type="text"
              placeholder="우편번호"
              v-model="props.user.postCode"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              readonly="true"
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
              v-model="props.user.address"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              readonly="true"
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
              v-model="props.user.detailAddress"
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              readonly="true"
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
