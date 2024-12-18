import { apiUrl } from "@/constants/envName";
import axios from "axios";

const middleUrl = "/order";

// 주문서 목록 조회
export const GetOrderListApi = async (id) => {
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

// 도서 정보 수정
export const CancelOrderApi = async (value) => {
  try {
    const { id, userId, orderNumber, orderDate, totalPrice } = value;

    const result = await axios.patch(apiUrl + middleUrl + "/cancel", {
      id,
      userId,
      orderNumber,
      orderDate,
      totalPrice,
      status: "canceled",
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

// 주문 기록 삭제
export const DeleteOrderApi = async (id) => {
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
