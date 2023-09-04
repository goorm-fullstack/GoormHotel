package goormknights.hotel.chat.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.repository.ChatMessageRepository;
import goormknights.hotel.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Component
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    private final ChatMessageRepository chatMessageRepository;

    // 클라이언트로부터 메시지 수신지 동작한다.
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        chatMessageRepository.save(chatMessage);
        ChatRoom chatRoom = chatService.findRoomById(chatMessage.getRoomId());
        chatRoom.handlerActions(session, chatMessage, chatService);
    }


    // 클라이언트가 소켓 연결시에 동작
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info(session+" 입장");
    }

    // 클라이언트가 소켓 종료시 동작
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info(session+" 연결 해제");
    }
}
