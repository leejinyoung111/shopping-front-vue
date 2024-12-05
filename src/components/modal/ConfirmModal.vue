<script setup lang="ts">
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalBody from "./ModalBody.vue";
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

    <!-- body -->
    <ModalBody>
      <!-- content -->
      <div>
        {{ content }}
      </div>

      <!-- footer  -->
      <ModalFooter>
        <BlueButton type="button" text="구매" @click="buyBooks" />
        <BlueButton type="button" text="취소" @click="emit('confirm')" />
      </ModalFooter>
    </ModalBody>
  </ModalLayout>
</template>
