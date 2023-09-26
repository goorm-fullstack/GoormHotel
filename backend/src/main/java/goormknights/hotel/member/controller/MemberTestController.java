package goormknights.hotel.member.controller;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberTestController {
    private final MemberService memberService;
    @PostMapping
    public void join(@RequestBody Member member) {
        memberService.save(member);
    }

    @GetMapping
    public Member find(@RequestParam Long id) {
        return memberService.findById(id);
    }

    @GetMapping("/list")
    public List<Member> getMember() {
        return memberService.findAll();
    }
}
