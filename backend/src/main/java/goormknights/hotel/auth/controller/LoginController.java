package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.dto.request.Login;
import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
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
public class LoginController {

    private final MemberService memberService;
    private final AdminService adminService;

    // 회원 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login, HttpSession session) {
        String memberId = login.getMemberId();
        String password = login.getPassword();

        try {
            String loginResult = memberService.login(memberId, password, session);
            return ResponseEntity.ok().body(loginResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    // 운영자 로그인
    @PostMapping("/login/adminlogin")
    public ResponseEntity<?> adminLogin(@RequestBody ManagerLogin login, HttpSession session) {
        String adminId = login.getAdminId();
        String password = login.getPassword();

        try {
            String loginResult = adminService.adminLogin(adminId, password, session);
            return ResponseEntity.ok().body(loginResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("어드민 로그인 실패");
        }
    }

}