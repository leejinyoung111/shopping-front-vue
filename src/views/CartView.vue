<script setup>
import { DeleteCartApi, GetCartListApi } from "@/api/cart";
import { priceChange } from "@/utils/PriceConversion";
import { onMounted, ref } from "vue";

// 변수
const cartList = ref();
const totalPrice = ref(0);

// 장바구니 목록 조회
const getCartList = async () => {
  try {
    const result = await GetCartListApi(22);

    if (result.status == 200) {
      let data = result.data.getCartList;
      cartList.value = data;
      data.filter((item, key) => {
        totalPrice.value += item.price;
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// 장바구니 삭제
const deleteCart = async (id) => {
  try {
    const result = await DeleteCartApi(id);

    if (result.status == 200) {
      getCartList();
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getCartList();
});
</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center">
    <!-- 타이틀 -->
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        장바구니 목록
      </h2>
    </div>
    <div class="rounded-lg md:w-2/3">
      <div
        v-for="(item, key) in cartList"
        :key="key"
        class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
      >
        <img
          :src="item.thumbnail"
          alt="product-image"
          class="w-full rounded-lg sm:w-40"
        />
        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div class="mt-5 sm:mt-0">
            <h2 class="text-lg font-bold text-gray-900">{{ item.title }}</h2>
          </div>
          <div
            class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
          >
            <div class="flex items-center border-gray-100">수량 : 1</div>
            <div class="flex items-center space-x-4">
              <p class="text-sm">{{ priceChange(item.price) }}</p>
              <svg
                @click="deleteCart(item.id)"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 총 금액 -->
    <div
      class="h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
    >
      <div class="flex justify-between">
        <p class="text-lg font-bold">총 금액</p>
        <div class="">
          <p class="mb-1 text-lg font-bold">{{ priceChange(totalPrice) }}원</p>
        </div>
      </div>
      <button
        class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        구매하기
      </button>
    </div>
  </div>
</template>
