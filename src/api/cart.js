import { apiUrl } from "@/constants/envName";
import axios from "axios";

// 장바구니 목록 조회
export const GetCartListApi = async (id) => {
  try {
    const result = await axios.get(apiUrl + `/cart/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
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

// 장바구니 추가
export const AddCartApi = async (value) => {
  try {
    const { userId, title, price, thumbnail, publisher, isbn } = value;
    const result = await axios.post(apiUrl + "/addCart", {
      userId,
      title,
      price,
      thumbnail,
      publisher,
      isbn,
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

// 장바구니 삭제
export const DeleteCartApi = async (id) => {
  try {
    const result = await axios.delete(apiUrl + `/cart/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
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
