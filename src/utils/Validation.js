// 이메일 유효성 검사
export const emailValidate = (email) => {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  if (pattern.test(email) === false) {
    return "잘못된 이메일 형식입니다.";
  } else {
    return true;
  }
};

// 이름 유효성 검사
export const nameValidate = (name) => {
  const pattern = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;

  if (pattern.test(name) === false) {
    return "한글이나 영어만 가능합니다.";
  } else {
    return true;
  }
};

// 비밀번호 유효성 검사
export const passwordValidate = (password) => {
  const pattern = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{7,16}$/g;

  if (pattern.test(password) === false) {
    return "8자 이상 16자 이하, 영문과 숫자 조합만 가능합니다.";
  } else {
    return true;
  }
};
