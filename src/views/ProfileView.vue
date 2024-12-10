<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import { useModal } from "vue-final-modal";
import editProfileModal from "@/components/modal/edit/editProfileModal.vue";
import BlueButton from "@/components/button/BlueButton.vue";

// storage
const authStore = useAuthStore();

// 변수
const getToken = ref(JSON.parse(localStorage.getItem("accessToken")));
const getUser = ref();
const router = useRouter();

// 유저 정보 가져오기
const getUserInfo = async () => {
  if (getToken.value != null) {
    // 로그인 한 경우

    // 토큰으로 유저 정보 가져오기
    const user = await authStore.getUserInfo(getToken.value);

    getUser.value = user;

    // 관리자 여부
    if (getUser.value.role == "admin") {
      router.replace("/");
    }
  } else {
    // 로그인 하지 않은 경우
    router.replace("/");
  }
};

// 회원 정보 수정 모달창
const changeProfileModal = () => {
  const { open, close } = useModal({
    component: editProfileModal,
    attrs: {
      title: "회원 정보 수정",
      item: getUser.value,
      buttonOk: "수정",
      async onOk(user) {
        getUser.value = user;
        close();
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
  <ContainerLayout v-if="getUser != null">
    <!-- 유저 정보 -->
    <div class="pt-5">
      <img
        class="w-32 h-32 rounded-full mx-auto"
        src="https://picsum.photos/200"
        alt="Profile picture"
      />
      <h2 class="text-center text-2xl font-semibold mt-3">
        {{ getUser.email }}
      </h2>
      <h2 class="text-center text-xl font-semibold mt-3">
        {{ getUser.name }}
      </h2>
    </div>

    <BlueButton
      type="button"
      text="회원 정보 수정"
      @click="changeProfileModal()"
    />
  </ContainerLayout>
</template>
