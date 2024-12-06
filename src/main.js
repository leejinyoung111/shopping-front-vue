import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/index.css";
import router from "./router";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";

createApp(App).use(router).use(createPinia()).use(createVfm()).mount("#app");
