export const formatDate = (inputDate : string) => {
  // 날짜 문자열에서 숫자만 추출합니다.
  console.log(inputDate);
  inputDate.replace('.', ',')
  var date = inputDate.split(",")
  var cleanedDate = inputDate.replace(/\D/g, '');

  // 년, 월, 일을 추출합니다.
  var year = date[0]
  var month = date[1]
  var day = date[2];
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);

  // 변환된 날짜 형식으로 조합합니다.
  var formattedDate = year + '/' + month + '/' + day;

  return formattedDate;
}