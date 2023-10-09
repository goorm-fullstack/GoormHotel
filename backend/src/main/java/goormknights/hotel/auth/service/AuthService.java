package goormknights.hotel.auth.service;

import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ManagerRepository managerRepository;

    // 로그아웃
    public void logout(HttpSession session) {
        session.invalidate();
    }

    // 권한 확인
    public String checkAuth(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Object authObj = session.getAttribute("auth");
            if (authObj != null) {
                return (String) authObj;
            }
        }
        return null;
    }


}
