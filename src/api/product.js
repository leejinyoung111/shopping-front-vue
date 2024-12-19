import { apiUrl } from "@/constants/envName";
import axios from "axios";

const middleUrl = "/admin";

// 도서 목록 조회
export const GetProductListApi = async (title) => {
  try {
    const result = await axios.post(apiUrl + middleUrl + `/product`, {
      title,
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

// 도서 추가
export const AddProductApi = async (value) => {
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

// 도서 삭제
export const DeleteProductApi = async (id) => {
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

// 도서 정보 수정
export const UpdateProductApi = async (value) => {
  try {
    const result = await axios.patch(apiUrl + middleUrl + "/update", value);

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
