import { apiUrl } from "@/constants/envName";
import axios from "axios";

// 최근검색 목록 조회
export const GetRecentSearchListApi = async (id) => {
  try {
    const result = await axios.get(apiUrl + `/recentSearch/${id}`, {
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

// 최근검색 추가
export const InsertRecentSearchApi = async (value) => {
  try {
    const { userId, search, date } = value;
    const result = await axios.post(apiUrl + "/insertRecentSearch", {
      userId,
      search,
      date,
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

// 최근검색 삭제
export const DeleteRecentSearchApi = async (id) => {
  try {
    const result = await axios.delete(apiUrl + `/recentSearch/${id}`, {
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
