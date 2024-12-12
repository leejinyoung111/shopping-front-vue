<script setup>
import BlueButton from "@/components/button/BlueButton.vue";
import RedButton from "@/components/button/RedButton.vue";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import DetailModal from "@/components/modal/DetailModal.vue";
import OrderThItem from "@/components/table/order/OrderThItem.vue";
import MainTitle from "@/components/text/MainTitle.vue";
import { titleSlice } from "@/utils/TextSlice";
import { useModal } from "vue-final-modal";

// 변수
const fakeData = [
  {
    orderNum: 123456,
    orderTitle: "테스트정보테스트정보테스트정보테스트정보",
    orderDate: "2024-12-12",
    totalPrice: 25000,
  },
  {
    orderNum: 456789,
    orderTitle: "테스트 정보",
    orderDate: "2024-12-12",
    totalPrice: 15000,
  },
  {
    orderNum: 789123,
    orderTitle: "테스트 정보",
    orderDate: "2024-12-12",
    totalPrice: 30000,
  },
];

// 주문 디테일 모달창
const orderDetailModal = () => {
  const { open, close } = useModal({
    component: DetailModal,
    attrs: {
      title: "주문한 상품 리스트",
      content: "",
      onOk() {
        close();
      },
      onClose() {
        close();
      },
    },
  });
  open();
};

// 주문 취소 모달창
const cancelConfirmModal = () => {
  const { open, close } = useModal({
    component: ConfirmModal,
    attrs: {
      title: "주문 취소 확인",
      content: "정말로 취소하실건가요?",
      buttonOk: "주문 취소",
      onOk() {
        close();
      },
      onClose() {
        close();
      },
    },
  });
  open();
};
</script>
<template>
  <ContainerLayout>
    <!-- 타이틀 -->
    <MainTitle>주문 리스트</MainTitle>

    <div class="rounded-lg w-full lg:w-3/4 max-w-3/4">
      <div class="overflow-auto max-h-[500px]">
        <table
          class="max-h-[500px] text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[700px] lg:w-full"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-300/70 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <OrderThItem>주문번호</OrderThItem>
              <OrderThItem>상품정보</OrderThItem>
              <OrderThItem>주문날짜</OrderThItem>
              <OrderThItem>구매금액</OrderThItem>
              <OrderThItem>action</OrderThItem>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, key) in fakeData"
              :key="key"
              class="bg-white text-xs border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <OrderThItem>{{ item.orderNum }}</OrderThItem>
              <OrderThItem>{{ titleSlice(item.orderTitle, 8) }}</OrderThItem>
              <OrderThItem>{{ item.orderDate }}</OrderThItem>
              <OrderThItem>{{ item.totalPrice }}</OrderThItem>
              <OrderThItem class="flex justify-center items-center gap-5">
                <BlueButton
                  type="button"
                  text="자세히"
                  @click="orderDetailModal()"
                />
                <RedButton
                  type="button"
                  text="취소"
                  @click="cancelConfirmModal()"
                />
              </OrderThItem>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ContainerLayout>
</template>
