package goormknights.hotel.chat.dto.response;

import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatRoomDto;
import goormknights.hotel.chat.model.Status;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class ResponseChatRoomDto {
    private Long id;
    private String roomId;
    private String name;
    private List<ResponseChatMessageDto> chatMessages;
    private Status status;
    private Timestamp timestamp;

    public ResponseChatRoomDto(ChatRoomDto chatRoomDto, List<ResponseChatMessageDto> chatMessages) {
        this.id = chatRoomDto.getId();
        this.roomId = chatRoomDto.getRoomId();
        this.name = chatRoomDto.getName();
        this.status = chatRoomDto.getStatus();
        this.chatMessages = chatMessages;
        this.timestamp = chatRoomDto.getTimestamp();
    }
}
