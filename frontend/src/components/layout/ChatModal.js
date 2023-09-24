import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import getChatRoomInfo from '../../utils/chat/client';

const ChatWindow = styled.div`
  position: fixed;
  float: right;
  bottom: 40px;
  right: 140px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  z-index: 50;
  overflow: hidden;
  width: 380px;
  height: 460px;
  background: white;
  padding: 0 7px;
`;

const ChatHeader = styled.div`
  color: ${(props) => props.theme.colors.charcoal};
  height: 80px;
  line-height: 80px;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: ${(props) => props.theme.font.sizem};
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  width: 16px;
  height: 16px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.grayborder};

  &:hover {
    color: ${(props) => props.theme.colors.graylight};
  }
`;

const ChatInput = styled.input`
  padding: 0 80px 0 12px;
  border: 1px solid ${(props) => props.theme.colors.grayborder};
  border-radius: 20px;
  flex: 1;
  height: 50px;
  width: 100%;
  font-size: ${(props) => props.theme.font.sizes};
`;

const ChatContainer = styled.div`
  overflow-y: auto;
  height: 315px;
  padding: 0 13px 10px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 4px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.graylight};
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const ChatMessage = styled.div`
  max-width: 240px;
  border-radius: 10px;
  padding: 10px 15px;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isUser }) => ($isUser ? '#21201e' : '#f0f0f0')};
  margin-top: 10px;
  color: ${({ $isUser }) => ($isUser ? '#fff' : '#21201e')};
  font-size: ${(props) => props.theme.font.sizes};
  line-height: 1.4;
  word-break: keep-all;
`;

const AdminProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.gold};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const ChatMessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`;

const ChatForm = styled.form`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  padding: 0 3px;
  position: relative;
`;

const ChatBtn = styled.button`
  width: 80px;
  height: 34px;
  line-height: 34px;
  position: absolute;
  right: 10px;
  color: #fff;
  background-color: ${(props) => props.theme.colors.navy};
  border-radius: 15px;
  font-size: ${(props) => props.theme.font.sizes};

  &:hover {
    background-color: ${(props) => props.theme.colors.navyhover};
  }
`;

const ChatModal = ({ closeChat }) => {
  const [chatData, setChatData] = useState([]);
  const [newChat, setNewChat] = useState('');
  const chatContainerRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketURL = 'ws://127.0.0.1:8080/ws/chat';
  let ws = useRef(null);
  useLayoutEffect(() => {
    getChatRoomInfo('tester')
      .then((roomId) => {
        console.log(roomId); //채팅 테스트용도로 사용중입니다.
        setRoomId(roomId); //방 아이디 설정
        settingWebSocket(roomId); //웹소켓 설정
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, []);

  // 웹 소켓 설정을 UseEffect에서 분리
  const settingWebSocket = (roomId) => {
    // 이전 상태(prevRoomId)를 이용하여 새로운 상태를 반환
    if (!ws.current) {
      ws.current = new WebSocket(webSocketURL);
      ws.current.onopen = () => {
        setSocketConnected(true);
        console.log(roomId);
        console.log('WebSocket connected');

        // WebSocket 연결이 성공하면 ENTER 메시지 전송
        ws.current.send(
          JSON.stringify({
            type: 'ENTER',
            roomId: roomId, // 이전 상태를 사용
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
        const sender = parsedMessage.sender;

        // 메시지 발신자가 어드민인 경우에만 호출된다.
        if (chatRoomID === roomId && sender === 'admin') {
          console.log('call');
          // 메시지를 처리하는 로직을 여기에 추가
          // 이전 채팅 데이터를 복사한 후 새 메시지를 추가
          setChatData((p) => [...p, { message: chatContent, isUser: false }]);
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  // setChatData(p => [...p, { message: newChat, isUser: true }]); -> 권희준 멘트님 추천사항
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected) {
      setChatData((p) => [...p, { message: newChat, isUser: true }]);
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
      setChatData((p) => [...p, { message: newChat, isUser: true }]);
      setNewChat('');
    }
  };

  return (
    <ChatWindow>
      <ChatHeader>
        <p>1:1 채팅 문의</p>
        <CloseBtn onClick={closeChat}>×</CloseBtn>
      </ChatHeader>
      <ChatContainer ref={chatContainerRef}>
        {chatData.map((chat, index) => (
          <ChatMessageWrapper $isUser={chat.isUser}>
            {!chat.isUser && (
              <AdminProfileIcon>
                <svg fill="white" viewBox="0 0 24 24" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 12h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3a8 8 0 1 0-16 0z" />
                  </g>
                </svg>
              </AdminProfileIcon>
            )}
            <ChatMessage key={index} $isUser={chat.isUser}>
              <p>{chat.message}</p>
            </ChatMessage>
          </ChatMessageWrapper>
        ))}
      </ChatContainer>
      <ChatForm onSubmit={handleFormSubmit}>
        <ChatInput
          type="text"
          placeholder="메시지를 입력해주세요."
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          onKeyDown={handleInputKeyPress}
        />
        <ChatBtn type="submit">전송</ChatBtn>
      </ChatForm>
    </ChatWindow>
  );
};

export default ChatModal;
