<script setup lang="ts">
import { UpdateProductCountApi } from "@/api/cart";
import { ref } from "vue";
import BlueButton from "@/components/button/BlueButton.vue";
import WhiteButton from "@/components/button/WhiteButton.vue";
import ModalLayout from "@/components/layout/ModalLayout.vue";
import ModalHeader from "../layout/ModalHeader.vue";
import ModalFooter from "../layout/ModalFooter.vue";
import ModalBody from "../layout/ModalBody.vue";

// props
const props = defineProps(["title", "id", "count"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

// 변수
const bookCount = ref(props.count);

// 수량 변경
const changeCount = (status) => {
  if (status == "minus") {
    if (bookCount.value > 1) {
      bookCount.value -= 1;
    }
  } else if (status == "plus") {
    if (bookCount.value < 5) {
      bookCount.value += 1;
    }
  }
};

// 상품 수량 변경
const updateProductCount = async () => {
  try {
    let value = {
      id: props.id,
      count: bookCount.value,
    };
    const result = await UpdateProductCountApi(value);

    const status = result.data.status;

    if (status.status == "success") {
      alert("수정 성공!");
      emit("ok");
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
      <!-- content -->
      <div class="relative flex items-center w-1/3 lg:w-1/4">
        <button
          type="button"
          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-8 flex justify-center items-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          :class="bookCount == 1 && 'cursor-not-allowed hover:bg-gray-100'"
          @click="changeCount('minus')"
        >
          <svg
            class="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          v-model="bookCount"
          class="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          readonly
          required
        />
        <button
          type="button"
          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-8 flex justify-center items-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          :class="bookCount == 5 && 'cursor-not-allowed hover:bg-gray-100'"
          @click="changeCount('plus')"
        >
          <svg
            class="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>

      <!-- footer  -->
      <ModalFooter>
        <BlueButton type="button" text="변경" @click="updateProductCount()" />
        <WhiteButton type="button" text="취소" @click="emit('close')" />
      </ModalFooter>
    </ModalBody>
  </ModalLayout>
</template>
