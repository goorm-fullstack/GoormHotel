import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as S from './Style';
import getChatRoomInfo from '../../../utils/chat/client';
import Instance from '../../../utils/api/axiosInstance';

interface ChatModalProps {
  closeChat: () => void; // closeChat 프로퍼티는 함수이며 반환값이 없음(void)
}

const ChatModal: React.FC<ChatModalProps> = ({ closeChat }) => {
  interface ChatMessage {
    message: string;
    isUser: boolean;
  }

  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [newChat, setNewChat] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [roomId, setRoomId] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketURL = process.env.REACT_APP_WS_URL;
  let ws = useRef<WebSocket | null>(null);
  let prevRoomId = useRef<String>("");
  const memberId = localStorage.getItem("memberId") || 'anonymous';

  useEffect(() => {
    if(memberId && memberId !== 'anonymous') {
      Instance.get("/member/chatroom", {
        params : {
          "memberId" : memberId
        }
      }).then((response) => {
        prevRoomId.current = response.data;
        getChatRoomInfo('GoormHotel')
        .then((roomId) => {
          setRoomId(roomId); //방 아이디 설정
          settingWebSocket(roomId, memberId); //웹소켓 설정
        })
        .catch((error) => {
          console.error('오류 발생:', error);
        });
      })
    } else {
      console.log('anonymous')
      getChatRoomInfo('GoormHotel')
        .then((roomId) => {
          setRoomId(roomId); //방 아이디 설정
          settingWebSocket(roomId, "anonymous"); //웹소켓 설정
        })
        .catch((error) => {
          console.error('오류 발생:', error);
        });
    }
  }, []);

  // 웹 소켓 설정을 UseEffect에서 분리
  const settingWebSocket = (roomId: string, memberId : string) => {
    // 이전 상태(prevRoomId)를 이용하여 새로운 상태를 반환
    if(prevRoomId.current !== '' && memberId !== 'anonymous') {
      Instance.get(`/chat/getPrevId/${prevRoomId.current}`).then((response) => {
        const data = response.data.chatMessages;
        for(var i = 0; i < data.length; i++) {
          const chat = data[i].message;
          const type = data[i].type;
          if(type==='ENTER')
            continue;
          if(data[i].sender==='admin') {
            setChatData((p) => [...p, { message: chat, isUser: false }]);
          } else {
            setChatData((p) => [...p, { message: chat, isUser: true }]);
          }
        }
        Instance.post(`/chat/prevMessage/update/${roomId}`, data);
      })
    }


    if (!ws.current && webSocketURL !== undefined) {
      ws.current = new WebSocket(webSocketURL);
      ws.current.onopen = () => {
        setSocketConnected(true);
        // WebSocket 연결이 성공하면 ENTER 메시지 전송
        ws.current?.send(
          JSON.stringify({
            type: 'ENTER',
            roomId: roomId, // 이전 상태를 사용
            sender: memberId,
            message: '',
          })
        );

        if(memberId !== 'anonymous') {
          const postData = {
            "memberId" : memberId,
            "roomId" : roomId
          }
          Instance.post("/member/chatroom", postData).then(() => {

          });
        }
      };
      ws.current.onclose = (error) => {
        console.error(error);
      };
      ws.current.onerror = (error) => {
        console.error(error);
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
          // 메시지를 처리하는 로직을 여기에 추가
          // 이전 채팅 데이터를 복사한 후 새 메시지를 추가
          setChatData((p) => [...p, { message: chatContent, isUser: false }]);
        }
      };
    }
    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => {
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
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newChat.trim() !== '' && socketConnected && ws.current) {
      setChatData((p) => [...p, { message: newChat, isUser: true }]);
      ws.current.send(
        JSON.stringify({
          type: 'TALK',
          roomId: roomId,
          sender: memberId,
          message: newChat,
        })
      );
      setNewChat('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newChat.trim() !== '') {
      setChatData((p) => [...p, { message: newChat, isUser: true }]);
      setNewChat('');
    }
  };

  return (
    <S.ChatWindow>
      <div className="chatheader">
        <p>1:1 채팅 문의</p>
        <button type="button" onClick={closeChat}>
          ×
        </button>
      </div>
      <div className="chatcontainer" ref={chatContainerRef}>
        {chatData.map((chat, index) => (
          <div className="chatwrap" data-isuser={chat.isUser}>
            {!chat.isUser && (
              <div className="csicon">
                <svg fill="white" viewBox="0 0 24 24" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 12h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3a8 8 0 1 0-16 0z" />
                  </g>
                </svg>
              </div>
            )}
            <div className="messagewrap" key={index} data-isuser={chat.isUser}>
              <p>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chatwrite">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
            onKeyDown={handleInputKeyPress}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </S.ChatWindow>
  );
};

export default ChatModal;
