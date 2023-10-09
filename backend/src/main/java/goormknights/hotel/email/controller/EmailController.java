package goormknights.hotel.email.controller;

import goormknights.hotel.email.dto.request.EmailNameDTO;
import goormknights.hotel.email.dto.request.EmailPostDto;
import goormknights.hotel.email.dto.response.EmailResponseDto;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.model.MultipleEmail;
import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.member.dto.request.FindPasswordDTO;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import goormknights.hotel.member.service.VerificationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class EmailController {

    private final EmailService emailService;
    private final MemberRepository memberRepository;
    private final VerificationService verificationService;

    @PostMapping("/subscribe")
    public goormknights.hotel.global.dto.ResponseEntity<String> sendSubscribeEmail(@RequestBody Map<String, String> email) throws MessagingException {
        emailService.sendSubscribe(email.get("email"), "newsletter");
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
    public ResponseEntity<?> sendPasswordMail(@RequestBody FindPasswordDTO findPasswordDTO) {
        EmailMessage emailMessage = EmailMessage.builder()
                .to(findPasswordDTO.getEmail())
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

    // 아이디 찾기 코드 전송
    @PostMapping("/findid-code")
    public ResponseEntity<?> findIdCodeRequest(@RequestBody EmailNameDTO emailNameDTO) {
        Optional<Member> memberOptional = memberRepository.findByEmail(emailNameDTO.getEmail());
        if (memberOptional.isPresent()) {
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(emailNameDTO.getEmail())
                    .subject("[GoormHotel] 이메일 인증을 위한 인증 코드 발송")
                    .build();

            String code = emailService.sendMemberMail(emailMessage, "email-auth");
            EmailResponseDto emailResponseDto = new EmailResponseDto();
            emailResponseDto.setCode(code);

            return ResponseEntity.ok(emailResponseDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
    }

//    // 아이디 찾기 코드 버튼
//    @PostMapping("/send-id-find-code")
//    public ResponseEntity<?> sendIdFindCode(@RequestBody FindMemberIdDTO request) {
//        try {
//            String code = memberService.sendIdFindCode(request.getName(), request.getEmail());
//            return ResponseEntity.ok().body("인증 코드가 발송되었습니다.");
//        } catch (MemberNotFound e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
//        }
//    }

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

    // 첨부파일이 포함된 이메일을 여러 개의 이메일에 전송
    @PostMapping("/multiple")
    public ResponseEntity<String> sendMailToManyPerson(@ModelAttribute MultipleEmail multipleEmail, @RequestParam(required = false) MultipartFile multipartFile) {
        emailService.sendMail(multipleEmail, multipartFile);
        return ResponseEntity.ok("메일을 성공적으로 전송했습니다.");
    }
}