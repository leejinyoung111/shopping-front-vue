<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import InputItem from "@/components/form/InputItem.vue";
import { ref } from "vue";

// 변수
const postcode = ref("");
const address = ref("");
const detailAddress = ref("");

// 주소 검색
const searchAddress = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      address.value = data.address;
      postcode.value = data.zonecode;
    },
  }).open();
};

// 주소 저장
const saveAddress = () => {
  let value = {
    postcode: postcode.value,
    address: address.value,
    detailAddress: detailAddress.value,
  };

  console.log(value);
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto bg-gray-200/50 rounded-lg shadow-md p-5">
    <img
      class="w-32 h-32 rounded-full mx-auto"
      src="https://picsum.photos/200"
      alt="Profile picture"
    />
    <h2 class="text-center text-2xl font-semibold mt-3">test@test.com</h2>
    <p class="text-center text-gray-600 mt-1">테스트</p>

    <div class="mt-5">
      <form
        @submit.prevent="saveAddress()"
        class="mt-5 bg-white rounded-lg shadow w-4/5 md:w-3/5 lg:w-2/4 m-auto"
      >
        <div class="flex">
          <div class="flex-1 py-5 pl-5 overflow-hidden">
            <svg
              class="inline align-text-top"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g>
                <path
                  d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                  fill="none"
                  id="svg_1"
                  stroke="null"
                ></path>
                <path
                  d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                  id="svg_2"
                ></path>
                <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
              </g>
            </svg>
            <h1 class="inline text-2xl font-semibold leading-none">주소</h1>
          </div>
        </div>
        <div class="px-5 pb-5 grid grid-cols-2 gap-2">
          <InputItem
            type="text"
            placeholder="우편번호"
            v-model="postcode"
            readonly="true"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
          <input
            type="button"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            value="주소 검색"
            @click="searchAddress"
          />
        </div>
        <div class="px-5 pb-5">
          <InputItem
            type="text"
            placeholder="주소"
            v-model="address"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
          <InputItem
            type="text"
            placeholder="상세 주소"
            v-model="detailAddress"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>
        <div class="px-5 pb-5">
          <BlueButton value="submit" text="주소 변경" />
        </div>
      </form>
    </div>
  </div>
</template>
