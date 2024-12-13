import { apiUrl } from "@/constants/envName";
import axios from "axios";

// 주문서 목록 조회
export const GetOrderListApi = async (id) => {
  try {
    const result = await axios.get(apiUrl + `/order/${id}`, {
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
