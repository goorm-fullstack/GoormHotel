package goormknights.hotel.chat.model;

import goormknights.hotel.chat.service.ChatService;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    // 메시지가 전송되면 세션 리스트에 세션을 추가하고
    // 메시지를 입력하는 로직
    // 만약 입장하는 경우엔 기본적인 알림 메시지를 전송
    public void handlerActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        if(chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            sendMessage(chatMessage, chatService);
            if(!chatMessage.getSender().equals("admin"))
                chatMessage.setMessage("관리자와 연결 중입니다. 잠시만 기다려주세요");
            sendMessage(chatMessage, chatService);
        } else if (chatMessage.getType().equals(ChatMessage.MessageType.TALK)) {
            chatMessage.setMessage(chatMessage.getMessage());
            sendMessage(chatMessage, chatService);
        }
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }
}