<script setup lang="ts">
import { ref } from "vue";
import BlueButton from "@/components/button/BlueButton.vue";
import WhiteButton from "@/components/button/WhiteButton.vue";
import ModalLayout from "@/components/layout/ModalLayout.vue";
import ModalBody from "../layout/ModalBody.vue";
import ModalFooter from "../layout/ModalFooter.vue";
import ModalHeader from "../layout/ModalHeader.vue";
import InputItem from "@/components/form/InputItem.vue";
import { UpdateProductApi } from "@/api/product";
import LabelItem from "@/components/text/LabelItem.vue";
import InputLayout from "@/components/layout/InputLayout.vue";
import { toastAlert } from "@/utils/ToastAlert";

// props
const props = defineProps(["title", "content", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();

// 변수
const bookId = ref(props.content.book_id);
const changeBookTitle = ref(props.content.title);
const changeContent = ref(props.content.content);
const changeThumbnail = ref(props.content.thumb_nail);
const changePrice = ref(props.content.price);
const changePublisher = ref(props.content.publisher);
const changeAuthors = ref(props.content.authors);
const changeCurrentStatus = ref(props.content.status);

// 도서 추가하기
const submit = async () => {
  try {
    const value = {
      id: props.content.id,
      book_id: bookId.value,
      title: changeBookTitle.value,
      content: changeContent.value,
      thumb_nail: changeThumbnail.value,
      price: changePrice.value,
      publisher: changePublisher.value,
      authors: changeAuthors.value,
      status: changeCurrentStatus.value,
    };

    const result = await UpdateProductApi(value);
    const status = result.data.status;

    if (status.status == "success") {
      toastAlert({ message: status.message, toastType: status.status });
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
                  :readonly="true"
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
                  v-model="changeThumbnail"
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
                v-model="changeBookTitle"
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
                v-model="changeContent"
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
                  v-model="changePublisher"
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
                  v-model="changeAuthors"
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
                  v-model="changePrice"
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
                  v-model="changeCurrentStatus"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                />
              </InputLayout>
            </div>
          </div>
        </div>

        <!-- footer  -->
        <ModalFooter>
          <BlueButton type="submit" :text="props.buttonOk" />
          <WhiteButton type="button" text="취소" @click="emit('close')" />
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalLayout>
</template>
