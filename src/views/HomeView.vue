<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { kakaoKey } from "@/constants/envName";

// 변수
const searchBookName = ref("");
const bookList = ref([]);
const router = useRouter();

// 도서 데이터 가져오기
const getBookList = async (search) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${search}`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoKey}`,
        },
      }
    );

    if (result.status == 200) {
      bookList.value = result.data.documents;
      searchBookName.value = "";
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 도서 검색
const submit = () => {
  if (searchBookName.value !== "") {
    const textEncode = encodeURI(searchBookName.value);
    getBookList(textEncode);
  } else {
    console.log("도서명을 입력하세요.");
  }
};

// 디테일 페이지 이동
const goToDetail = (isbn) => {
  const paramId = isbn.split(" ");
  router.push(`/book/detail/${paramId[0]}`);
};
</script>

<template>
  <div
    class="bg-gray-200/50 overflow-y-hidden max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <!-- 검색 바 -->
    <div class="flex gap-5 justify-center items-center w-full">
      <form class="max-w-md mx-auto w-full" @submit.prevent="submit()">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >검색</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="도서명"
            v-model="searchBookName"
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            검색
          </button>
        </div>
      </form>
    </div>

    <!-- 카드 리스트 -->
    <div class="flex gap-5 justify-center items-center w-full">
      <div
        class="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12"
      >
        <div class="mx-auto max-w-screen-xl px-4 w-full">
          <div class="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div
              v-for="(item, key) in bookList"
              :key="key"
              class="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm"
            >
              <!-- <a
                href=""
                class="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </a> -->
              <button
                class="z-20 absolute h-full w-full top-0 left-0"
                @click="goToDetail(item.isbn)"
              >
                &nbsp;
              </button>
              <div class="h-auto overflow-hidden">
                <div class="h-44 relative">
                  <img
                    class="w-full"
                    :src="`${item.thumbnail}`"
                    :alt="item.title"
                  />
                </div>
              </div>
              <div
                class="bg-white py-4 px-3 flex flex-col justify-center items-center"
              >
                <h3 class="text-sm mb-2 font-medium text-center">
                  {{ item.title }}
                </h3>
                <h3 class="text-xs mb-2 font-medium text-center">
                  저자 : {{ item.authors.join(", ") }}
                </h3>
                <div class="flex justify-between items-center">
                  <p class="text-sm text-gray-600">{{ item.price }}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
