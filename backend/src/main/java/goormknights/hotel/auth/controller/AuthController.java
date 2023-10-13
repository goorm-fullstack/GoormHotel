package goormknights.hotel.auth.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.dto.request.*;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.dto.request.FindMemberIdDTO;
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

    private final AdminService adminService;
    private final MemberService memberService;
    private final VerificationService verificationService;

    // 멤버 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDTO signupDTO){
        memberService.signup(signupDTO, signupDTO.getCode());
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    // 매니저 회원가입
    @PostMapping("/admin-signup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminSignupDTO adminSignupDTO){
        adminService.adminSignup(adminSignupDTO);
        return new ResponseEntity<>("어드민계정 가입 성공", HttpStatus.OK);
    }

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