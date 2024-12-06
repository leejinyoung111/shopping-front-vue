// 이메일 유효성 검사
export const emailValidate = (email) => {
  const emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  if (!emailCheck.test(email)) {
    return "올바른 이메일 형식이 아닙니다.";
  } else if (email.search(/\s/) != -1) {
    return "공백없이 입력해주세요.";
  } else {
    return true;
  }
};

// 이름 유효성 검사
export const nameValidate = (name) => {
  const krCheck = /^[가-힣]{2,10}$/;

  if (!krCheck.test(name)) {
    return "2자 ~ 10자 이내, 한글만 입력하세요.";
  } else if (name.search(/\s/) != -1) {
    return "공백없이 입력해주세요.";
  } else {
    return true;
  }
};

// 비밀번호 유효성 검사
export const passwordValidate = (password) => {
  const numCheck = password.search(/[0-9]/g);
  const enCheck = password.search(/[a-z]/gi);
  const speCheck = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (password.length < 8 || password.length > 16) {
    return "8자 ~ 16자 이내로 입력해주세요.";
  } else if (password.search(/\s/) != -1) {
    return "공백없이 입력해주세요.";
  } else if (numCheck < 0 || enCheck < 0 || speCheck < 0) {
    return "영문, 숫자, 특수문자를 혼합하여 입력해주세요.";
  } else {
    return true;
  }
};
