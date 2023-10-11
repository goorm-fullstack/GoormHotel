package goormknights.hotel.member.service;

import goormknights.hotel.auth.service.RedisUtil;
import goormknights.hotel.email.repository.EmailSender;
import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.global.exception.InvalidVerificationCodeException;
import goormknights.hotel.member.dto.request.*;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.model.MemberEditor;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationService verificationService;
    private final RedisUtil redisUtil;
    private final GiftCardRepository giftCardRepository;
    private final EmailSender emailSender;
    private final EmailService emailService;

    // 멤버 가입 및 저장
    public void signup(SignupDTO signupDTO, String code) {

        if (!verifyCode(signupDTO.getEmail(), code)) {
            throw new InvalidVerificationCodeException();
        }

        Optional<Member> memberOptional = memberRepository.findByEmail(signupDTO.getEmail());
        if (memberOptional.isPresent()) {
            throw new AlreadyExistsEmailException();
        }

        String encryptedPassword = passwordEncoder.encode(signupDTO.getPassword());

        var member = Member.builder()
                .name(signupDTO.getName())
                .email(signupDTO.getEmail())
                .memberId(signupDTO.getMemberId())
                .password(encryptedPassword)
                .phoneNumber(signupDTO.getPhoneNumber())
                .privacyCheck(true)
                .birth(signupDTO.getBirth())
                .grade("Bronze")
                .gender(signupDTO.getGender())
                .role(Role.USER)
                .mailAuth(true)
                .build();
        memberRepository.save(member); // 회원 정보 저장
    }

    // 회원 정보 수정
    @Transactional
    public void edit(Long id, MemberEditDTO memberEditDTO){
        Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFound::new);

        String encryptedPassword = passwordEncoder.encode(memberEditDTO.getPassword());

        MemberEditor.MemberEditorBuilder editorBuilder = member.toEditor();
        MemberEditor memberEditor = editorBuilder
                .name(memberEditDTO.getName())
                .email(memberEditDTO.getEmail())
                .memberId(memberEditDTO.getMemberId())
                .password(encryptedPassword)
                .phoneNumber(memberEditDTO.getPhoneNumber())
                .birth(memberEditDTO.getBirth())
                .gender(memberEditDTO.getGender())
                .build();

        member.edit(memberEditor);
    }

    // 패스워드 리셋
    @Transactional
    public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
        String resetToken = resetPasswordDTO.getResetToken();
        String newPassword = resetPasswordDTO.getNewPassword();

        String email = redisUtil.getData(resetToken);
        if (email == null) {
            throw new InvalidVerificationCodeException();
        }

        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isEmpty()) {
            throw new MemberNotFound();
        }

        Member member = memberOptional.get();
        String encryptedPassword = passwordEncoder.encode(newPassword);
        member.setPassword(encryptedPassword);

        redisUtil.deleteData(resetToken);
    }

    // 이메일 코드 인증
    public boolean verifyCode(String email, String code) {
        String savedCode = redisUtil.getData(email);
        log.info("Saved code from Redis: {}", savedCode);
        log.info("Code from request: {}", code);
        return code.equals(savedCode);
    }

    // 아이디 찾기 최종
    public String findMemberId(FindMemberIdDTO findMemberIdDTO, String code) {
        if (!verifyCode(findMemberIdDTO.getEmail(), code)) {
            throw new InvalidVerificationCodeException();
        }

        Optional<Member> memberOptional = memberRepository.findByEmail(findMemberIdDTO.getEmail());
        if (memberOptional.isEmpty()) {
            throw new MemberNotFound();
        }
        return memberOptional.get().getMemberId();
    }

    // 비밀번호 찾기 최종
    public String findMemberPw(FindPasswordDTO findPasswordDTO, String code) {
        if (!verifyCode(findPasswordDTO.getEmail(), code)) {
            throw new InvalidVerificationCodeException();
        }

        Optional<Member> memberOptional = memberRepository.findByEmail(findPasswordDTO.getEmail());
        if (memberOptional.isEmpty()) {
            throw new MemberNotFound();
        }
        String resetToken = UUID.randomUUID().toString();
        // 레디스에 토큰과 이메일 저장
        redisUtil.setDataExpire(resetToken, findPasswordDTO.getEmail(), 600); // 10분 동안 유효
        return resetToken;
    }

    // 아이디를 찾았다면 memberId를 리턴
    public String getMemberIdByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(Member::getMemberId)
                .orElseThrow(MemberNotFound::new);
    }


    // 멤버 로그인
    public boolean memberLogin(String memberId, String password, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("member") != null) {
            // 이미 로그인한 상태
            return false;
        }

        Optional<Member> optionalMember = memberRepository.findByMemberId(memberId);
        if (optionalMember.isPresent() && passwordEncoder.matches(password, optionalMember.get().getPassword())) {
            session = request.getSession();
            session.setAttribute("memberId", optionalMember.get().getMemberId());
            session.setAttribute("role", optionalMember.get().getRole());

            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(10);
            cookie.setPath("/");
            cookie.setSecure(true);

            ResponseCookie memberIdCookie = ResponseCookie.from("memberId", optionalMember.get().getMemberId())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();
            ResponseCookie roleCookie = ResponseCookie.from("role", optionalMember.get().getRole().toString())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();

            response.addCookie(cookie);
            response.addHeader(HttpHeaders.SET_COOKIE, memberIdCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, roleCookie.toString());
            return true;
        }
        return false;
    }

    // ======================= 위까지 민종님 작업물 ============================



    public void save(Member member) {
        memberRepository.save(member);
    }

    public Member findById(Long id) {
        return memberRepository.findById(id).orElseThrow();
    }

    // 상품권 등록
    public void registrationGiftCard(int memberId, String code) {
        GiftCard giftCard = giftCardRepository.findByUuid(code).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품권입니다"));
//        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("존재하지 않는 사용자입니다"));
//        member.getGiftCardList().add(giftCard);
    }

    // 블랙리스트 차단합니다.
    public void setBlackList(Long id) {
        Member blackMember = memberRepository.findById(id).orElseThrow(MemberNotFound::new);
        blackMember.setRole(Role.BLACKED);
    }

}
