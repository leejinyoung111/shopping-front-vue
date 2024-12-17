// 현재 날짜, 시간 가져오기
export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const hour = today.getHours();
  const minute = today.getMinutes();

  let timeFormat = "";

  if (hour < 10) {
    timeFormat += "0";
  }
  timeFormat += hour + ":";

  if (minute < 10) {
    timeFormat += "0";
  }

  timeFormat += minute;

  return `${year}-${month}-${day} ${timeFormat}`;
};
