package goormknights.hotel.email.model;

import lombok.*;
import java.util.List;

/**
 * 다수의 사용자에게 메일을 전송하는 엔티티
 */
@Data
public class MultipleEmail {
    private List<String> to;
    private String message;
    private String subject;

    public MultipleEmail(List<String> to, String message, String subject) {
        this.to = to;
        this.message = message;
        this.subject = subject;
    }
}
