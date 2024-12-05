<script setup lang="ts">
import { ref } from "vue";
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalBody from "./ModalBody.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalHeader from "./ModalHeader.vue";
import InputItem from "../form/InputItem.vue";
import { UpdateProductApi } from "@/api/product";

// props
const props = defineProps(["title", "content", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

// 변수
const bookId = ref(props.content.bookId);
const changeBookTitle = ref(props.content.title);
const changeContent = ref(props.content.content);
const changeThumbnail = ref(props.content.thumbnail);
const changePrice = ref(props.content.price);
const changePublisher = ref(props.content.publisher);
const changeAuthors = ref(props.content.authors);
const changeCurrentStatus = ref(props.content.status);

// 도서 추가하기
const submit = async () => {
  try {
    let value = {
      id: props.content.id,
      bookId: bookId.value,
      title: changeBookTitle.value,
      content: changeContent.value,
      thumbnail: changeThumbnail.value,
      price: changePrice.value,
      publisher: changePublisher.value,
      authors: changeAuthors.value,
      status: changeCurrentStatus.value,
    };

    const result = await UpdateProductApi(value);
    const status = result.data.status;

    if (status.status == "success") {
      emit("ok");
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
                  :readonly="true"
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
                  v-model="changeThumbnail"
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
                v-model="changeBookTitle"
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
                v-model="changeContent"
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
                  v-model="changePublisher"
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
                  v-model="changeAuthors"
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
                  v-model="changePrice"
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
                  v-model="changeCurrentStatus"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- footer  -->
        <ModalFooter>
          <BlueButton type="submit" :text="props.buttonOk" />
          <BlueButton type="button" text="취소" @click="emit('close')" />
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalLayout>
</template>
