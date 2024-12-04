<script setup lang="ts">
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalContent from "./ModalContent.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalHeader from "./ModalHeader.vue";

// props
const props = defineProps(["title", "content"]);

// emit
const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const buyBooks = () => {
  console.log("구입하기");
};
</script>

<template>
  <ModalLayout>
    <!-- header  -->
    <ModalHeader>
      {{ title }}
    </ModalHeader>

    <!-- content  -->
    <ModalContent>
      {{ content }}
    </ModalContent>

    <!-- footer  -->
    <ModalFooter>
      <BlueButton value="button" text="구매" @click="buyBooks" />
      <BlueButton value="button" text="취소" @click="emit('confirm')" />
    </ModalFooter>
  </ModalLayout>
</template>
