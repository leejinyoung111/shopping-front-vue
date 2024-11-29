import { apiUrl } from "@/constants/envName";
import axios from "axios";
import { defineStore } from "pinia";

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
        const result = await axios.post(apiUrl + "/getUser", {
          token,
        });
        if (result.status == 200) {
          const userInfo = result.data.userInfo;

          const user = {
            id: userInfo.user.id,
            email: userInfo.user.email,
            name: userInfo.user.name,
            postCode: userInfo.user.postCode,
            address: userInfo.user.address,
            detailAddress: userInfo.user.detailAddress,
            exp: userInfo.exp,
            iat: userInfo.iat,
          };

          return user;
        } else {
          console.log("api 호출 에러 : " + result);
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
});
