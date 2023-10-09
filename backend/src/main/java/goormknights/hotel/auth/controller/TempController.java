package goormknights.hotel.auth.controller;

import goormknights.hotel.member.dto.request.MemberEdit;
import goormknights.hotel.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TempController {

    private final MemberService memberService;

    @GetMapping("/signup")
    public String showSignupPage() {
        return "signup";
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