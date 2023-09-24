package goormknights.hotel.email.model;

import lombok.*;

/**
 * 메일 엔티티
 * to - 받는 사람
 * message - 메일 내용
 * title - 메일 제목
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailMessage {
    private String to;
    private String message;
    private String subject;
    private String title;
    private String token;
    private String resetLink;
}