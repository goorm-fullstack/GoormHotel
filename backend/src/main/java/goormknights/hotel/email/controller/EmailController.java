package goormknights.hotel.email.controller;

import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.global.dto.ResponseEntity;
import goormknights.hotel.member.service.VerificationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class EmailController {

    private final EmailService emailService;
    private final VerificationService verificationService;

    @PostMapping("/subscribe")
    public ResponseEntity<String> sendSubscribeEmail(@RequestParam String email) throws MessagingException {
        emailService.sendSubscribe(email, "newsletter");
        return new ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다.");
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendManagerEmail(@RequestBody EmailMessage message) throws MessagingException {
        emailService.sendMail(message);
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