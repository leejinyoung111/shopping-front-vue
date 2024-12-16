<script setup>
import { CancelOrderApi, DeleteOrderApi, GetOrderListApi } from "@/api/order";
import { GetOrderItemListApi } from "@/api/orderItem";
import BlueButton from "@/components/button/BlueButton.vue";
import RedButton from "@/components/button/RedButton.vue";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import DetailModal from "@/components/modal/DetailModal.vue";
import OrderThItem from "@/components/table/order/OrderThItem.vue";
import MainTitle from "@/components/text/MainTitle.vue";
import EmptyItem from "@/components/ui/EmptyItem.vue";
import { useAuthStore } from "@/stores/auth";
import { priceChange } from "@/utils/PriceConversion";
import { toastAlert } from "@/utils/ToastAlert";
import { onMounted, ref } from "vue";
import { useModal } from "vue-final-modal";
import { useRouter } from "vue-router";

// storage
const authStore = useAuthStore();

// 변수
const router = useRouter();
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const orderList = ref();

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);
    getUser.value = user.userInfo.user;

    // 관리자 여부
    if (getUser.value.role == "admin") {
      router.replace("/");
    }

    getOrderList();
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

// 주문서 목록 조회
const getOrderList = async () => {
  try {
    const result = await GetOrderListApi(getUser.value.id);

    const getData = result.data.result;
    const status = result.data.status;

    if (status.status == "success") {
      orderList.value = getData.getOrderList;
    }
  } catch (e) {
    console.log(e);
  }
};

// 주문상태 별 이름 변환
const statusName = (status) => {
  if (status == "completed") {
    return "주문완료";
  } else {
    return "주문취소";
  }
};

// 주문상태 별 클래스 변경
const statusClass = (status) => {
  if (status == "completed") {
    return "text-gray-700";
  } else {
    return "text-red-500";
  }
};

// 주문 디테일 모달창
const orderDetailModal = (orderNumber) => {
  const { open, close } = useModal({
    component: DetailModal,
    attrs: {
      title: "주문한 상품 리스트",
      id: orderNumber,
      onClose() {
        close();
      },
    },
  });
  open();
};

// 주문 취소 모달창
const cancelConfirmModal = (item) => {
  const { open, close } = useModal({
    component: ConfirmModal,
    attrs: {
      title: "주문 취소 확인",
      content: "정말로 취소하실건가요?",
      buttonOk: "주문 취소",
      onOk() {
        cancelOrder(item);
        close();
      },
      onClose() {
        close();
      },
    },
  });
  open();
};

// 주문 취소
const cancelOrder = async (item) => {
  try {
    const result = await CancelOrderApi(item);

    const status = result.data.status;
    if (status.status == "success") {
      toastAlert({ message: status.message, toastType: status.status });
      getOrderList();
    }
  } catch (e) {
    console.log(e);
  }
};

// 주문 기록 삭제 모달창
const deleteConfirmModal = (id) => {
  const { open, close } = useModal({
    component: ConfirmModal,
    attrs: {
      title: "기록 삭제 확인",
      content: "정말로 삭제하실건가요?",
      buttonOk: "기록 삭제",
      onOk() {
        deleteOrder(id);
        close();
      },
      onClose() {
        close();
      },
    },
  });
  open();
};

// 주문 기록 삭제
const deleteOrder = async (id) => {
  try {
    const result = await DeleteOrderApi(id);

    const status = result.data.status;
    if (status.status == "success") {
      toastAlert({ message: status.message, toastType: status.status });
      getOrderList();
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <ContainerLayout>
    <!-- 타이틀 -->
    <MainTitle>주문 리스트</MainTitle>

    <!-- empty -->
    <EmptyItem
      v-if="orderList && orderList.length == 0"
      :title="'No List'"
      :content="'현재 주문 리스트가 없습니다.'"
    />

    <!-- 주문 리스트 -->
    <div v-else class="rounded-lg w-full lg:w-3/4 max-w-3/4">
      <div class="overflow-auto max-h-[500px] rounded-md">
        <table
          class="max-h-[500px] text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[800px] lg:w-full"
        >
          <thead
            class="text-xs uppercase bg-gray-300/70 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <OrderThItem>주문번호</OrderThItem>
              <OrderThItem>주문날짜</OrderThItem>
              <OrderThItem>구매금액</OrderThItem>
              <OrderThItem>주문상태</OrderThItem>
              <OrderThItem>action</OrderThItem>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, key) in orderList"
              :key="key"
              class="bg-white text-xs border-b dark:bg-gray-800 dark:border-gray-700"
              :class="
                item.status == 'completed' ? 'text-gray-700' : 'text-red-500'
              "
            >
              <OrderThItem :class="statusClass(item.status)">{{
                item.orderNumber
              }}</OrderThItem>
              <OrderThItem :class="statusClass(item.status)">{{
                item.orderDate
              }}</OrderThItem>
              <OrderThItem :class="statusClass(item.status)"
                >{{ priceChange(item.totalPrice) }}원</OrderThItem
              >
              <OrderThItem :class="statusClass(item.status)">{{
                statusName(item.status)
              }}</OrderThItem>
              <OrderThItem class="flex justify-center items-center gap-5">
                <BlueButton
                  type="button"
                  text="자세히"
                  @click="orderDetailModal(item.orderNumber)"
                />
                <RedButton
                  v-if="item.status == 'completed'"
                  type="button"
                  text="취소"
                  @click="cancelConfirmModal(item)"
                />
                <RedButton
                  v-if="item.status == 'canceled'"
                  type="button"
                  text="삭제"
                  @click="deleteConfirmModal(item.id)"
                />
              </OrderThItem>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ContainerLayout>
</template>
