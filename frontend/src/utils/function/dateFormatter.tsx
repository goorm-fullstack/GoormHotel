export const formatDate = (inputDate : string) => {
  // 날짜 문자열에서 숫자만 추출합니다.
  var cleanedDate = inputDate.replace(/\D/g, '');

  // 년, 월, 일을 추출합니다.
  var year = cleanedDate.substring(0, 4);
  var month = cleanedDate.substring(4, 6);
  var day;
  if(inputDate.length === 27)
    day = cleanedDate.substring(6, 7);
  else
    day = cleanedDate.substring(6, 8);
  // 날짜 형식을 각각 두 자리 숫자로 만듭니다.
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);

  // 변환된 날짜 형식으로 조합합니다.
  var formattedDate = year + '/' + month + '/' + day;

  return formattedDate;
}