import { apiUrl } from "@/constants/envName";
import axios from "axios";

// 회원가입
export const RegisterApi = async (value) => {
  try {
    const { email, name, password, postCode, address, detailAddress } = value;

    const result = await axios.post(apiUrl + "/register", {
      email,
      name,
      password,
      postCode,
      address,
      detailAddress,
    });
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
    const { email, password } = value;

    const result = await axios.post(apiUrl + "/login", {
      email,
      password,
    });
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
