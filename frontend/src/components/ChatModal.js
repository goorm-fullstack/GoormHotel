import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import closeImg from '../images/icon/ico_close.png';
import getChatRoomInfo from '../utils/chat/client';

const ChatWindow = styled.div`
  position: fixed;
  float: right;
  bottom: 70px;
  right: 172px;
  box-shadow: 0 0 10px rgba(0, 0, 1, 0.15);
  border-radius: 5px;
  z-index: 10;
`;

const ChatHeader = styled.div`
  background-color: #102c57;
  height: 60px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0 0;
  margin-bottom: 40px;
`;

const CloseBtn = styled.button`
  float: right;
  background: none;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const CloseImg = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(1);
`;
const ChatInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  outline: none;
  flex: 1;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 60%;
  max-height: 250px;
  right: 0;
  padding: 0 20px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;

const ChatMessage = styled.div`
  max-width: 200px;
  border-radius: 10px;
  padding: 13px;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isUser }) => ($isUser ? '#EBECF5' : '#EBEBEB')};
  margin-bottom: 20px;
`;

const ChatWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 430px;
  background-color: white;
  max-height: 430px;
`;

const AdminProfileIcon = styled.div`
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.charcoal};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 13px;
`;

const ChatMessageWrapper = styled.div`
  display: flex;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const ChatForm = styled.form`
  display: flex;
  bottom: 0;
  position: absolute;
  height: 40px;
  width: 100%;
`;

const ChatBtn = styled.button`
  width: 100px;
`;

const ChatModal = ({ closeChat }) => {
  const [chatData, setChatData] = useState([
    { message: '관리자입니다.', isUser: false },
    { message: '예약확인부탁드립니다', isUser: true },
  ]);
  const [newChat, setNewChat] = useState('');
  const chatContainerRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketURL = 'ws://127.0.0.1:8080/ws/chat';
  let ws = useRef(null);
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        const room = await getRoomId('tester');
        setRoomId((prevRoomId) => {
          // 이전 상태(prevRoomId)를 이용하여 새로운 상태를 반환
          if (!ws.current) {
            ws.current = new WebSocket(webSocketURL);
            ws.current.onopen = () => {
              setSocketConnected(true);
              console.log(prevRoomId); // 이전 상태를 사용할 수 있음
              console.log('WebSocket connected');

              // WebSocket 연결이 성공하면 ENTER 메시지 전송
              ws.current.send(
                JSON.stringify({
                  type: 'ENTER',
                  roomId: prevRoomId, // 이전 상태를 사용
                  sender: 'test',
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
              if (chatRoomID == prevRoomId) {
                console.log('call');
                // 메시지를 처리하는 로직을 여기에 추가
                // 이전 채팅 데이터를 복사한 후 새 메시지를 추가
                setChatData((prevChatData) => [...prevChatData, { message: chatContent, isUser: false }]);
              }
            };
          }
          return room; // 새로운 상태 반환
        });
      } catch (error) {
        console.error('Error fetching roomId:', error);
      }
    };

    initializeWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
      console.log('Cleaning up WebSocket');
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
      setSocketConnected(false);
    };
  }, []);

  const getRoomId = async () => {
    const request = await getChatRoomInfo('tester');
    setRoomId(request);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected) {
      setChatData([...chatData, { message: newChat, isUser: true }]);
      ws.current.send(
        JSON.stringify({
          type: 'TALK',
          roomId: roomId,
          sender: 'test',
          message: newChat,
        })
      );
      setNewChat('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newChat.trim() !== '') {
      setChatData([...chatData, { message: newChat, isUser: true }]);
      setNewChat('');
    }
  };

  // WebSocket 관련 부분
  const [socketConnecte, SetSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
  // 데이터를 받으면 무조건 관리자 메시지
  // 내가 데이터를 넘기면 무조건 유저

  return (
    <ChatWindow>
      <ChatWrapper>
        <ChatHeader>
          <CloseBtn onClick={closeChat}>
            <CloseImg src={closeImg} alt="close" />
          </CloseBtn>
          <p>채팅상담</p>
        </ChatHeader>
        <ChatContainer ref={chatContainerRef}>
          {chatData.map((chat, index) => (
            <ChatMessageWrapper $isUser={chat.isUser}>
              {!chat.isUser && (
                <AdminProfileIcon>
                  <svg fill="white" viewBox="0 0 24 24" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 12h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3a8 8 0 1 0-16 0z" />
                    </g>
                  </svg>
                </AdminProfileIcon>
              )}
              <ChatMessage key={index} $isUser={chat.isUser}>
                <div>{chat.message}</div>
              </ChatMessage>
            </ChatMessageWrapper>
          ))}
        </ChatContainer>
        <ChatForm onSubmit={handleFormSubmit}>
          <ChatInput
            type="text"
            placeholder="메세지입력"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
            onKeyDown={handleInputKeyPress}
          />
          <ChatBtn type="submit">전송</ChatBtn>
        </ChatForm>
      </ChatWrapper>
    </ChatWindow>
  );
};

export default ChatModal;
