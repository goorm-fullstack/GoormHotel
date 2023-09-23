package goormknights.hotel.member.service;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignup;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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

    // 매니저 권한 업데이트
    public void updateManagerAuth(String adminId, List<String> newAuthorities) {
        Manager manager = managerRepository.findByAdminId(adminId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        manager.setAuthorities(newAuthorities);
        managerRepository.save(manager);
    }

    // 매니저 로그인
    public boolean loginManager(String username, String password, HttpSession session) {
        Optional<Manager> managerOptional = managerRepository.findByAdminId(username);
        if (managerOptional.isPresent()) {
            Manager manager = managerOptional.get();
            if (manager.getPassword().equals(password)) {
                session.setAttribute("user", manager);
                session.setAttribute("role", manager.getRole());
                return true;
            }
        }
        return false;
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