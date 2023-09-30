package goormknights.hotel.member.service;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final ManagerRepository managerRepository;

    // 매니저 가입 및 저장
    public void adminSignup(AdminSignup adminSignup) {

        Optional<Manager> managerOptional = managerRepository.findByAdminId(adminSignup.getAdminId());
        if (managerOptional.isPresent()) {
            throw new AlreadyExistsEmailException();
        }

        String encryptedPassword = passwordEncoder.encode(adminSignup.getPassword());

        var manager = Manager.builder()
                .adminId(adminSignup.getAdminId())
                .password(encryptedPassword)
                .adminName(adminSignup.getAdminName())
                .adminNickname(adminSignup.getAdminNickname())
                .auth(adminSignup.getAuth())
                .role(Role.MANAGER)
                .isActive(false)
                .build();
        managerRepository.save(manager);
    }

    // 매니저 로그인
    public boolean ManagerLogin(String adminId, String password, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("manager") != null) {
            // 이미 로그인한 상태
            return false;
        }

        Optional<Manager> optionalManager = managerRepository.findByAdminId(adminId);
        if (optionalManager.isPresent() && passwordEncoder.matches(password, optionalManager.get().getPassword())) {
            session = request.getSession();
            session.setAttribute("manager", optionalManager.get());
            session.setAttribute("auth", optionalManager.get().getAuth()); // A, B, C
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(10);
            cookie.setPath("/");
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.addHeader("Access-Control-Allow-Credentials", "true");
            response.addCookie(cookie);
            log.info("쿠키 이름: " + cookie.getName());
            log.info("쿠키 값: " + cookie.getValue());
            log.info("리스폰스 헤더값: " + response.getHeaderNames());
            return true;
        }
        return false;
    }

    // 어드민 세션 체크
    public Map<String, Object> checkAdmin(HttpSession session) {
        HashMap<String, Object> response = new HashMap<>();
        Manager admin = (Manager) session.getAttribute("admin");
        if (admin != null) {
            response.put("status", "success");
            response.put("role", session.getAttribute("role"));
            response.put("authorities", session.getAttribute("authorities"));
        } else {
            response.put("status", "fail");
        }
        return response;
    }




    // 매니저 정보 수정
//    @Transactional
//    public void edit(Integer id, MemberEdit memberEdit){
//        Member member = memberRepository.findById(id)
//                .orElseThrow(MemberNotFound::new);
//
//        String encryptedPassword = passwordEncoder.encode(memberEdit.getPassword());
//
//        MemberEditor.MemberEditorBuilder editorBuilder = member.toEditor();
//        MemberEditor memberEditor = editorBuilder
//                .name(memberEdit.getName())
//                .email(memberEdit.getEmail())
//                .memberId(memberEdit.getMemberId())
//                .password(encryptedPassword)
//                .phoneNumber(memberEdit.getPhoneNumber())
//                .birth(memberEdit.getBirth())
//                .gender(memberEdit.getGender())
//                .build();
//
//        member.edit(memberEditor);
//    }
//
//
//    @Transactional
//    public void SetTempPassword(String email, String tempPassword) {
//        Member member = memberRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));
//
//        member.changePassword(passwordEncoder.encode(tempPassword));
//        memberRepository.save(member);
//    }

}