package goormknights.hotel.email.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 메일 엔티티
 * to - 받는 사람
 * message - 메일 내용
 * title - 메일 제목
 */
@Data
@Builder
@NoArgsConstructor
public class EmailMessage {
    private String to;
    private String message;
    private String title;

    public EmailMessage(String to, String message, String title) {
        this.to = to;
        this.message = message;
        this.title = title;
    }
}
