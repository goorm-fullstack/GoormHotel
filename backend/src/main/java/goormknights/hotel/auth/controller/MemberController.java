package goormknights.hotel.auth.controller;

import goormknights.hotel.member.dto.request.Signup;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    // 멤버 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Signup signup){
        memberService.signup(signup, signup.getCode());
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

//    // 이메일 인증 요청
//    @PostMapping("/verify")
//    public ResponseEntity<String> verifyCode(@RequestBody EmailVerificationRequest request) {
//        boolean isVerified = memberService.verifyCode(request.getEmail(), request.getCode());
//        if (isVerified) {
//            return ResponseEntity.ok("회원가입 성공");
//        } else {
//            return ResponseEntity.badRequest().body("인증 코드가 일치하지 않습니다.");
//        }
//    }

}
