package goormknights.hotel.member.controller;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberTestController {
    private final MemberService memberService;
    @PostMapping
    public void join(@RequestBody Member member) {
        memberService.save(member);
    }
}
