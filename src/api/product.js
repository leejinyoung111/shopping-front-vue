import { apiUrl } from "@/constants/envName";
import axios from "axios";

// 도서 목록 조회
export const GetProductListApi = async () => {
  try {
    const result = await axios.get(apiUrl + `/getProductList`, {
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

// 도서 추가
export const AddProductApi = async (value) => {
  try {
    const {
      bookId,
      title,
      content,
      thumbnail,
      price,
      publisher,
      authors,
      status,
    } = value;
    const result = await axios.post(apiUrl + "/addProduct", {
      bookId,
      title,
      content,
      thumbnail,
      price,
      publisher,
      authors,
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

// 도서 삭제
export const DeleteProductApi = async (id) => {
  try {
    const result = await axios.delete(apiUrl + `/product/${id}`, {
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
