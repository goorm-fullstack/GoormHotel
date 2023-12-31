package goormknights.hotel.member.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.MemberEditAdminDTO;
import goormknights.hotel.member.dto.request.RequestManagerDto;
import goormknights.hotel.member.dto.response.ManagerListDTO;
import goormknights.hotel.member.dto.response.MemberInfoDetailDTO;
import goormknights.hotel.member.dto.response.ResponseManagerDto;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import goormknights.hotel.member.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;
    private final ManagerRepository managerRepository;

    @GetMapping("/session")
    public ResponseEntity<?> validateSession(HttpSession session) {
        Object roleObj = session.getAttribute("role");

        if (roleObj instanceof Role role) {
            String roleStr = role.name();

            if ("ADMIN".equals(roleStr) || "MANAGER".equals(roleStr)) {
                log.info(roleStr);
                return ResponseEntity.ok().body("세션 유효함");
            }
        }
        return ResponseEntity.status(401).body("세션 무효함");
    }

    @GetMapping("/sessionInfo")
    public ResponseEntity<?> getSessionInfo(HttpSession session) {
        Map<String, Object> sessionAttributes = new HashMap<>();
        Enumeration<String> attributeNames = session.getAttributeNames();

        while (attributeNames.hasMoreElements()) {
            String key = attributeNames.nextElement();
            Object value = session.getAttribute(key);
            sessionAttributes.put(key, value);
        }

        return ResponseEntity.ok(sessionAttributes);
    }

    // 회원디테일 정보 조회
    @GetMapping("/admin/member/{memberId}")
    public ResponseEntity<MemberInfoDetailDTO> memberInfoDetail(@PathVariable String memberId) {
        try {
            MemberInfoDetailDTO memberInfoDetailDTO = adminService.memberInfoDetail(memberId);
            return ResponseEntity.ok(memberInfoDetailDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 회원 정보 변경(어드민 버전)
    @PutMapping("/admin-change-member/{memberId}")
    public ResponseEntity<?> editMember(@PathVariable String memberId, @RequestBody MemberEditAdminDTO memberEditAdminDTO) {
        System.out.println("Received data: " + memberEditAdminDTO.toString());
        try {
            adminService.edit(memberId, memberEditAdminDTO);
            return ResponseEntity.ok().build(); // 200 OK
        } catch (MemberNotFound e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            System.out.println("Exception caught: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }

    @RequestMapping("/sessionInfo")
    public void sessionInfo(HttpSession session) {
        // 세션 ID
        String sessionId = session.getId();
        log.info("세션인포: " + sessionId);

        // 세션 만료 시간
        int maxInactiveInterval = session.getMaxInactiveInterval();
        log.info("Max Inactive Interval: " + maxInactiveInterval + " seconds");

        // 세션에 저장된 속성들
        Enumeration<String> attributeNames = session.getAttributeNames();
        while (attributeNames.hasMoreElements()) {
            String name = attributeNames.nextElement();
            Object value = session.getAttribute(name);
            log.info("Attribute Name: " + name + ", Attribute Value: " + value.toString());
        }
    }

    // 매니저 회원가입
    @PostMapping("/admin-signup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminSignupDTO adminSignupDTO){
        adminService.adminSignup(adminSignupDTO);
        return new ResponseEntity<>("어드민계정 가입 성공", HttpStatus.OK);
    }

    // 매니저 리스트 조회
    @GetMapping("/admin-getlist")
    public List<ManagerListDTO> getAllManagers(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return adminService.getList(pageable);
    }

    @PostMapping
    public ResponseEntity<?> addManager(@RequestBody AdminSignupDTO adminSignupDTO) {
        try {
            adminService.adminSignup(adminSignupDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AlreadyExistsEmailException e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/manager/{id}")
    public ResponseEntity<ResponseManagerDto> findByAdminId(@PathVariable String id) {
        return ResponseEntity.ok(adminService.findByAdminID(id));
    }

    @PostMapping("/manager/update")
    public ResponseEntity<String> updateByAdminId(@RequestBody RequestManagerDto managerDto) {
        adminService.updateManager(managerDto);
        return ResponseEntity.ok("업데이트 완료");
    }

    @GetMapping("/manager/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.ok(adminService.getCount());
    }

    @PostMapping("/manager/status/activate")
    public ResponseEntity<String> activateStatus(@RequestBody String[] admins) {
        adminService.updateActivationStatus(admins);
        return ResponseEntity.ok("업데이트 완료");
    }

    @PostMapping("/manager/status/unActivate")
    public ResponseEntity<String> unActivateStatus(@RequestBody String[] admins) {
        adminService.updateDisActivationStatus(admins);
        return ResponseEntity.ok("업데이트 완료");
    }

    // 회원 소프트 딜리트
    @PutMapping("/softdelete/{memberId}")
    public ResponseEntity<Object> softDeleteMember(@PathVariable String memberId) {
        adminService.softdeleteMember(memberId);
        return ResponseEntity.ok().build();
    }
}
