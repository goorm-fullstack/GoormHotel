package goormknights.hotel.auth.controller;

import goormknights.hotel.auth.config.MemberPrincipal;
import goormknights.hotel.auth.model.MemberEdit;
import goormknights.hotel.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MainController {

    private final AuthService authService;

    @GetMapping("/")
    public String main(){
        return "메인 페이지 입니다.";
    }

    @PreAuthorize("hasRole('ROLE_USER')") //Spring EL
    @GetMapping("/user")
    public String user(@AuthenticationPrincipal MemberPrincipal memberPrincipal){
        memberPrincipal.getMemberId(); // 나중에 이걸 가지고 유용히 써먹는다.
        return "유저 페이지 입니다.";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public String admin(){
        return "관리자 페이지 입니다.";
    }

    @GetMapping("/index")
    public String index(){
        return "index";
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/members/{memberId}")
    public void edit(@PathVariable Integer memberId, @RequestBody @Valid MemberEdit request){
        authService.edit(memberId, request);
    }
}
