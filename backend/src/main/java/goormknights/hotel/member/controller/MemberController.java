package goormknights.hotel.member.controller;

import goormknights.hotel.member.dto.request.MemberEditDTO;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    //
    @PutMapping("/{id}")
    public ResponseEntity<?> editMember(@PathVariable Long id, @RequestBody MemberEditDTO memberEditDTO) {
        try {
            memberService.edit(id, memberEditDTO);
            return ResponseEntity.ok().build(); // 200 OK
        } catch (MemberNotFound e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }
}
