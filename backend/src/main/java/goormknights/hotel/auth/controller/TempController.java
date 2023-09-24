package goormknights.hotel.auth.controller;

import goormknights.hotel.email.dto.request.EmailVerificationRequest;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.dto.request.MemberEdit;
import goormknights.hotel.member.dto.request.Signup;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TempController {

    private final MemberService memberService;
    private final AdminService adminService;

//    @GetMapping("/auth/login")
//    public SessionResponse login(@RequestBody MemberLogin login){
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
        memberService.signup(signup, signup.getCode());
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @PostMapping("/auth/adminsignup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminSignup adminSignup){
        adminService.adminSignup(adminSignup);
        return new ResponseEntity<>("어드민계정 가입 성공", HttpStatus.OK);
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
        boolean isVerified = memberService.verifyCode(request.getEmail(), request.getCode());
        if (isVerified) {
            // 코드 검증 성공, 회원 가입 로직
            return ResponseEntity.ok("회원가입 성공");
        } else {
            return ResponseEntity.badRequest().body("인증 코드가 일치하지 않습니다.");
        }
    }

    @GetMapping("/")
    public String main(){
        return "메인 페이지 입니다.";
    }

//    @PreAuthorize("hasRole('ROLE_USER')") //Spring EL
//    @GetMapping("/user")
//    public String user(@AuthenticationPrincipal MemberPrincipal memberPrincipal){
//        memberPrincipal.getMemberId(); // 나중에 이걸 가지고 유용히 써먹는다.
//        return "유저 페이지 입니다.";
//    }


    @GetMapping("/index")
    public String index(){
        return "index";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/members/{memberId}")
    public void edit(@PathVariable Long memberId, @RequestBody @Valid MemberEdit request){
        memberService.edit(memberId, request);
    }
}