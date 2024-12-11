<script setup>
import { DeleteCartApi, GetCartListApi } from "@/api/cart";
import { priceChange } from "@/utils/PriceConversion";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import BlueButton from "@/components/button/BlueButton.vue";
import { useModal } from "vue-final-modal";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import MainTitle from "@/components/text/MainTitle.vue";
import EditCartCountModal from "@/components/modal/edit/editCartCountModal.vue";

// storage
const authStore = useAuthStore();

// 변수
const router = useRouter();
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const cartList = ref();
const priceArr = ref([]);
const totalPrice = ref(0);

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

    getCartList();
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

// 가격 변경
const changePrice = (data) => {
  data.map((item, key) => {
    priceArr.value.push(item.price * item.count);
  });

  totalPrice.value = priceArr.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  while (priceArr.value.length > 0) {
    priceArr.value.pop();
  }
};

// 장바구니 목록 조회
const getCartList = async () => {
  try {
    const result = await GetCartListApi(getUser.value.id);

    const getData = result.data.result;
    const status = result.data.status;

    if (status.status == "success") {
      cartList.value = getData.getCartList;
      changePrice(cartList.value);
    }
  } catch (e) {
    console.log(e);
  }
};

// 장바구니 삭제
const deleteCart = async (item) => {
  try {
    const result = await DeleteCartApi(item.id);

    const status = result.data.status;

    if (status.status == "success") {
      getCartList();
    }
  } catch (e) {
    console.log(e);
  }
};

// 수량 변경 모달창
const changeCountModal = (item) => {
  const { open, close } = useModal({
    component: EditCartCountModal,
    attrs: {
      title: item.title,
      id: item.id,
      count: item.count,
      onOk() {
        close();
        getCartList();
      },
      onClose() {
        close();
      },
    },
  });
  open();
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <ContainerLayout>
    <!-- 타이틀 -->
    <MainTitle>장바구니 목록</MainTitle>

    <!-- empty -->
    <div
      v-if="cartList && cartList.length == 0"
      class="rounded-lg md:w-2/3 flex justify-center items-center h-52"
    >
      <span class="text-gray-500 font-medium text-2xl">
        장바구니가 비어있습니다...</span
      >
    </div>

    <!-- 장바구니 리스트 -->
    <div class="rounded-lg md:w-2/3">
      <div
        v-for="(item, key) in cartList"
        :key="key"
        class="flex flex-col justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex-col sm:justify-start md:flex-row"
      >
        <img
          :src="item.thumbnail"
          alt="product-image"
          class="w-full rounded-lg md:w-40"
        />
        <div class="md:ml-4 md:flex md:w-full md:justify-between">
          <div class="mt-5 md:mt-0">
            <h2 class="text-lg font-bold text-gray-900">{{ item.title }}</h2>
          </div>

          <div
            class="mt-4 flex flex-col justify-between gap-y-4 md:w-full lg:w-1/3"
          >
            <!-- 수량  -->
            <div class="flex flex-row sm:gap-x-10 items-center justify-between">
              <span class="w-1/2">수량 : {{ item.count }}</span>
              <BlueButton
                type="button"
                text="변경"
                @click="changeCountModal(item)"
                add-class="w-1/4 md:w-1/3"
              />
            </div>

            <!-- 금액 -->
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
        </div>
      </div>
    </div>

    <!-- 총 금액 -->
    <div
      v-if="cartList && cartList.length > 0"
      class="h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 w-2/3 md:w-2/4 lg:w-1/3"
    >
      <div class="flex justify-between">
        <p class="text-lg font-bold">총 금액</p>
        <div class="">
          <p class="mb-1 text-lg font-bold">{{ priceChange(totalPrice) }}원</p>
        </div>
      </div>
      <BlueButton type="button" text="구매하기" add-class="w-full mt-6" />
    </div>
  </ContainerLayout>
</template>
