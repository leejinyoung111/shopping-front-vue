<script setup>
import { priceChange } from "@/utils/PriceConversion";

// 장바구니 리스트
const cartList = [
  {
    title: "서울 부동산 절대원칙",
    count: 1,
    price: 25000,
  },
  {
    title: "2023 해커스 공기업",
    count: 1,
    price: 23900,
  },
  {
    title: "나의 문화 유산답사기",
    count: 1,
    price: 22000,
  },
];
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
          src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            <div class="flex items-center border-gray-100">
              수량 : {{ item.count }}
            </div>
            <div class="flex items-center space-x-4">
              <p class="text-sm">{{ priceChange(item.price) }}</p>
              <svg
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
          <p class="mb-1 text-lg font-bold">{{ priceChange(50000) }}원</p>
          <p class="text-sm text-gray-700">부가세 포함</p>
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
