package goormknights.hotel.auth.controller;

import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.SignupDTO;
import goormknights.hotel.member.dto.response.ManagerListDTO;
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

//    // 이메일 인증 요청
//    @PostMapping("/verify")
//    public ResponseEntity<String> verifyCode(@RequestBody EmailVerificationRequest request) {
//        boolean isVerified = memberService.verifyCode(request.getEmail(), request.getCode());
//        if (isVerified) {
//            return ResponseEntity.ok("회원가입 성공");
//        } else {
//            return ResponseEntity.badRequest().body("인증 코드가 일치하지 않습니다.");
//        }
//    }

}
