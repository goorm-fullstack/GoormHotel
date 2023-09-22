package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.dto.request.Login;
import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collection;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
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

    @GetMapping("/login")
    public String login() {
        return "loginPage";  // 로그인 페이지 뷰 이름
    }

    // 관리자 로그인
    @PostMapping("/login/adminlogin")
    public ResponseEntity<?> adminLogin(@RequestBody ManagerLogin login,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        String adminId = login.getAdminId();
        String password = login.getPassword();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(adminId, password)
            );

            Cookie cookie = new Cookie("adminId", adminId);
            cookie.setPath("/");
            cookie.setSecure(false);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 60 * 24);
            response.setHeader("Set-Cookie", "key=value; SameSite=None");
            response.addCookie(cookie);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("컨트롤러"+authentication);
            return ResponseEntity.ok().body("로그인 완료");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("어드민 로그인 실패");
        }
    }

    // 유저 정보 알아내기
    @GetMapping("/admin/userinfo")
    public ResponseEntity<?> getAdminInfo(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        String username = userDetails.getUsername();
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        return ResponseEntity.ok(Map.of("username", username, "roles", authorities));
    }


    @GetMapping("/getLoginInfo")
    public String getLoginInfo(Authentication authentication, HttpServletRequest request) {
        // 아이디 가져오기
        String username = authentication.getName();
        log.info("Username: " + username);

        // 권한 가져오기
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            log.info("Authority: " + authority.getAuthority());
        }

        // 쿠키 가져오기
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            log.info("Cookie Name: " + cookie.getName());
            log.info("Cookie Value: " + cookie.getValue());
        }

        return "loginInfo";
    }

}