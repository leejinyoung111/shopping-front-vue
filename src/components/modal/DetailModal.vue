<script setup lang="ts">
import { titleSlice } from "@/utils/TextSlice";
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalBody from "./layout/ModalBody.vue";
import ModalFooter from "./layout/ModalFooter.vue";
import ModalHeader from "./layout/ModalHeader.vue";

// props
const props = defineProps(["title", "content", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

// 변수
const fakeData = [
  {
    title: "테스트1테스트1테스트1테스트1테스트",
    count: 2,
    price: 15000,
  },
  {
    title: "테스트2",
    count: 5,
    price: 50000,
  },
  {
    title: "테스트3",
    count: 1,
    price: 20000,
  },
];
</script>

<template>
  <ModalLayout content-class="md:w-3/5 lg:w-2/4 bg-white space-y-2">
    <!-- header  -->
    <ModalHeader>
      {{ title }}
    </ModalHeader>

    <!-- body -->
    <ModalBody class="">
      <!-- content -->
      <div class="rounded-lg w-3/4 px-4 lg:w-full max-h-[400px] overflow-auto">
        <div
          v-for="(item, key) in fakeData"
          :key="key"
          class="flex flex-col justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex-col md:flex-row"
        >
          <img
            src="https://picsum.photos/200"
            alt="product-image"
            class="w-full rounded-lg md:w-40"
          />
          <div class="md:ml-4 md:flex md:w-full md:justify-between">
            <div class="mt-5 md:mt-0">
              <h2 class="text-lg font-bold text-gray-900">
                {{ titleSlice(item.title, 10) }}
              </h2>
            </div>

            <div
              class="mt-4 flex flex-col justify-between gap-y-4 md:w-full lg:w-1/3"
            >
              <!-- 수량  -->
              <div
                class="flex flex-row sm:gap-x-10 items-center justify-between"
              >
                <span class="w-1/2">수량 : {{ item.count }}</span>
              </div>

              <!-- 금액 -->
              <div class="flex items-center justify-between space-x-4">
                <p class="text-lg">{{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- footer  -->
      <ModalFooter>
        <BlueButton type="button" text="확인" @click="emit('close')" />
      </ModalFooter>
    </ModalBody>
  </ModalLayout>
</template>
