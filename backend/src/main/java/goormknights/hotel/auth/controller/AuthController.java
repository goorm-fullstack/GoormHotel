package goormknights.hotel.auth.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.dto.request.FindMemberIdDTO;
import goormknights.hotel.member.dto.request.FindPasswordDTO;
import goormknights.hotel.member.dto.request.ResetPasswordRequest;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.service.MemberService;
import goormknights.hotel.member.service.VerificationService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;
    private final VerificationService verificationService;

    // 역할 체크
    @GetMapping("/api/adminCheck")
    public ResponseEntity<?> checkRole(HttpSession session) {
        Map<String, Object> userInfo = new HashMap<>();
        Role role = (Role) session.getAttribute("role");
        String adminId = (String) session.getAttribute("adminId");
        String auth = (String) session.getAttribute("auth");

        if (role != null && adminId != null && auth != null) {
            userInfo.put("role", role);
            userInfo.put("adminId", adminId);
            userInfo.put("auth", auth);
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.badRequest().body("Not logged in.");
        }
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<?> findMemberId(@RequestBody FindMemberIdDTO request) {
        try {
            String memberId = memberService.findMemberId(request.getName(), request.getEmail());
            return ResponseEntity.ok().body("아이디 찾기를 위한 코드가 발송되었습니다.");
        } catch (MemberNotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
    }

    // 비밀번호 찾기
    @PostMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody FindPasswordDTO request) {
        try {
            String token = memberService.findPassword(request.getName(), request.getEmail(), request.getMemberId());
            String redirectUri = "http://localhost:8080/reset-password?token=" + token;
            return ResponseEntity.ok().body("비밀번호 재설정을 위해 이메일을 확인하세요. " + redirectUri);
        } catch (MemberNotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String token = request.getToken();
        String newPassword = request.getNewPassword();
        String email = request.getEmail();

        // 토큰 검증
        boolean isValid = verificationService.isTokenValid(token, email);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션이 만료되었거나 오류가 발생했습니다");
        }

        // 비밀번호 업데이트 로직
        try {
            memberService.updatePassword(email, newPassword);
            return ResponseEntity.ok().body("비밀번호 변경에 성공했습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 변경에 실패했습니다");
        }
    }

    // 코드 검증용 추가 엔드포인트
    @PostMapping("/verifycode")
    public ResponseEntity<?> verifyCode(@RequestBody FindMemberIdDTO request) {
        try {
            // 코드를 검증한다.
            boolean isVerified = memberService.verifyCode(request.getEmail(), request.getCode());

            if (isVerified) {
                // 인증이 성공하면 아이디를 찾아 반환한다.
                String memberId = memberService.getMemberIdByEmail(request.getEmail());
                return ResponseEntity.ok().body("Member ID: " + memberId);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid code");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }


}