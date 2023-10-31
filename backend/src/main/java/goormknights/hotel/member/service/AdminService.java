package goormknights.hotel.member.service;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.member.dto.request.AdminSignupDTO;
import goormknights.hotel.member.dto.request.MemberEditAdminDTO;
import goormknights.hotel.member.dto.request.RequestManagerDto;
import goormknights.hotel.member.dto.response.MemberInfoDetailDTO;
import goormknights.hotel.member.dto.response.ResponseManagerDto;
import goormknights.hotel.member.exception.InvalidMemberException;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.exception.NotExistMemberException;
import goormknights.hotel.member.model.Manager;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.model.MemberEditor;
import goormknights.hotel.member.repository.ManagerRepository;
import goormknights.hotel.member.repository.MemberRepository;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final ManagerRepository managerRepository;
    private final MemberRepository memberRepository;

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
            // 계정이 비활성화 상태인 경우
            if (!optionalManager.get().getIsActive()) {
                throw new InvalidMemberException();
            }
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
                    .build();
            ResponseCookie roleCookie = ResponseCookie.from("role", optionalManager.get().getRole().toString())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .build();
            ResponseCookie authCookie = ResponseCookie.from("auth", optionalManager.get().getAuth())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .build();
            ResponseCookie nicknameCookie = ResponseCookie.from("adminNickname", URLEncoder.encode(optionalManager.get().getAdminNickname(), "UTF-8"))
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
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

    // 어드민 회원 상세 정보 얻기
    public MemberInfoDetailDTO memberInfoDetail(String memberId) throws Exception {
        Optional<Member> memberOptional = memberRepository.findByMemberId(memberId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            MemberInfoDetailDTO memberInfoDetailDTO = new MemberInfoDetailDTO();
            memberInfoDetailDTO.setName(member.getName());
            memberInfoDetailDTO.setEmail(member.getEmail());
            memberInfoDetailDTO.setGrade(member.getGrade());
            memberInfoDetailDTO.setPassword(member.getPassword());
            memberInfoDetailDTO.setPhoneNumber(member.getPhoneNumber());
            memberInfoDetailDTO.setBirth(member.getBirth());
            memberInfoDetailDTO.setGender(member.getGender());
            memberInfoDetailDTO.setMailAuth(member.getMailAuth());
            memberInfoDetailDTO.setSignupDate(member.getSignupDate());
            memberInfoDetailDTO.setRole(member.getRole());
            return memberInfoDetailDTO;
        } else {
            throw new Exception("회원이 없습니다");
        }
    }

    // 회원 정보 수정(어드민 버전)
    public void edit(String memberId, MemberEditAdminDTO memberEditAdminDTO){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(MemberNotFound::new);

        String encryptedPassword = memberEditAdminDTO.getPassword() != null ?
                passwordEncoder.encode(memberEditAdminDTO.getPassword()) :
                member.getPassword();

        MemberEditor.MemberEditorBuilder editorBuilder = member.toEditor();
        MemberEditor memberEditor = editorBuilder
                .name(memberEditAdminDTO.getName())
                .email(memberEditAdminDTO.getEmail())
                .memberId(memberEditAdminDTO.getMemberId())
                .password(encryptedPassword)
                .phoneNumber(memberEditAdminDTO.getPhoneNumber())
                .birth(memberEditAdminDTO.getBirth())
                .gender(memberEditAdminDTO.getGender())
                .grade(memberEditAdminDTO.getGrade())
                .build();

        member.edit(memberEditor);
        memberRepository.save(member);
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

    // 매니저의 회원 소프트 삭제
    public void softdeleteMember(String memberId){
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(MemberNotFound::new);

        LocalDateTime now = LocalDateTime.now();
        member.setMemberDeleteTime(now);
        memberRepository.save(member);
    }
}
