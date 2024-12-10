<script setup>
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import MainTitle from "@/components/text/MainTitle.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const router = useRouter();
const route = useRoute();
const userId = parseInt(route.params.id);

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user;

    // 관리자 여부
    if (getUser.value.role == "admin") {
      router.replace("/");
    }

    if (userId != getUser.value.id) {
      router.replace("/");
    }
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <ContainerLayout>
    <!-- 타이틀 -->
    <MainTitle>주문 정보 리스트</MainTitle>

    <!-- 주문 정보 리스트 -->
    <div class="rounded-lg w-3/4 md:w-2/3">
      <div
        class="flex flex-col justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex-col sm:justify-start md:flex-row"
      >
        <div class="border border-red-500">
          <div class="w-full flex justify-end">
            <span>2024-12-10</span>
          </div>
          <div class="w-full flex justify-between">
            <span>주문 번호</span>
            <span>123465465</span>
          </div>
          <div class="w-full flex justify-between">
            <div>금액</div>
            <span>15000원</span>
          </div>
          <div class="w-full flex justify-center items-center">
            <button>영수증 보기</button>
          </div>
        </div>

        <!-- <img
          src="https://picsum.photos/200"
          alt="product-image"
          class="w-full rounded-lg md:w-40"
        />
        <div class="md:ml-4 md:flex md:w-full md:justify-between">
          <div class="mt-5 md:mt-0">
            <h2 class="text-lg font-bold text-gray-900">제목</h2>
          </div>

          <div
            class="mt-4 flex flex-col justify-between gap-y-4 md:w-full lg:w-1/3"
          >
            <div class="flex flex-row sm:gap-x-10 items-center justify-between">
              <span class="w-1/2">수량 : {{ item.count }}</span>
              <BlueButton
                type="button"
                text="변경"
                @click="changeCountModal(item)"
                add-class="w-1/4 md:w-1/3"
              />
            </div>
            <div class="flex items-center justify-between space-x-4">
              <p class="text-lg">
                {{ priceChange(item.price * item.count) }}원
              </p>
              <svg
                @click="deleteCart(item)"
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
        </div> -->
      </div>
    </div>
  </ContainerLayout>
</template>
