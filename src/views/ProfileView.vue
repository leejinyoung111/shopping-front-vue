<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import ContainerLayout from "@/components/layout/ContainerLayout.vue";
import { useModal } from "vue-final-modal";
import BlueButton from "@/components/button/BlueButton.vue";
import EditProfileModal from "@/components/modal/edit/editProfileModal.vue";

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
    component: EditProfileModal,
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
    <div
      class="relative flex w-96 flex-col rounded-xl bg-clip-border text-gray-700"
    >
      <div
        class="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl text-gray-700"
      >
        <img
          src="https://picsum.photos/200"
          alt="profile-picture"
          class="w-full"
        />
      </div>
      <div class="p-6 text-center">
        <h4
          class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
        >
          {{ getUser.email }}
        </h4>
        <p
          class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased"
        >
          {{ getUser.name }}
        </p>
      </div>
      <div class="flex justify-center items-center mb-5">
        <BlueButton
          type="button"
          text="회원 정보 수정"
          @click="changeProfileModal()"
        />
      </div>
    </div>
  </ContainerLayout>
</template>
