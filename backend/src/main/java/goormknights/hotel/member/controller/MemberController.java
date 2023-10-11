package goormknights.hotel.member.controller;

import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.AnonymousSignupDto;
import goormknights.hotel.member.dto.request.SignupDTO;
import goormknights.hotel.member.dto.response.ManagerListDTO;
import goormknights.hotel.member.dto.response.ResponseMemberDto;
import goormknights.hotel.member.model.Manager;
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

import java.util.List;
import java.util.stream.Collectors;

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

    // 비회원 회원가입
    @PostMapping("/anonymous/signup")
    public ResponseEntity<String> anonymousSignup(@RequestBody AnonymousSignupDto signupDTO, HttpServletRequest request, HttpServletResponse response){
        memberService.anonymousSignup(signupDTO, signupDTO.getCode(), request, response);
        return ResponseEntity.ok("비회원 회원가입 완료");
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

    @PostMapping
    public void join(@RequestBody Member member) {
        memberService.save(member);
    }

    @GetMapping
    public Member find(@RequestParam Long id) {
        return memberService.findById(id);
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
}

