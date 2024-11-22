<script setup>
import { kakaoKey } from "@/constants/envName";
import { priceChange } from "@/utils/PriceConversion";
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

onMounted(() => {
  getBookInfo(param);
});
</script>
<template>
  <div class="flex flex-col gap-5 justify-center items-center">
    <div v-if="bookDetailInfo != undefined" class="container p-5 mx-auto">
      <div
        class="lg:w-4/5 h-full flex flex-col lg:flex-row justify-center items-center"
      >
        <img
          class="w-2/3 md:w-1/2 lg:w-2/5 object-cover object-center rounded"
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

            <!-- 장바구니 -->
            <div class="flex justify-start items-center gap-5">
              <button
                class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                장바구니
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
