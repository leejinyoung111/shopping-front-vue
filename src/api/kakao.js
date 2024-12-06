import { kakaoKey } from "@/constants/envName";
import axios from "axios";

// 도서 데이터 가져오기
export const GetBookListApi = async (search) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v3/search/book?target=title&query=${search}`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoKey}`,
        },
      }
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
