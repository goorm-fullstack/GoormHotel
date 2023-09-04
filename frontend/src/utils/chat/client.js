import axios from "axios";

async function getChatRoomInfo(name) {
  let roomid = "";
  const baseURL = "http://127.0.0.1:8080/chat";
  let data = {
    name : name
  } 
  try {
    const response = await axios.post(baseURL, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.roomId);
    return response.data.roomId; // 응답 데이터 중 roomId를 반환
  } catch (error) {
    // 오류 처리
    console.error("에러 발생:", error);
    throw error; // 오류를 상위로 전파
  }
}

export default getChatRoomInfo;