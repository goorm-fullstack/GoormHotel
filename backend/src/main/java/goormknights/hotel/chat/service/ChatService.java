package goormknights.hotel.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import goormknights.hotel.chat.dto.request.RequestChatMessageDto;
import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoom;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.model.Status;
import goormknights.hotel.chat.repository.ChatMessageRepository;
import goormknights.hotel.chat.repository.ChatRoomRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {
    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms = new HashMap<>();
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        chatRoomDto.setRoomId(randomId);
        chatRoomDto.setName(name);
        chatRoomRepository.save(chatRoomDto);
        return chatRoom;
    }


    // 상대방에게 메시지를 전송하는 로직
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(message));
            session.sendMessage(textMessage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 채팅방에서 가장 최근에 생성된 메시지를 가져온다.
    public List<ChatMessage> findByLastMessage() {
        List<ChatRoom> allRoom = findAllRoom();
        List<ChatMessage> result = new ArrayList<>();

        for(ChatRoom chatRoom : allRoom) {
            List<ChatMessage> orderMessage = chatMessageRepository.findByRoomIdOrderByIdDesc(chatRoom.getRoomId());
            String sender = "";
            for(ChatMessage chatMessage : orderMessage) {
                if(!chatMessage.getSender().equals("admin")) {
                    sender = chatMessage.getSender();
                }
            }
            if(!orderMessage.isEmpty()) {
                ChatMessage lastMessage = orderMessage.get(0);
                lastMessage.setSender(sender);
                result.add(lastMessage);
            }
        }

        return result;
    }

    // 이전 방 메시지를 현재 방의 메세지로 업데이트
    public void updateMessageRoomId(List<RequestChatMessageDto> messageList, String newId) {
        for(RequestChatMessageDto messageDto : messageList) {
            ChatMessage message = chatMessageRepository.findById(messageDto.getId()).orElseThrow();
            message.setRoomId(newId);
        }
    }

    public Long calcRoomPageCount() {
        return (long) (chatRooms.size()/10);
    }

    public List<ChatMessage> findPrevMessage(String roomId) {
        return chatMessageRepository.findByRoomId(roomId);
    }

    public void setStatus(String roomId, Status status) {
        ChatRoomDto chatRoomDto = chatRoomRepository.findByRoomId(roomId).orElseThrow();
        chatRoomDto.setStatus(status);
    }

    public void closed(String roomId) {
        ChatRoomDto chatRoomDto = chatRoomRepository.findByRoomId(roomId).orElseThrow();
        chatRoomDto.setStatus(Status.CLOSED);
    }
}