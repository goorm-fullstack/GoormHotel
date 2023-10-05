package goormknights.hotel.email.model;

import jakarta.annotation.Nullable;
import lombok.*;
import java.util.List;

/**
 * 다수의 사용자에게 메일을 전송하는 엔티티
 */
@Data
public class MultipleEmail {
    private String to;//수신자
    private String message;//메시지
    private String subject;//제목
    private String carbonCopy;//참조

    public MultipleEmail(String to, String message, String subject, String carbonCopy) {
        this.to = to;
        this.message = message;
        this.subject = subject;
        this.carbonCopy = carbonCopy;
    }
}
