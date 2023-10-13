import axios from 'axios';

async function getChatRoomInfo(name: string) : Promise<string> {
  return new Promise(async (resolve, reject) => {
    const baseURL = `${process.env.REACT_APP_API_URL}/chat`;
    let data = {
      name: name,
    };

    try {
      const response = await axios.post(baseURL, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // axios.post 메서드는 Promise를 반환하므로, 결과를 resolve로 반환
      resolve(response.data.roomId); // 응답 데이터 중 roomId를 반환
    } catch (error) {
      // 오류 처리
      console.error('에러 발생:', error);
      reject(error); // 오류를 상위로 전파
    }
  });
}

export default getChatRoomInfo;
