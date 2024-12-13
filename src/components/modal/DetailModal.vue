<script setup lang="ts">
import { titleSlice } from "@/utils/TextSlice";
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalBody from "./layout/ModalBody.vue";
import ModalFooter from "./layout/ModalFooter.vue";
import ModalHeader from "./layout/ModalHeader.vue";
import { onMounted, ref } from "vue";
import { GetOrderItemListApi } from "@/api/orderItem";
import { priceChange } from "@/utils/PriceConversion";

// props
const props = defineProps(["title", "id"]);

// emit
const emit = defineEmits<{
  (e: "close"): void;
}>();

// 변수
const orderItemList = ref();

// 주문 별 상품 리스트 조회
const getOrderItemList = async (orderNumber) => {
  try {
    const result = await GetOrderItemListApi(orderNumber);

    const getData = result.data.result;
    const status = result.data.status;

    if (status.status == "success") {
      orderItemList.value = getData.getOrderItemList;
    }
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  getOrderItemList(props.id);
});
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
          v-for="(item, key) in orderItemList"
          :key="key"
          class="flex flex-col justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex-col md:flex-row"
        >
          <img
            :src="`${item.thumbnail}`"
            alt="product-image"
            class="w-full rounded-lg md:w-40"
          />
          <div class="md:ml-4 md:flex md:w-full md:justify-between">
            <div class="mt-5 md:mt-0">
              <h2 class="text-lg font-bold text-gray-900">
                {{ titleSlice(item.title, 12) }}
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
                <p class="text-lg">{{ priceChange(item.price) }}원</p>
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
