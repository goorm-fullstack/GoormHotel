package goormknights.hotel.auth.controller;

import goormknights.hotel.member.dto.request.FindMemberIdRequest;
import goormknights.hotel.member.dto.request.FindPasswordRequest;
import goormknights.hotel.member.dto.request.ResetPasswordRequest;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.service.MemberService;
import goormknights.hotel.member.service.VerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;
    private final VerificationService verificationService;

    // 아이디 찾기
    @PostMapping("/findMemberId")
    public ResponseEntity<?> findMemberId(@RequestBody FindMemberIdRequest request) {
        try {
            String memberId = memberService.findMemberId(request.getName(), request.getEmail());
            return ResponseEntity.ok().body("아이디 찾기를 위한 코드가 발송되었습니다.");
        } catch (MemberNotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
    }

    // 비밀번호 찾기
    @PostMapping("/findpassword")
    public ResponseEntity<?> findPassword(@RequestBody FindPasswordRequest request) {
        try {
            String token = memberService.findPassword(request.getName(), request.getEmail(), request.getMemberId());
            String redirectUri = "http://localhost:8080/reset-password?token=" + token;
            return ResponseEntity.ok().body("비밀번호 재설정을 위해 이메일을 확인하세요. " + redirectUri);
        } catch (MemberNotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
    }

    // 비밀번호 재설정
    @PostMapping("/resetpassword")
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
    public ResponseEntity<?> verifyCode(@RequestBody FindMemberIdRequest request) {
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

//    @PostMapping("/verifyId")
//    public ResponseEntity<?> verifyId(@RequestBody VerifyIdRequest request) {
//        if (memberService.verifyCode(request.getEmail(), request.getCode())) {
//            return ResponseEntity.ok().body("아이디찾기완료-회원아이디: " + request.getMemberId());
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid code");
//        }
//    }

}