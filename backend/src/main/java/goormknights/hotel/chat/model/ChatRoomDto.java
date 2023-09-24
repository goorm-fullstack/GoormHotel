package goormknights.hotel.chat.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
public class ChatRoomDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomId;
    private String name;
    @Enumerated(EnumType.STRING)
    private Status status = Status.CONTINUE;
    @CreationTimestamp
    private Timestamp timestamp;
}