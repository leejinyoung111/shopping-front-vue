<script setup>
import { kakaoKey } from "@/constants/envName";
import axios from "axios";
import { onMounted, ref } from "vue";

// 변수
const url = window.location.pathname;
const param = url.slice(13, url.length);
const bookDetailInfo = ref();

// 도서 디테일 정보 가져오기
const getBookInfo = async (param) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v3/search/book?target=isbn&query=${param}`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoKey}`,
        },
      }
    );

    if (result.status == 200) {
      bookDetailInfo.value = result.data.documents[0];
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 가격 변환
const priceChange = (num) => {
  return num.toLocaleString("ko-KR");
};

onMounted(() => {
  getBookInfo(param);
});
</script>
<template>
  <div class="bg-gray-200/50 body-font overflow-hidden">
    <div
      v-if="bookDetailInfo != undefined"
      class="container px-5 py-24 mx-auto"
    >
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          :src="`${bookDetailInfo.thumbnail}`"
          :alt="bookDetailInfo.title"
        />

        <!-- 디테일 정보 -->
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1 class="text-gray-900 text-2xl title-font font-medium mb-1">
            {{ bookDetailInfo.title }}
          </h1>
          <h1 class="text-gray-700 text-md title-font font-medium mb-1">
            출판사 : {{ bookDetailInfo.publisher }}
          </h1>
          <h1 class="text-gray-700 text-md title-font font-medium mb-1">
            저자 : {{ bookDetailInfo.authors.join(", ") }}
          </h1>
          <p class="leading-relaxed">
            {{ bookDetailInfo.contents }}
          </p>
          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
          ></div>
          <div class="flex flex-col gap-2">
            <h1 class="text-gray-700 text-md title-font font-medium mb-1">
              판매 상태 : {{ bookDetailInfo.status }}
            </h1>
            <span class="title-font font-medium text-xl text-gray-900"
              >정가 : {{ priceChange(bookDetailInfo.price) }}원</span
            >

            <!-- 구입 및 찜하기 -->
            <div class="flex justify-start items-center gap-5">
              <button
                class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                장바구니
              </button>
              <button
                class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
