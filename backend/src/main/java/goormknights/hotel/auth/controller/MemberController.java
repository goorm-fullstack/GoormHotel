package goormknights.hotel.auth.controller;

import goormknights.hotel.global.exception.InvalidVerificationCodeException;
import goormknights.hotel.member.dto.request.*;
import goormknights.hotel.member.dto.response.ManagerListDTO;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import goormknights.hotel.member.service.AdminService;
import goormknights.hotel.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
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

    // 매니저 리스트 조회
    @GetMapping("/admin-getlist")
    public List<ManagerListDTO> getAllManagers() {
        List<Manager> allManagers = managerRepository.findAll();

        return allManagers.stream().map(manager -> {
            ManagerListDTO dto = new ManagerListDTO();
            dto.setId(manager.getId());
            dto.setAdminName(manager.getAdminName());
            dto.setAdminId(manager.getAdminId());
            dto.setAdminNickname(manager.getAdminNickname());
            dto.setCreatedAt(manager.getCreatedAt());
            dto.setIsActive(manager.getIsActive());
            dto.setPassword(manager.getPassword());
            return dto;
        }).collect(Collectors.toList());
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

}
