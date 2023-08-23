package goormknights.hotel.controller;

import goormknights.hotel.config.MemberPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

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

}
