package goormknights.hotel.member.service;

import goormknights.hotel.auth.dto.request.ManagerLogin;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                .authorities(adminSignup.getAuthorities())
                .role(Role.MANAGER)
                .isActive(false)
                .build();
        managerRepository.save(manager);
    }

    // 매니저 로그인
    public ResponseEntity<Map<String, Object>> managerLogin(ManagerLogin managerLogin, HttpSession session) {
        HashMap<String, Object> response = new HashMap<>();
        Optional<Manager> adminOptional = managerRepository.findByAdminId(managerLogin.getAdminId());

        if (adminOptional.isPresent()) {
            Manager manager = adminOptional.get();

            if (passwordEncoder.matches(managerLogin.getPassword(), manager.getPassword())) {
                session.setMaxInactiveInterval(60 * 60 * 12);
                session.setAttribute("admin", manager);
                session.setAttribute("role", manager.getRole());
                session.setAttribute("sessionId", session.getId());
                session.setAttribute("authorities", manager.getAuthorities());
                response.put("status", "success");
                response.put("role", manager.getRole().getKey());
                response.put("sessionId", session.getId());
                response.put("adminId", manager.getAdminId());
                response.put("authorities", manager.getAuthorities());

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("status", "fail");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } else {
            response.put("status", "fail");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
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