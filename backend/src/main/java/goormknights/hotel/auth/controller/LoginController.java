package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.auth.dto.request.MemberLogin;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@Slf4j
@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final AdminService adminService;
    private final JdbcTemplate jdbcTemplate;


    // 회원 로그인
    @PostMapping("/member")
    public ResponseEntity<?> loginMember(@RequestBody MemberLogin memberLogin, HttpSession session) {
        boolean success = memberService.loginMember(memberLogin.getMemberId(), memberLogin.getPassword(), session);
        if (success) {
            String sessionId = session.getId();
            log.info("세션"+sessionId);
            return ResponseEntity.ok(Collections.singletonMap("sessionId", sessionId));
        } else {
            String sessionId = session.getId();
            log.info("로그인 실패, 세션 ID: " + sessionId + " - DB에서 삭제 시도");
            int rowsAffected = jdbcTemplate.update("DELETE FROM SPRING_SESSION WHERE SESSION_ID = ?", sessionId);
            log.info("삭제된 행 수: " + rowsAffected);
            session.invalidate();
            log.info("세션 무효화: " + sessionId);
            return ResponseEntity.badRequest().body("Invalid username or password.");
        }
    }


    // 관리자 로그인
    @PostMapping("/manager")
    public ResponseEntity<?> loginManager(@RequestBody ManagerLogin managerLogin, HttpSession session) {
        boolean success = adminService.loginManager(managerLogin.getAdminId(), managerLogin.getPassword(), session);
        if (success) {
            String sessionId = session.getId();
            log.info("세션"+sessionId);
            return ResponseEntity.ok(Collections.singletonMap("sessionId", sessionId));
        } else {
            session.invalidate();
            return ResponseEntity.badRequest().body("Invalid username or password.");
        }
    }


    // 역할 체크
    @GetMapping("/checkRole")
    public ResponseEntity<?> checkRole(HttpSession session) {
        Role role = (Role) session.getAttribute("role");
        if (role != null) {
            return ResponseEntity.ok(role);
        } else {
            return ResponseEntity.badRequest().body("Not logged in.");
        }
    }
}