package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.auth.dto.request.MemberLogin;
import goormknights.hotel.member.exception.InvalidMemberException;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final AdminService adminService;


    // 회원 로그인
    @PostMapping("/member")
    public ResponseEntity<?> memberLogin(@RequestBody MemberLogin memberLogin, HttpServletRequest request, HttpServletResponse response) {
        if (memberService.memberLogin(memberLogin.getMemberId(), memberLogin.getPassword(), request, response)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("로그인 실패", HttpStatus.UNAUTHORIZED);
        }
    }

    // 관리자 로그인
//    @PostMapping("/manager")
//    public ResponseEntity<?> adminLogin(@RequestBody ManagerLogin managerLogin, HttpServletRequest request, HttpServletResponse response) {
//        if (adminService.managerLogin(managerLogin.getAdminId(), managerLogin.getPassword(), request, response)) {
//            return new ResponseEntity<>(HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("로그인 실패", HttpStatus.UNAUTHORIZED);
//        }
//    }
    @PostMapping("/manager")
    public ResponseEntity<?> adminLogin(@RequestBody ManagerLogin managerLogin, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (adminService.managerLogin(managerLogin.getAdminId(), managerLogin.getPassword(), request, response)) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("로그인 실패", HttpStatus.UNAUTHORIZED);
            }
        } catch (InvalidMemberException e) {
            return new ResponseEntity<>("이 매니저 계정은 비활성화 되었습니다", HttpStatus.FORBIDDEN);
        }
    }

    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
            return new ResponseEntity<>("Logged out", HttpStatus.OK);
        }
        return new ResponseEntity<>("No session found", HttpStatus.BAD_REQUEST);
    }

}