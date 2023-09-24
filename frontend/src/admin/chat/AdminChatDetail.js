import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Privacy from './../../pages/agreement/Privacy';
import Instance from '../../utils/api/axiosInstance';

const Container = styled.div`
  width: 100%;
  max-width: 1270px;
  min-width: 760px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
`;

const InfoContainer = styled.table`
  width: 100%;

  th,
  td {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
  }
`;

const InfoWrapper = styled.tr``;

const Label = styled.th`
  width: 240px;
  font-weight: 500;
  background-color: #f7f7f7;
  padding: 21.5px 40px;
  text-align: left;
  color: #111;

  &.center {
    text-align: center;
  }
`;

const Data = styled.td`
  padding: 10px 20px;
  color: #444;

  &.chatWrapper {
    padding: 0;
    background: #f7f7f7;
  }
  .chatLog {
    max-height: 380px;
    overflow-y: scroll;
    padding: 40px 0;
    line-height: 1.7;
    background: white;
    border-bottom: 1px solid #ddd;
  }

  .chatLog li {
    max-width: 734px;
    margin: 0 auto;
  }

  .chatLog storng {
    font-weight: 500;
    color: #111;
  }

  .chatLog span {
    color: #444;
  }

  .chatLog storng.manager {
    color: #baa085;
  }

  .writeWrapper {
    display: flex;
    max-width: 750px;
    margin: 0 auto;
    padding: 20px 0;
    gap: 0 10px;
  }

  textarea {
    border: 1px solid #ddd;
    width: 100%;
    max-width: 640px;
    resize: none;
    height: 80px;
    border-radius: 3px;
    padding: 10px;
  }

  button[type='submit'] {
    width: 100px;
    border-radius: 3px;
    background: #baa085;
    color: white;
  }

  button[type='submit']:hover {
    background: #95846e;
  }

  .chatClose {
    border: 1px solid #ddd;
    background: white;
    color: #666;
    padding: 6px 16px;
    margin-left: 8px;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .chatClose:hover {
    background: #f7f7f7;
  }
`;

const ModifyBtnWrapper = styled.div`
  text-align: center;
`;

const ModifyBtn = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid #baa085;
  color: #baa085;
  margin: 40px auto 0;
  background: white;

  &:hover {
    background: #baa085;
    color: white;
  }
`;

const AdminChatDetail = () => {
  const { roomId } = useParams();
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatData, setChatData] = useState([]);
  const chatContainerRef = useRef(null);
  const [newChat, setNewChat] = useState('');
  const [chatRoomData, setChatRoomData] = useState({});
  const [recentTime, setRecentTime] = useState("");
  const [status, setStatus] = useState("");
  const navigation = useNavigate();

  const navigateToChatList = () => {
    navigation("/admin/chat");
  };

  const subMenus = [
    { name: '채팅 관리', link: '/admin/chat' },
    { name: '메일 작성', link: '/admin/mail' },
  ];

  const webSocketURL = 'ws://127.0.0.1:8080/ws/chat';
  let ws = useRef(null);

  useLayoutEffect(()=>{
    Instance.get(`/chat/getPrevId/`+roomId)
      .then((response) =>{
        console.log("==============================");
        console.log(response.data)
        setChatRoomData(response.data)
        setStatus(response.data.status)
        console.log("==============================");
        setChatData(response.data.chatMessages);
        setRecentTime(chatData[chatData.length-1].createTime)
        settingWebSocket(roomId);
      }).catch((error) => {
        console.log("에러 "+error);
      })
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  const settingWebSocket = (roomId1) => {
    // 이전 상태(prevRoomId)를 이용하여 새로운 상태를 반환
    if (!ws.current) {
     ws.current = new WebSocket(webSocketURL);
     ws.current.onopen = () => {
       setSocketConnected(true);
       console.log("WebSocket connected");

       // WebSocket 연결이 성공하면 ENTER 메시지 전송
       ws.current.send(
         JSON.stringify({
           type: "ENTER",
           roomId: roomId1, // 이전 상태를 사용
           sender: "admin",
           message: "입장",
         })
       );
     };
     ws.current.onclose = (error) => {
       console.log("disconnect from " + webSocketURL);
       console.log(error);
     };
     ws.current.onerror = (error) => {
       console.log("connection error " + webSocketURL);
       console.log(error);
     };

     // 메시지 핸들러 설정
     ws.current.onmessage = (event) => {
       const message = event.data;
       const parsedMessage = JSON.parse(message);
       const chatContent = parsedMessage.message;
       const chatRoomID = parsedMessage.roomId;
       const sender = parsedMessage.sender;
       // 메시지 발신자가 어드민이 아닌 경우에만 호출된다.
       if(chatRoomID === roomId && sender !== "admin") {
         console.log("call");
         // 메시지를 처리하는 로직을 여기에 추가
         // 이전 채팅 데이터를 복사한 후 새 메시지를 추가
         setChatData((p) => [...p,{ message: chatContent, sender: sender, type: 'TALK' },]);
       }
     };
   }
    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
     console.log("Cleaning up WebSocket");
     if (ws.current && ws.current.readyState === WebSocket.OPEN) {
       ws.current.close();
     }
     setSocketConnected(false);
   };
 }

  // setChatData(p => [...p, { message: newChat, isUser: true }]); -> 권희준 멘트님 추천사항
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected) {
      setChatData(p => [...p, { message: newChat, sender: "admin", type: 'TALK' }]);
      ws.current.send(
        JSON.stringify({
          type: 'TALK',
          roomId: roomId,
          sender: 'admin',
          message: newChat,
        })
      );
      setNewChat('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newChat.trim() !== '') {
      setChatData(p=> [...p, { message: newChat, sender: "admin", type: 'TALK' }]);
      setNewChat('');
    }
  };

  const handleClosedClick = (e) => {
    setStatus("종료");
    Instance.get("/chat/closed/"+roomId).then((response)=>{
      console.log(response)
    })
  }

  return (
    <AdminLayout title="채팅/메일 관리" subMenus={subMenus}>
      <Container>
        <Title>채팅 관리</Title>
        <InfoContainer>
          <InfoWrapper>
            <Label>방 번호(회원 ID)</Label>
            <Data>({roomId})</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>최근 발송일</Label>
            <Data>{recentTime}</Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label>상태</Label>
            <Data>
              {status}
              <button type="button" className="chatClose" onClick={handleClosedClick}>
                종료
              </button>
            </Data>
          </InfoWrapper>
          <InfoWrapper>
            <Label colSpan="2" className="center">
              채팅 기록
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <Data colSpan="2" className="chatWrapper">
              <ul className="chatLog" ref={chatContainerRef}>
                {chatData.map((chat, index) => (
                  chat.type === 'TALK' ? ( // chat.type이 'TALK'인 경우에만 출력
                    <li key={index}>
                      {chat.sender === 'admin' ? (
                      <>
                        <strong className="manager">관리자(관리자 ID) : </strong>
                        <span>{chat.message}</span>
                      </>
                    ) : (
                      <>
                        <strong className="member">회원명(회원 ID) : </strong>
                        <span>{chat.message}</span>
                      </>
                    )}
                    </li>
                  ) : null
                ))}
              </ul>
              <div className="writeWrapper" onSubmit={handleFormSubmit}>
                <textarea
                  type="text"
                  placeholder="메시지를 입력해 주세요"
                  value={newChat}
                  onChange={(e) => setNewChat(e.target.value)}
                  onKeyDown={ handleInputKeyPress}
                ></textarea>
                <button type="submit">전송</button>
              </div>
            </Data>
          </InfoWrapper>
        </InfoContainer>
        <ModifyBtnWrapper>
          <ModifyBtn onClick={navigateToChatList}>목록</ModifyBtn>
        </ModifyBtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminChatDetail;
