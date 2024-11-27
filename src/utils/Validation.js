export const emailValidate = (email) => {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  if (pattern.test(email) === false) {
    return "잘못된 이메일 형식입니다.";
  } else {
    return true;
  }
};

export const nameValidate = (name) => {
  const pattern = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;

  if (pattern.test(name) === false) {
    return "한글 또는 영어만 가능합니다.";
  } else {
    return true;
  }
};

export const passwordValidate = (password) => {
  const pattern = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{7,16}$/g;

  if (pattern.test(password) === false) {
    return "8자 이상 16자 이하, 영문(필수), 숫자(필수) 조합만 가능합니다.";
  } else {
    return true;
  }
};
