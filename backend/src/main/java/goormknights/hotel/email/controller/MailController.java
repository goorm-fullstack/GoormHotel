package goormknights.hotel.email.controller;

import goormknights.hotel.global.dto.ResponseEntity;
import goormknights.hotel.email.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class MailController {
    private final EmailService emailService;
    
    @PostMapping("/subscribe")
    public ResponseEntity<String> sendSubscribeEmail(@RequestParam String email) throws MessagingException {
        emailService.sendSubscribe(email, "newsletter");
        return new ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다.");
    }

    /**
     * 이메일 인증 코드 발송 매핑
     * 이쪽에 인증 코드 발송 관련 매핑을 작성해주세요.
     */
    public ResponseEntity<String> sendAuthorizationCode() {
        return new ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다");
    }
}
