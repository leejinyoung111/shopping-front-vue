<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import { GetProductListApi } from "@/api/product";
import BlueButton from "@/components/button/BlueButton.vue";
import AddModal from "@/components/modal/AddModal.vue";
import { useModal } from "vue-final-modal";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const router = useRouter();
const productList = ref();

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user;

    // 관리자 여부
    if (getUser.value.role != "admin") {
      router.replace("/");
    }

    getProductList();
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

// 장바구니 목록 조회
const getProductList = async () => {
  try {
    const result = await GetProductListApi();

    const getData = result.data.result;
    const status = result.data.status;

    if (status.status == "success") {
      productList.value = getData.getProductList;
    }
  } catch (e) {
    console.log(e);
  }
};

// 도서 추가 모달창
const productAddModal = () => {
  const { open, close } = useModal({
    component: AddModal,
    attrs: {
      title: "도서 추가",
      onOk() {
        close();
        getProductList();
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
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        도서 리스트
      </h2>
    </div>

    <!-- 도서 추가 -->
    <BlueButton type="button" text="도서 추가" @click="productAddModal" />

    <!-- 리스트 -->
    <div class="py-2 w-full h-full">
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(item, key) in productList"
          :key="key"
          class="shadow-md rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
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
              저자 : {{ item.authors }}
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
