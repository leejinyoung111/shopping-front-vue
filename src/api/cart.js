import { apiUrl } from "@/constants/envName";
import axios from "axios";

const middleUrl = "/cart";

// 장바구니 목록 조회
export const GetCartListApi = async (id) => {
  try {
    const result = await axios.get(apiUrl + middleUrl + `/${id}`, {
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
    const result = await axios.post(apiUrl + middleUrl + "/insert", value);

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

// 특정 상품 수량 변경
export const UpdateProductCountApi = async (value) => {
  try {
    const result = await axios.patch(
      apiUrl + middleUrl + `/updateCount`,
      value
    );

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
    const result = await axios.delete(apiUrl + middleUrl + `/delete/${id}`, {
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

// 구매하기
export const InsertOrderApi = async (value) => {
  try {
    const result = await axios.post(apiUrl + middleUrl + "/insertOrder", value);

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
