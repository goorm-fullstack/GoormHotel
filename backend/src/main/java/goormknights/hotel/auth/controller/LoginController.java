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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthService authService;
    private final MemberService memberService;
    private final AdminService adminService;


    // 회원 로그인
    @PostMapping("/member")
    public ResponseEntity<Map<String, Object>> memberLogin(@RequestBody MemberLogin memberLogin, HttpSession session) {
        try {
            return memberService.memberLogin(memberLogin, session);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // 관리자 로그인
    @PostMapping("/manager")
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody ManagerLogin managerLogin, HttpSession session) {
        try {
            return adminService.managerLogin(managerLogin, session);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
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