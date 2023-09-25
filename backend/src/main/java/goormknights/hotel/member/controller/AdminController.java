package goormknights.hotel.member.controller;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Enumeration;
import java.util.HashMap;
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



//    @GetMapping("/session")
//    public ResponseEntity<?> getSessionInfo(HttpSession session) {
//        String role = (String) session.getAttribute("role");
//        Object authoritiesObj = session.getAttribute("authorities");
//
//        if (!(authoritiesObj instanceof List)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authorities in session");
//        }
//
//        @SuppressWarnings("unchecked")
//        List<String> authorities = (List<String>) authoritiesObj;
//
//        if (role == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
//        }
//
//        Map<String, Object> sessionInfo = new HashMap<>();
//        sessionInfo.put("role", role);
//        sessionInfo.put("authorities", authorities);
//
//        return ResponseEntity.ok(sessionInfo);
//    }

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
    public ResponseEntity<?> addManager(@RequestBody AdminSignup adminSignup) {
        try {
            adminService.adminSignup(adminSignup);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AlreadyExistsEmailException e) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
