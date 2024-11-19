<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarItem from "@/components/ui/NavbarItem.vue";
import InputItem from "@/components/form/InputItem.vue";
import BlueButton from "@/components/button/BlueButton.vue";
import { kakaoKey } from "@/constants/envName";

// 변수
const searchBookName = ref("");
const bookList = ref([]);
const router = useRouter();

// 도서 데이터 가져오기
const getBookList = async (search) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v3/search/book?sort=accuracy&query=${search}&page=1&size=10`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoKey}`,
        },
      }
    );

    if (result.status == 200) {
      bookList.value = result.data.documents;
      console.log(result.data.documents);
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
const goToDetail = (id) => {
  const params = id.replace(" ", "-");
  router.push({ path: `/detail/${params}` });
};
</script>

<template>
  <NavbarItem />
  <div>
    <h1 class="font-bold text-2xl">홈페이지</h1>
    <div>
      <h2>상품 검색</h2>
      <form @submit.prevent="submit()">
        <InputItem type="text" placeholder="도서명" v-model="searchBookName" />
        <BlueButton value="submit" text="검색" />
      </form>
    </div>
    <div class="flex flex-col gap-5">
      <h2>검색한 상품 리스트</h2>
      <div v-if="bookList != undefined">
        <div
          class="border border-gray-500 w-96 h-96 my-5 py-5"
          v-for="(item, key) in bookList"
          :key="key"
        >
          <button class="text-red-500" @click="goToDetail(item.isbn)">
            디테일 페이지 이동
          </button>
          <div>제목 : {{ item.title }}</div>
          <div>내용 : {{ item.contents }}</div>
          <div>작가 : {{ item.authors }}</div>
          <div>가격 : {{ item.price }}</div>
          <div>판매상태 : {{ item.status }}</div>
          <img
            width="70px"
            height="70px"
            :src="`${item.thumbnail}`"
            :alt="item.title"
          />
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>
