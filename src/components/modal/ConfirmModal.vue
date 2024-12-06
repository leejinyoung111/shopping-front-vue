<script setup lang="ts">
import BlueButton from "../button/BlueButton.vue";
import ModalLayout from "../layout/ModalLayout.vue";
import ModalBody from "./ModalBody.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalHeader from "./ModalHeader.vue";

// props
const props = defineProps(["title", "content", "buttonOk"]);

// emit
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "close"): void;
}>();
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
        <BlueButton type="button" :text="props.buttonOk" @click="emit('ok')" />
        <BlueButton type="button" text="취소" @click="emit('close')" />
      </ModalFooter>
    </ModalBody>
  </ModalLayout>
</template>
