import { apiUrl } from "@/constants/envName";
import axios from "axios";

const middleUrl = "/auth";

// 회원가입
export const RegisterApi = async (value) => {
  try {
    const result = await axios.post(apiUrl + middleUrl + "/register", value);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 로그인
export const LoginApi = async (value) => {
  try {
    const result = await axios.post(apiUrl + middleUrl + "/login", value);
    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 유저정보 수정
export const UpdateUserApi = async (value) => {
  try {
    const result = await axios.patch(apiUrl + middleUrl + "/updateUser", value);

    if (result.status == 200) {
      return result;
    } else {
      console.log("api 호출 에러 : " + result);
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 로그아웃
export const LogoutApi = async () => {
  try {
    localStorage.removeItem("accessToken");
  } catch (e) {
    console.log(e);
    return e;
  }
};
