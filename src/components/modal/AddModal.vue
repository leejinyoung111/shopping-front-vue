<script setup lang="ts">
import { ref } from "vue";
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalHeader from "./ModalHeader.vue";
import InputItem from "../form/InputItem.vue";
import ModalBody from "./ModalBody.vue";
import { AddProductApi } from "@/api/product";

// props
const props = defineProps(["title", "content"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

// 변수
const bookId = ref("");
const bookTitle = ref("");
const content = ref("");
const thumbnail = ref("");
const price = ref("");
const publisher = ref("");
const authors = ref("");
const currentStatus = ref("");

// 도서 추가하기
const submit = async () => {
  try {
    let value = {
      bookId: bookId.value,
      title: bookTitle.value,
      content: content.value,
      thumbnail: thumbnail.value,
      price: price.value,
      publisher: publisher.value,
      authors: authors.value,
      status: currentStatus.value,
    };

    const result = await AddProductApi(value);

    const status = result.data.status;

    if (status.status == "success") {
      emit("ok");
    } else {
      alert(status.message);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <ModalLayout>
    <!-- header  -->
    <ModalHeader>
      {{ title }}
    </ModalHeader>

    <!-- body -->
    <ModalBody>
      <form class="space-y-6" @submit.prevent="submit()">
        <!-- 입력 폼 -->
        <div>
          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 고유번호 -->
            <div>
              <label
                for="bookId"
                class="block text-sm/6 font-medium text-gray-900"
                >고유번호</label
              >
              <div class="mt-2">
                <InputItem
                  type="text"
                  placeholder="고유번호"
                  v-model="bookId"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>

            <!-- 썸네일 -->
            <div>
              <label
                for="thumbnail"
                class="block text-sm/6 font-medium text-gray-900"
                >썸네일</label
              >
              <div class="mt-2">
                <InputItem
                  type="text"
                  placeholder="썸네일 주소"
                  v-model="thumbnail"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>
          </div>

          <!-- 제목 -->
          <div class="px-2">
            <label
              for="bookTitle"
              class="block text-sm/6 font-medium text-gray-900"
              >제목</label
            >
            <div class="mt-2">
              <InputItem
                type="text"
                placeholder="제목"
                v-model="bookTitle"
                class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
          </div>

          <!-- 내용 -->
          <div class="px-2">
            <label
              for="content"
              class="block text-sm/6 font-medium text-gray-900"
              >내용</label
            >
            <div class="mt-2">
              <InputItem
                type="text"
                placeholder="내용"
                v-model="content"
                class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
          </div>

          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 출판사 -->
            <div>
              <label
                for="publisher"
                class="block text-sm/6 font-medium text-gray-900"
                >출판사</label
              >
              <div class="mt-2">
                <InputItem
                  type="text"
                  placeholder="출판사"
                  v-model="publisher"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>

            <!-- 작가 -->
            <div>
              <label
                for="authors"
                class="block text-sm/6 font-medium text-gray-900"
                >작가</label
              >
              <div class="mt-2">
                <InputItem
                  type="text"
                  placeholder="작가"
                  v-model="authors"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>
          </div>

          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 가격 -->
            <div>
              <label
                for="price"
                class="block text-sm/6 font-medium text-gray-900"
                >가격</label
              >
              <div class="mt-2">
                <InputItem
                  type="number"
                  placeholder="가격"
                  v-model="price"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>

            <!-- 판매상태 -->
            <div>
              <label
                for="currentStatus"
                class="block text-sm/6 font-medium text-gray-900"
                >판매상태</label
              >
              <div class="mt-2">
                <InputItem
                  type="text"
                  placeholder="판매상태"
                  v-model="currentStatus"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- footer -->
        <ModalFooter>
          <BlueButton type="submit" text="추가" />
          <BlueButton type="button" text="취소" @click="emit('close')" />
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalLayout>
</template>
