package goormknights.hotel.auth.controller;

import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.dto.request.MemberEdit;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TempController {

    private final MemberService memberService;
    private final AdminService adminService;

    @GetMapping("/signup")
    public String showSignupPage() {
        return "signup";
    }

    @PostMapping("/auth/adminsignup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminSignup adminSignup){
        adminService.adminSignup(adminSignup);
        return new ResponseEntity<>("어드민계정 가입 성공", HttpStatus.OK);
    }

    @GetMapping("/")
    public String main(){
        return "메인 페이지 입니다.";
    }

    @GetMapping("/index")
    public String index(){
        return "index";
    }

    @PatchMapping("/members/{memberId}")
    public void edit(@PathVariable Long memberId, @RequestBody @Valid MemberEdit request){
        memberService.edit(memberId, request);
    }
}