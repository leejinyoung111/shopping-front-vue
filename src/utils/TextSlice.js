// 문자열 길이 자르기
export const titleSlice = (title, length) => {
  if (title.length >= length) {
    return title.slice(0, length) + "...";
  } else {
    return title;
  }
};
