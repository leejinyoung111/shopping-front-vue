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
    const { userId, bookId, title, price, thumbnail, publisher, count } = value;
    const result = await axios.post(apiUrl + "/addCart", {
      userId,
      bookId,
      title,
      price,
      thumbnail,
      publisher,
      count,
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

// 특정 상품 수량 변경
export const UpdateProductCountApi = async (value) => {
  try {
    const { id, count } = value;
    const result = await axios.patch(apiUrl + `/updateProductCount`, {
      id,
      count,
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

// 구매하기
export const InsertOrderApi = async (value) => {
  try {
    const { userId, orderDate, orderNumber, totalPrice, status } = value;
    const result = await axios.post(apiUrl + "/insertOrder", {
      userId,
      orderDate,
      orderNumber,
      totalPrice,
      status,
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
