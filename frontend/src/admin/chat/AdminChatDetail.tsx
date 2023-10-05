import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';
import Instance from '../../utils/api/axiosInstance';
import { PageTitle, BtnWrapper, CloseButton, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/AdminMember';

interface ChatMessage{
  sender : string;
  message : string;
  type : string;
}

const AdminChatDetail = () => {
  const { roomId } = useParams<string>();
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const [newChat, setNewChat] = useState('');
  const [chatRoomData, setChatRoomData] = useState({});
  const [recentTime, setRecentTime] = useState('');
  const [status, setStatus] = useState('');
  const navigation = useNavigate();

  const navigateToChatList = () => {
    navigation('/admin/chat/1');
  };

  const webSocketURL = 'ws://127.0.0.1:8080/ws/chat';
  let ws = useRef<WebSocket | null>(null);

  useLayoutEffect(() => {
    Instance.get(`/chat/getPrevId/` + roomId)
      .then((response) => {
        if(roomId !== undefined) {
          settingWebSocket(roomId);
        }
        setChatRoomData(response.data);
        setStatus(response.data.status);
        setChatData(response.data.chatMessages);
        setRecentTime(response.data.chatMessages[response.data.chatMessages.length - 1].createTime);
      })
      .catch((error) => {
        console.log('에러 ' + error);
      });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  const settingWebSocket = (roomId1:string) => {
    // 이전 상태(prevRoomId)를 이용하여 새로운 상태를 반환
    if (!ws.current) {
      ws.current = new WebSocket(webSocketURL);
      ws.current.onopen = () => {
        setSocketConnected(true);
        console.log('WebSocket connected');

        // WebSocket 연결이 성공하면 ENTER 메시지 전송
        ws.current?.send(
          JSON.stringify({
            type: 'ENTER',
            roomId: roomId1, // 이전 상태를 사용
            sender: 'admin',
            message: '입장',
          })
        );
      };
      ws.current.onclose = (error) => {
        console.log('disconnect from ' + webSocketURL);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log('connection error ' + webSocketURL);
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
         // 메시지를 처리하는 로직을 여기에 추가
         // 이전 채팅 데이터를 복사한 후 새 메시지를 추가
         setChatData((p) => [...p, { message: chatContent, sender: sender, type: 'TALK' },]);
       }
     };
   }
    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
      console.log('Cleaning up WebSocket');
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
      setSocketConnected(false);
    };
  };

  // setChatData(p => [...p, { message: newChat, isUser: true }]); -> 권희준 멘트님 추천사항
  const handleInputKeyPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected) {
      setChatData((p) => [...p, { message: newChat, sender: 'admin', type: 'TALK' }]);
      ws.current?.send(
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

  const handleFormSubmit = (e : React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (newChat.trim() !== '') {
      setChatData((p) => [...p, { message: newChat, sender: 'admin', type: 'TALK' }]);
      setNewChat('');
    }
  };

  const handleClosedClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setStatus('CLOSED');
    Instance.get('/chat/closed/' + roomId).then((response) => {
      console.log(response);
    });
  };

  return (
    <AdminLayout subMenus="chat">
      <Container>
        <PageTitle>채팅 관리</PageTitle>
        <Table className="horizontal">
          <colgroup>
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>회원 아이디(회원 ID)</th>
              <td>({roomId})</td>
            </tr>
          <tr>
            <th>최근 발송일</th>
            <td>{recentTime}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>
              {status}
              <CloseButton type="button" className="chatClose" onClick={handleClosedClick}>
                종료
              </CloseButton>
            </td>
          </tr>
          <tr>
            <th colSpan={2} className="center">
              채팅 기록
            </th>
          </tr>
          <tr>
            <S.ChatWrapper colSpan={2} className="writeWrapper">
              <ul className="chatLog" ref={chatContainerRef}>
                {chatData.map((chat, index) =>
                  chat.type === 'TALK' ? ( // chat.type이 'TALK'인 경우에만 출력
                    <li key={index}>
                      {chat.sender === 'admin' ? (
                        <>
                          <strong className="manager">관리자(관리자 ID) : </strong>
                          <span>{chat.message}</span>
                        </>
                      ) : (
                        <>
                          <strong className="member">{chat.sender}(회원 ID) : </strong>
                          <span>{chat.message}</span>
                        </>
                      )}
                    </li>
                  ) : null
                )}
              </ul>
              <div className="writeWrapper" onSubmit={handleFormSubmit}>
                <textarea
                  placeholder="메시지를 입력해 주세요"
                  value={newChat}
                  onChange={(e) => setNewChat(e.target.value)}
                  onKeyDown={handleInputKeyPress}></textarea>
                <button type="submit">전송</button>
              </div>
            </S.ChatWrapper>
          </tr>
          </tbody>
        </Table>
        <BtnWrapper className = "center mt40">
          <NormalBtn onClick={navigateToChatList}>목록</NormalBtn>
        </BtnWrapper>
      </Container>
    </AdminLayout>
  );
};

export default AdminChatDetail;
