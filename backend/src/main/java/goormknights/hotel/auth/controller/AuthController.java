package goormknights.hotel.auth.controller;

import goormknights.hotel.email.EmailService;
import goormknights.hotel.email.EmailVerificationRequest;
import goormknights.hotel.auth.service.AuthService;
import goormknights.hotel.auth.service.Signup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailService emailService;

//    @GetMapping("/auth/login")
//    public SessionResponse login(@RequestBody Login login){
//        String accessToken = authService.signin(login);
//
//        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String jws = Jwts.builder().setSubject("Joe").signWith(key).compact();
//        return new SessionResponse(jws);
//    }

    @GetMapping("/signup")
    public String showSignupPage() {
        return "signup";
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<String> signup(@RequestBody Signup signup){
        authService.signup(signup, signup.getCode());
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody EmailVerificationRequest request) {
        boolean isVerified = authService.verifyCode(request.getEmail(), request.getCode());
        if (isVerified) {
            // 코드 검증 성공, 회원 가입 로직
            return ResponseEntity.ok("회원가입 성공");
        } else {
            return ResponseEntity.badRequest().body("인증 코드가 일치하지 않습니다.");
        }
    }

}
