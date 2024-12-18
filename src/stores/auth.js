import { apiUrl } from "@/constants/envName";
import axios from "axios";
import { defineStore } from "pinia";

const middleUrl = "/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: {},
    token: {},
  }),
  actions: {
    // 토큰 저장
    async setToken(accessToken) {
      this.accessToken = accessToken;
      localStorage.setItem("accessToken", JSON.stringify(this.accessToken));
    },

    // 유저 정보 가져오기
    async getUserInfo(token) {
      try {
        this.token = token;
        const result = await axios.post(apiUrl + middleUrl + "/getUser", {
          token,
        });

        const getData = result.data.result;
        const status = result.data.status;

        // 필요없는 정보 삭제
        delete getData.userInfo.user.password;
        delete getData.userInfo.user.address.id;
        delete getData.userInfo.user.address.userId;

        if (status.status == "success") {
          return getData;
        } else {
          console.log("api 호출 에러" + status.message);
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
});
