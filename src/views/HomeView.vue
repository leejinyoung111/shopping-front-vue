<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import { GetBookListApi } from "@/api/kakao";
import MainTitle from "@/components/text/MainTitle.vue";
import EmptyItem from "@/components/ui/EmptyItem.vue";
import IconBase from "@/components/icon/IconBase.vue";

// 변수
const searchBookName = ref("");
const bookList = ref([]);
const router = useRouter();
const sessionSearch = ref(sessionStorage.getItem("search"));
const isSearch = ref(false);
const isFocused = ref(false);

const searchedList = [
  {
    id: 1,
    title: "서울",
    date: "2024-12-10",
  },
  {
    id: 2,
    title: "인터넷",
    date: "2024-12-15",
  },
  {
    id: 3,
    title: "정보",
    date: "2024-12-13",
  },
  {
    id: 4,
    title: "서울",
    date: "2024-12-10",
  },
  {
    id: 5,
    title: "인터넷",
    date: "2024-12-15",
  },
];

// 도서 데이터 가져오기
const getBookList = async (search) => {
  try {
    const result = await GetBookListApi(search);

    if (result.status == 200) {
      isSearch.value = true;
      bookList.value = result.data.documents;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
  }
};

// 검색창 포커스
const onFocus = () => {
  isFocused.value = true;
};

// 도서 검색 공통 기능
const searchCommon = (title) => {
  const textEncode = encodeURI(title);
  sessionStorage.setItem("search", decodeURI(textEncode));
  isSearch.value = false;
  getBookList(textEncode);

  // 쿼리스트링 설정
  router.replace({
    path: "/",
    query: { search: textEncode },
  });
};

// input으로 도서 검색
const submit = () => {
  searchCommon(searchBookName.value);
  isFocused.value = false;
};

// 최근 검색 리스트에서 도서 검색
const recentSearchClick = (title) => {
  searchCommon(title);
  isFocused.value = false;
};

// 최근 검색 삭제
const deleteRecentSearch = (id) => {
  console.log(id);
};

// 디테일 페이지 이동
const goToDetail = (isbn) => {
  const paramId = isbn.split(" ");

  if (paramId[0] == "") {
    router.push(`/book/detail/${paramId[1]}`);
  } else {
    router.push(`/book/detail/${paramId[0]}`);
  }
};

onMounted(() => {
  if (sessionSearch.value != null) {
    searchBookName.value = sessionSearch.value;
    getBookList(encodeURI(sessionSearch.value));
  }
});
</script>

<template>
  <ContainerLayout>
    <!-- 타이틀 -->
    <MainTitle>도서 검색</MainTitle>

    <!-- 검색 바 -->
    <form
      class="relative bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200 mb-[-10px]"
      @submit.prevent="submit()"
    >
      <button class="outline-none focus:outline-none">
        <svg
          class="w-5 text-gray-600 h-5 cursor-pointer"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
      <input
        type="text"
        placeholder="도서명"
        v-model="searchBookName"
        @focus="onFocus"
        required
        class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
      />

      <!-- 최근 검색 리스트 -->
      <div
        v-if="isFocused"
        class="border border-gray-200 bg-white absolute left-0 top-10 w-full max-h-56 overflow-y-auto"
      >
        <div
          v-for="(item, key) in searchedList"
          :key="key"
          class="border border-gray-300 rounded-md flex justify-between items-center gap-5 text-sm p-2 m-2 z-50 hover:bg-gray-200"
        >
          <button
            type="button"
            class="hover:text-red-500 flex justify-start items-center"
            @click="recentSearchClick(item.title)"
          >
            {{ item.title }}
          </button>
          <button type="button" @click="deleteRecentSearch(item.id)">
            <IconBase title="close" :class-change="'w-7 h-7'" />
          </button>
        </div>
      </div>
    </form>

    <!-- empty -->
    <EmptyItem
      v-if="isSearch && bookList.length == 0"
      :title="'No Books'"
      :content="'검색 결과가 없습니다.'"
    />

    <!-- 리스트 -->
    <div class="py-2 w-full h-full">
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(item, key) in bookList"
          :key="key"
          class="shadow-md rounded-xl hover:shadow-lg cursor-pointer"
          @click="goToDetail(item.isbn)"
        >
          <img
            class="w-full h-64 rounded-t-lg"
            :src="`${item.thumbnail}`"
            :alt="item.title"
          />
          <div>
            <h3 class="text-sm mb-2 font-medium text-center">
              {{ item.title }}
            </h3>
            <h3 class="text-xs mb-2 font-medium text-center">
              저자 : {{ item.authors.join(", ") }}
            </h3>
            <div class="flex justify-center items-center">
              <p class="text-sm text-gray-600">{{ item.price }}원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainerLayout>
</template>
