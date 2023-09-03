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
  background-color: #102C57;
  height: 81px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
`
;
const ChatInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
  bottom: 0;
  outline: none;
  position: absolute;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 370px;
  min-height: 60%;
  max-height: 250px;
  position: absolute;
  right: 0;

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
  max-width: 270px;
  border-radius: 10px;
  padding: 10px;
  margin-right: 50px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ isUser }) => (isUser ? '#EBECF5' : '#EBEBEB')};
  margin-bottom: 20px;
`;

const ChatWrapper = styled.div`
  position: relative;
  width: 427px;
  height: 430px;
  background-color: white;
  max-height: 430px;
`;

const AdminProfileIcon = styled.div`
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #21201E;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 13px;
`;

const ChatMessageWrapper = styled.div`
  display: flex;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const ChatModal = ({ closeChat }) => {
  const [chatData, setChatData] = useState([
    { message: '관리자입니다.', isUser: false },
    { message: '예약확인부탁드립니다', isUser: true },
  ]);
  const [newChat, setNewChat] = useState('');
  const chatContainerRef = useRef(null);
<<<<<<< Updated upstream

  useEffect(() => {
=======
  const [roomId, setRoomId] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketURL = "ws://127.0.0.1:8080/ws/chat";
  let ws = useRef(null);
  useEffect(() => {
    getRoomId();
    if(!ws.current) {
      ws.current = new WebSocket(webSocketURL);
      ws.current.onopen = () => {
        setSocketConnected(true);
        if(socketConnected) {
          ws.current.send({
            type : "ENTER",
            roomId : roomId,
            sender : "test",
            message : "ENTER"
          })
        }
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketURL);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketURL);
        console.log(error);
      };
    }
    ws.current.onmessage = (event) => {
      console.log("got message", event.data);
    };
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  },[]);

  useEffect(() => {
    if(socketConnecte) {
      
    }
  }, [socketConnected])

  
  const getRoomId = async () => {
    const request = await getChatRoomInfo("tester");
    setRoomId(request);
  } 
  useEffect(() => {
>>>>>>> Stashed changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);
<<<<<<< Updated upstream

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newChat.trim() !== '') {
      setChatData([...chatData, { message: newChat, isUser: true }]);
=======
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected) {
      setChatData([...chatData, { message: newChat, isUser: true }]);
      ws.current.send(
        JSON.stringify({
          type : "TALK",
          roomId : roomId,
          sender : "test",
          message : newChat
        })
      )
>>>>>>> Stashed changes
      setNewChat('');
    }
  };

<<<<<<< Updated upstream
=======
  // WebSocket 관련 부분
  const [socketConnecte, SetSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
  // 데이터를 받으면 무조건 관리자 메시지
  // 내가 데이터를 넘기면 무조건 유저

  

>>>>>>> Stashed changes
  return (
    <ChatWindow>
      <ChatWrapper>
        <ChatHeader>
          <CloseBtn onClick={closeChat}><CloseImg src={closeImg} alt="close" /></CloseBtn>
          <p>채팅상담</p>
        </ChatHeader>
        <ChatContainer ref={chatContainerRef}>
          {chatData.map((chat, index) => (
            <ChatMessageWrapper isUser={chat.isUser}>
            {!chat.isUser && <AdminProfileIcon><svg fill='white' viewBox="0 0 24 24" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M4 12h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3a8 8 0 1 0-16 0z"/></g></svg></AdminProfileIcon>}
            <ChatMessage key={index} isUser={chat.isUser}>
              <div>{chat.message}</div>
            </ChatMessage>
            </ChatMessageWrapper>
          ))}
        </ChatContainer>
        <ChatInput
          type="text"
          placeholder="메세지입력"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          onKeyDown={handleInputKeyPress}
        />
        </ChatWrapper>
      </ChatWindow>
  );
};

export default ChatModal;
