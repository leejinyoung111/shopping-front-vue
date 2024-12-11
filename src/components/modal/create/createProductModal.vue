<script setup lang="ts">
import { ref } from "vue";
import BlueButton from "@/components/button/BlueButton.vue";
import WhiteButton from "@/components/button/WhiteButton.vue";
import ModalLayout from "@/components/layout/ModalLayout.vue";
import ModalFooter from "../layout/ModalFooter.vue";
import ModalHeader from "../layout/ModalHeader.vue";
import InputItem from "@/components/form/InputItem.vue";
import LabelItem from "@/components/text/LabelItem.vue";
import ModalBody from "../layout/ModalBody.vue";
import { AddProductApi } from "@/api/product";
import InputLayout from "@/components/layout/InputLayout.vue";

// props
const props = defineProps(["title", "content", "buttonOk"]);

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
      <form class="space-y-6 w-full" @submit.prevent="submit()">
        <!-- 입력 폼 -->
        <div>
          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 고유번호 -->
            <div>
              <LabelItem type="bookId" text="고유번호" />
              <InputLayout>
                <InputItem
                  type="text"
                  placeholder="고유번호"
                  v-model="bookId"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>

            <!-- 썸네일 -->
            <div>
              <LabelItem type="thumbnail" text="썸네일" />
              <InputLayout>
                <InputItem
                  type="text"
                  placeholder="썸네일 주소"
                  v-model="thumbnail"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>
          </div>

          <!-- 제목 -->
          <div class="px-2">
            <LabelItem type="bookTitle" text="제목" />
            <InputLayout>
              <InputItem
                type="text"
                placeholder="제목"
                v-model="bookTitle"
                class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </InputLayout>
          </div>

          <!-- 내용 -->
          <div class="px-2">
            <LabelItem type="content" text="내용" />
            <InputLayout>
              <InputItem
                type="text"
                placeholder="내용"
                v-model="content"
                class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </InputLayout>
          </div>

          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 출판사 -->
            <div>
              <LabelItem type="publisher" text="출판사" />
              <InputLayout>
                <InputItem
                  type="text"
                  placeholder="출판사"
                  v-model="publisher"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>

            <!-- 작가 -->
            <div>
              <LabelItem type="authors" text="작가" />
              <InputLayout>
                <InputItem
                  type="text"
                  placeholder="작가"
                  v-model="authors"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>
          </div>

          <div class="grid px-2 grid-cols-2 gap-x-3">
            <!-- 가격 -->
            <div>
              <LabelItem type="price" text="가격" />
              <InputLayout>
                <InputItem
                  type="number"
                  placeholder="가격"
                  v-model="price"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>

            <!-- 판매상태 -->
            <div>
              <LabelItem type="currentStatus" text="판매상태" />
              <InputLayout>
                <InputItem
                  type="text"
                  placeholder="판매상태"
                  v-model="currentStatus"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>
          </div>
        </div>

        <!-- footer -->
        <ModalFooter>
          <BlueButton type="submit" :text="props.buttonOk" />
          <WhiteButton type="button" text="취소" @click="emit('close')" />
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalLayout>
</template>
