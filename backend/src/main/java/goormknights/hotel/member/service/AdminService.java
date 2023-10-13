package goormknights.hotel.member.service;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.RequestManagerDto;
import goormknights.hotel.member.dto.response.ResponseManagerDto;
import goormknights.hotel.member.exception.NotExistMemberException;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.repository.ManagerRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final ManagerRepository managerRepository;

    // 매니저 가입 및 저장
    public void adminSignup(AdminSignupDTO adminSignupDTO) {

        Optional<Manager> managerOptional = managerRepository.findByAdminId(adminSignupDTO.getAdminId());
        if (managerOptional.isPresent()) {
            throw new AlreadyExistsEmailException();
        }

        String encryptedPassword = passwordEncoder.encode(adminSignupDTO.getPassword());

        var manager = Manager.builder()
                .adminId(adminSignupDTO.getAdminId())
                .password(encryptedPassword)
                .adminName(adminSignupDTO.getAdminName())
                .adminNickname(adminSignupDTO.getAdminNickname())
                .auth(adminSignupDTO.getAuth())
                .role(Role.MANAGER)
                .isActive(true)
                .build();
        managerRepository.save(manager);
    }

    // 매니저 로그인
    public boolean managerLogin(String adminId, String password, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("manager") != null) {
            // 이미 로그인한 상태
            return false;
        }

        Optional<Manager> optionalManager = managerRepository.findByAdminId(adminId);
        if (optionalManager.isPresent() && passwordEncoder.matches(password, optionalManager.get().getPassword())) {
            session = request.getSession();
            session.setAttribute("adminId", optionalManager.get().getAdminId());
            session.setAttribute("role", optionalManager.get().getRole());
            session.setAttribute("auth", optionalManager.get().getAuth());

            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(10);
            cookie.setPath("/");
            cookie.setSecure(true);

            ResponseCookie adminIdCookie = ResponseCookie.from("adminId", optionalManager.get().getAdminId())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();
            ResponseCookie roleCookie = ResponseCookie.from("role", optionalManager.get().getRole().toString())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();
            ResponseCookie authCookie = ResponseCookie.from("auth", optionalManager.get().getAuth())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();
            ResponseCookie nicknameCookie = ResponseCookie.from("adminNickname", URLEncoder.encode(optionalManager.get().getAdminNickname(), "UTF-8"))
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();

            response.addCookie(cookie);
            response.addHeader(HttpHeaders.SET_COOKIE, adminIdCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, roleCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, authCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, nicknameCookie.toString());

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

    public List<ResponseManagerDto> getList(Pageable pageable) {
        Page<Manager> all = managerRepository.findAll(pageable);
        List<ResponseManagerDto> result = new ArrayList<>();
        for(Manager manager : all) {
            result.add(new ResponseManagerDto(manager));
        }

        return result;
    }

    public ResponseManagerDto findByAdminID(String adminId) {
        return new ResponseManagerDto(managerRepository.findByAdminId(adminId).orElseThrow(NotExistMemberException::new));
    }

    public Long getCount() {
        return managerRepository.count()/10;
    }


    // 메니저 업데이트
    public void updateManager(RequestManagerDto managerDto) {
        Manager updateManager = managerRepository.findByAdminId(managerDto.getAdminId()).orElseThrow(NotExistMemberException::new);
        updateManager.setAdminName(managerDto.getAdminName());
        updateManager.setAdminNickname(managerDto.getAdminNickname());
        if(!managerDto.getPassword().isEmpty()) {
            updateManager.setPassword(passwordEncoder.encode(managerDto.getPassword()));
        }
        updateManager.setAuth(managerDto.getAuth());
    }

    public void updateDisActivationStatus(String[] admins) {
        for(String id : admins) {
            Manager findManager = managerRepository.findByAdminId(id).orElseThrow();
            findManager.setIsActive(false);
        }
    }

    public void updateActivationStatus(String[] admins) {
        for(String id : admins) {
            Manager findManager = managerRepository.findByAdminId(id).orElseThrow();
            findManager.setIsActive(true);
        }
    }
}
