import axios from "axios";

// 파라미터없이 데이터 요청
export async function getApiDate(url) {
  const baseURL = "http://127.0.0.1:8080/"+url;
  try {
    const response = await axios.get(baseURL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    // 오류 처리
    console.error("에러 발생:", error);
    throw error; // 오류를 상위로 전파
  }
}

// 파라미터를 이용해서 데이터 요청
export async function getApiDateByParam(url, param) {
  const baseURL = "http://127.0.0.1:8080/"+url;
  try {
    const response = await axios.get(baseURL, JSON.stringify(param), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    // 오류 처리
    console.error("에러 발생:", error);
    throw error; // 오류를 상위로 전파
  }
}