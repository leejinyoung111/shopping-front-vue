<script setup>
defineProps(["title", "classChange"]);
import LogoIcon from "./LogoIcon.vue";
import LoginIcon from "./LoginIcon.vue";
import LogoutIcon from "./LogoutIcon.vue";
import CartIcon from "./CartIcon.vue";
import ProfileIcon from "./ProfileIcon.vue";
import ProductIcon from "./ProductIcon.vue";
import BookIcon from "./BookIcon.vue";
</script>
<template>
  <LogoIcon v-if="title == 'logo'" :class="classChange" />
  <LoginIcon v-if="title == 'login'" :class="classChange" />
  <LogoutIcon v-if="title == 'logout'" :class="classChange" />
  <CartIcon v-if="title == 'cart'" :class="classChange" />
  <ProfileIcon v-if="title == 'profile'" :class="classChange" />
  <ProductIcon v-if="title == 'product'" :class="classChange" />
  <BookIcon v-if="title == 'book'" :class="classChange" />
</template>
