package goormknights.hotel.member.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.RequestManagerDto;
import goormknights.hotel.member.dto.response.ManagerListDTO;
import goormknights.hotel.member.dto.response.MemberInfoDetailDTO;
import goormknights.hotel.member.dto.response.ResponseManagerDto;
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

    @GetMapping("/manager/list")
    public ResponseEntity<List<ResponseManagerDto>> getManagerList(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseManagerDto> list = adminService.getList(pageable);
        return ResponseEntity.ok(list);
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
}
