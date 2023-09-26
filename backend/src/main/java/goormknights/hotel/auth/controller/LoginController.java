package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.auth.dto.request.MemberLogin;
import goormknights.hotel.auth.service.AuthService;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthService authService;
    private final MemberService memberService;
    private final AdminService adminService;


    // 회원 로그인
    @PostMapping("/member")
    public Map<String, Object> memberLogin(@RequestBody MemberLogin memberLogin, HttpSession session) {
        return memberService.memberLogin(memberLogin, session);
    }


    // 관리자 로그인
    @PostMapping("/manager")
    public Map<String, Object> adminLogin(@RequestBody ManagerLogin managerLogin, HttpSession session) {
        return adminService.managerLogin(managerLogin, session);
    }

    // 로그아웃
    @PostMapping("/logout")
    public void logout(HttpSession session) {
        authService.logout(session);
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