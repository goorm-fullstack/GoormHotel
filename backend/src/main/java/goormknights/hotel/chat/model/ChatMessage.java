package goormknights.hotel.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    @CreationTimestamp
    private Timestamp createTime;
}
