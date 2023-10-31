package goormknights.hotel.chat.dto.request;


import goormknights.hotel.chat.model.ChatMessage;
import lombok.Data;

@Data
public class RequestChatMessageDto {
    private long id;
    private String roomId;
    private String sender;
    private String message;
    private String createTime;
    private ChatMessage.MessageType type;
}
