import { apiUrl } from "@/constants/envName";
import axios from "axios";

const middleUrl = "/orderItem";

// 주문 별 상품 추가
export const InsertOrderItemApi = async (value) => {
  try {
    const { orderNumber, title, thumbnail, count, price } = value;
    const result = await axios.post(apiUrl + middleUrl + "/insert", {
      orderNumber,
      title,
      thumbnail,
      count,
      price,
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

// 주문 별 상품 리스트 조회
export const GetOrderItemListApi = async (orderNumber) => {
  try {
    const result = await axios.get(apiUrl + middleUrl + `/${orderNumber}`, {
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
