package goormknights.hotel.auth.service;

import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ManagerRepository managerRepository;

    // 로그아웃
    public void logout(HttpSession session) {
        session.invalidate();
    }

    public void updateAuthorities(String adminId, List<String> newAuthorities, HttpSession session) {
        Optional<Manager> managerOptional = managerRepository.findByAdminId(adminId);
        if (managerOptional.isPresent()) {
            Manager manager = managerOptional.get();
            manager.setAuthorities(newAuthorities);
            managerRepository.save(manager);

            session.setAttribute("authorities", newAuthorities);
        }
    }


}
