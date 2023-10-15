package goormknights.hotel.member.controller;

import goormknights.hotel.global.exception.InvalidVerificationCodeException;
import goormknights.hotel.member.dto.request.*;
import goormknights.hotel.member.dto.response.MemberInfoDTO;
import goormknights.hotel.member.dto.response.ResponseMemberDto;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.ManagerRepository;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final AdminService adminService;
    private final ManagerRepository managerRepository;

    // 멤버 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDTO signupDTO){
        memberService.signup(signupDTO, signupDTO.getCode());
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    // 매니저 회원가입
    @PostMapping("/admin-signup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminSignupDTO adminSignupDTO){
        adminService.adminSignup(adminSignupDTO);
        return new ResponseEntity<>("어드민계정 가입 성공", HttpStatus.OK);
    }

    // 아이디 찾기 제출
    @PostMapping("/find-id")
    public ResponseEntity<?> findMemberId(@RequestBody FindMemberIdDTO findMemberIdDTO) {
        try {
            String code = findMemberIdDTO.getCode();
            String memberId = memberService.findMemberId(findMemberIdDTO, code);
            return new ResponseEntity<>(memberId, HttpStatus.OK);
        } catch (InvalidVerificationCodeException e) {
            return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
        } catch (MemberNotFound e) {
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }
    }

    // 비밀번호 찾기 제출
    @PostMapping("/find-pw")
    public ResponseEntity<?> findPw(@RequestBody FindPasswordDTO findPasswordDTO) {
        try {
            String code = findPasswordDTO.getCode();
            String resetToken = memberService.findMemberPw(findPasswordDTO, code);
            return new ResponseEntity<>(Collections.singletonMap("resetToken", resetToken), HttpStatus.OK);
        } catch (InvalidVerificationCodeException e) {
            return new ResponseEntity<>("Invalid verification code", HttpStatus.BAD_REQUEST);
        } catch (MemberNotFound e) {
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }
    }

    // 비밀번호 리셋
    @PostMapping("/reset-pw")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
            memberService.resetPassword(resetPasswordDTO);
            return new ResponseEntity<>("Password reset successful", HttpStatus.OK);
        } catch (InvalidVerificationCodeException e) {
            return new ResponseEntity<>("Invalid reset token", HttpStatus.BAD_REQUEST);
        } catch (MemberNotFound e) {
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }
    }

    // 회원 마이페이지 정보 얻기
    @GetMapping("/api/{memberId}")
    public ResponseEntity<MemberInfoDTO> getMemberInfo(@PathVariable String memberId) {
        try {
            MemberInfoDTO memberInfoDTO = memberService.getMemberInfo(memberId);
            return ResponseEntity.ok(memberInfoDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 회원 정보 변경
    @PutMapping("/api/change-member/{memberId}")
    public ResponseEntity<?> editMember(@PathVariable String memberId, @RequestBody MemberEditDTO memberEditDTO) {
        System.out.println("Received data: " + memberEditDTO.toString());
        try {
            memberService.edit(memberId, memberEditDTO);
            return ResponseEntity.ok().build(); // 200 OK
        } catch (MemberNotFound e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            System.out.println("Exception caught: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }

    @PostMapping
    public void join(@RequestBody Member member) {
        memberService.save(member);
    }

    @GetMapping
    public Member find(@RequestParam Long id) {
        return memberService.findById(id);
    }

    @GetMapping("/find")
    public ResponseEntity<ResponseMemberDto> findByMemberId(@RequestParam String id) {
        return ResponseEntity.ok(memberService.findByMemberId(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ResponseMemberDto>> getMemberList(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(memberService.getMemberList(pageable));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countByPaging() {
        return ResponseEntity.ok(memberService.getCount());
    }

    //블랙리스트 기능 테스트중입니다.
    @PostMapping("/blacked/{id}")
    public ResponseEntity<String> blacked(@PathVariable Long id) {
        memberService.setBlackList(id);
        return ResponseEntity.ok("차단 완료");
    }

    @PostMapping("/blacked")
    public ResponseEntity<String> blacked(@RequestBody List<Long> id) {
        memberService.setBlackList(id);
        return ResponseEntity.ok("차단 완료");
    }

    @PostMapping("/unBlacked")
    public ResponseEntity<String> unBlacked(@RequestBody List<Long> id) {
        memberService.setUnBlacked(id);
        return ResponseEntity.ok("차단 해제 완료");
    }

    // 회원아이디로 멤버 pk 가져오기 - 진환
    @GetMapping("/{memberId}")
    public ResponseEntity<Long> findMemberByMemberId(@PathVariable String memberId){
        Member member = memberService.findMember(memberId);
        Long id = member.getId();
        return ResponseEntity.ok(id);
    }
}

