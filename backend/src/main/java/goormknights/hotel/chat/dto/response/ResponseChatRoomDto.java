package goormknights.hotel.chat.dto.response;

import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.model.Status;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class ResponseChatRoomDto {
    private String roomId;
    private String name;
    private List<ChatMessage> chatMessages;
    private Status status;
    private Timestamp timestamp;

    public ResponseChatRoomDto(ChatRoomDto chatRoomDto, List<ChatMessage> chatMessages) {
        this.roomId = chatRoomDto.getRoomId();
        this.name = chatRoomDto.getName();
        this.status = chatRoomDto.getStatus();
        this.chatMessages = chatMessages;
        this.timestamp = chatRoomDto.getTimestamp();
    }
}