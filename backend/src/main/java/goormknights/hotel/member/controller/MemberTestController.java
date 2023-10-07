package goormknights.hotel.member.controller;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //블랙리스트 기능 테스트중입니다.
    @PostMapping("/blacked/{id}")
    public ResponseEntity<String> blacked(@PathVariable Long id) {
        memberService.setBlackList(id);
        return ResponseEntity.ok("차단 완료");
    }
}

