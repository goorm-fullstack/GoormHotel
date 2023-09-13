package goormknights.hotel.email.controller;

import goormknights.hotel.email.dto.request.EmailPostDto;
import goormknights.hotel.email.dto.response.EmailResponseDto;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.member.dto.request.FindPasswordRequest;
import goormknights.hotel.member.service.VerificationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class EmailController {

    private final EmailService emailService;
    private final VerificationService verificationService;

    @PostMapping("/subscribe")
    public goormknights.hotel.global.dto.ResponseEntity<String> sendSubscribeEmail(@RequestParam String email) throws MessagingException {
        emailService.sendSubscribe(email, "newsletter");
        return new goormknights.hotel.global.dto.ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다.");
    }

    @PostMapping("/send")
    public goormknights.hotel.global.dto.ResponseEntity<String> sendManagerEmail(@RequestBody EmailMessage message) throws MessagingException {
        emailService.sendMail(message);
        return new goormknights.hotel.global.dto.ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다.");
    }

    /**
     * 이메일 인증 코드 발송 매핑
     * 이쪽에 인증 코드 발송 관련 매핑을 작성해주세요.
     */
    public goormknights.hotel.global.dto.ResponseEntity<String> sendAuthorizationCode() {
        return new goormknights.hotel.global.dto.ResponseEntity<>(HttpStatus.OK.value(), "메일 전송이 완료되었습니다");
    }

    // ============== 아래 민종 ====================

    // 임시 비밀번호 발급
    @PostMapping("/password")
    public ResponseEntity<?> sendPasswordMail(@RequestBody FindPasswordRequest findPasswordRequest) {
        EmailMessage emailMessage = EmailMessage.builder()
                .to(findPasswordRequest.getEmail())
                .subject("[GoormHotel] 임시 비밀번호 발급")
                .build();

        emailService.sendMemberMail(emailMessage, "password");

        return ResponseEntity.ok().build();
    }

    // 회원가입 이메일 인증
    @PostMapping("/email")
    public ResponseEntity<?> sendJoinMail(@RequestBody EmailPostDto emailPostDto) {
        EmailMessage emailMessage = EmailMessage.builder()
                .to(emailPostDto.getEmail())
                .subject("[GoormHotel] 이메일 인증을 위한 인증 코드 발송")
                .build();

        String code = emailService.sendMemberMail(emailMessage, "email-auth");

        EmailResponseDto emailResponseDto = new EmailResponseDto();
        emailResponseDto.setCode(code);

        return ResponseEntity.ok(emailResponseDto);
    }

    // 비밀번호 찾기 토큰 링크 검증용
    @PostMapping("/verifyResetToken")
    public ResponseEntity<?> verifyResetToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String email = request.get("email");

        boolean isValid = verificationService.isTokenValid(token, email);

        if (isValid) {
            return ResponseEntity.ok().body("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }
    }


}