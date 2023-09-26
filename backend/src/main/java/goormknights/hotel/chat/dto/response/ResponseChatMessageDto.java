package goormknights.hotel.chat.dto.response;

import goormknights.hotel.chat.model.ChatMessage;
import goormknights.hotel.chat.model.ChatMessage.MessageType;
import lombok.Data;

@Data
public class ResponseChatMessageDto {
    private long id;
    private String roomId;
    private String sender;
    private String message;
    private String createTime;
    private MessageType messageType;

    public ResponseChatMessageDto(ChatMessage chatMessage) {
        this.id = chatMessage.getId();
        this.roomId = chatMessage.getRoomId();
        this.sender = chatMessage.getSender();
        this.message = chatMessage.getMessage();
        this.createTime = chatMessage.getCreateTime();
        this.messageType = chatMessage.getType();
    }

    public ResponseChatMessageDto toEntity(ChatMessage chatMessage) {
        return new ResponseChatMessageDto(chatMessage);
    }
}
