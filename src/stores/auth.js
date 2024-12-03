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

        const getData = result.data.result;
        const status = result.data.status;

        if (status.status == "success") {
          const user = {
            id: getData.userInfo.user.id,
            email: getData.userInfo.user.email,
            name: getData.userInfo.user.name,
            postCode: getData.userInfo.user.postCode,
            address: getData.userInfo.user.address,
            detailAddress: getData.userInfo.user.detailAddress,
            exp: getData.userInfo.exp,
            iat: getData.userInfo.iat,
          };
          return user;
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
