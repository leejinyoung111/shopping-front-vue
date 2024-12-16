import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// 토스트 알림창
export const toastAlert = ({ message, toastType }) => {
  toast(message, {
    theme: "auto",
    autoClose: 1000,
    type: toastType,
  });
};
