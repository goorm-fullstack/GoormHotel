package goormknights.hotel.member.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.RequestManagerDto;
import goormknights.hotel.member.dto.response.MemberInfoDetailDTO;
import goormknights.hotel.member.dto.response.ResponseManagerDto;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;

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
    @GetMapping("/api/admin/member/{memberId}")
    public ResponseEntity<?> memberInfoDetail(@PathVariable String memberId) {
        MemberInfoDetailDTO memberInfo = adminService.memberInfoDetail(memberId);
        if (memberInfo != null) {
            return ResponseEntity.ok(memberInfo);
        } else {
            return ResponseEntity.status(404).body("Member not found");
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
