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

onMounted(() => {
  getBookInfo(param);
});
</script>
<template>
  <div>
    <h1>디테일 페이지</h1>
    <div v-if="bookDetailInfo != undefined">
      <div>제목 : {{ bookDetailInfo.title }}</div>
      <div>내용 : {{ bookDetailInfo.contents }}</div>
      <div>출판사 : {{ bookDetailInfo.publisher }}</div>
      <div>저자 : {{ bookDetailInfo.authors.join(", ") }}</div>
      <div>가격 : {{ bookDetailInfo.price }} 원</div>
      <div>할인 가격 : {{ bookDetailInfo.sale_price }} 원</div>
      <div>판매상태 : {{ bookDetailInfo.status }}</div>
      <img
        width="70px"
        height="70px"
        :src="`${bookDetailInfo.thumbnail}`"
        :alt="bookDetailInfo.title"
      />
    </div>
  </div>
</template>
