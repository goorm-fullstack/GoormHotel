package goormknights.hotel.member.service;

import goormknights.hotel.auth.service.RedisUtil;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.repository.EmailSender;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.global.exception.InvalidVerificationCodeException;
import goormknights.hotel.member.dto.request.AnonymousSignupDto;
import goormknights.hotel.member.dto.request.MemberEdit;
import goormknights.hotel.member.dto.request.SignupDTO;
import goormknights.hotel.member.dto.response.ResponseMemberDto;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.exception.NotExistMemberException;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.model.MemberEditor;
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

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationService verificationService;
    private final RedisUtil redisUtil;
    private final GiftCardRepository giftCardRepository;
    private final EmailSender emailSender;

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
    public void edit(Long id, MemberEdit memberEdit){
        Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFound::new);

        String encryptedPassword = passwordEncoder.encode(memberEdit.getPassword());

        MemberEditor.MemberEditorBuilder editorBuilder = member.toEditor();
        MemberEditor memberEditor = editorBuilder
                .name(memberEdit.getName())
                .email(memberEdit.getEmail())
                .memberId(memberEdit.getMemberId())
                .password(encryptedPassword)
                .phoneNumber(memberEdit.getPhoneNumber())
                .birth(memberEdit.getBirth())
                .gender(memberEdit.getGender())
                .build();

        member.edit(memberEditor);
    }

    // 이메일 코드 인증
    public boolean verifyCode(String email, String code) {
        String savedCode = redisUtil.getData(email);
        log.info("Saved code from Redis: {}", savedCode);
        log.info("Code from request: {}", code);
        return code.equals(savedCode);
    }

    // 회원 아이디 찾기
    public String findMemberId(String name, String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent() && memberOptional.get().getName().equals(name)) {
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(email)
                    .subject("[GoormHotel] 아이디 찾기 인증 코드")
                    .build();
            emailSender.sendMemberMail(emailMessage, "findIdandPassword");
            return memberOptional.get().getMemberId();
        } else {
            throw new MemberNotFound();  // 적절한 예외 처리
        }
    }

    // 회원 비밀번호 찾기
    public String findPassword(String name, String email, String memberId) {
        Optional<Member> memberOptional = memberRepository.findByEmailAndMemberIdAndName(email, memberId, name);
        if (memberOptional.isPresent()) {
            String token = verificationService.generateAndSaveToken(email);
            String resetLink = "http://localhost:8080/reset-password?token=" + token;
            EmailMessage emailMessage = EmailMessage.builder()
                    .to(email)
                    .subject("[GoormHotel] 비밀번호 찾기 인증 코드")
                    .token(token)
                    .resetLink(resetLink)
                    .build();
            emailSender.sendMemberMail(emailMessage, "findIdandPassword");
            return token;
        } else {
            throw new MemberNotFound();  // 적절한 예외 처리
        }
    }

    // 패스워드 업데이트
    public void updatePassword(String email, String newPassword) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String encodedPassword = passwordEncoder.encode(newPassword);
            member.setPassword(encodedPassword);
            memberRepository.save(member);
        } else {
            throw new MemberNotFound();
        }
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

    public boolean annoymousLogin(String memberId, String phoneNumber, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("member") != null) {
            // 이미 로그인한 상태
            return false;
        }

        Optional<Member> optionalMember = memberRepository.findByMemberIdAndPhoneNumberAndRole(memberId, phoneNumber, Role.ANONYMOUS.toString());
        if (optionalMember.isPresent()) {
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
    public void registrationGiftCard(long memberId, String code) {
        GiftCard giftCard = giftCardRepository.findByUuid(code).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품권입니다"));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("존재하지 않는 사용자입니다"));
        member.getGiftCardList().add(giftCard);
    }

    // 블랙리스트 차단합니다.
    public void setBlackList(Long id) {
        Member blackMember = memberRepository.findById(id).orElseThrow(MemberNotFound::new);
        blackMember.setRole(Role.BLACKED);
    }

    public void setBlackList(List<Long> ids) {
        for(Long id : ids) {
            Member blackMember = memberRepository.findById(id).orElseThrow(MemberNotFound::new);
            blackMember.setRole(Role.BLACKED);
        }
    }

    public List<ResponseMemberDto> getMemberList(Pageable pageable) {
        Page<Member> memberPage = memberRepository.findAll(pageable);
        List<ResponseMemberDto> result = new ArrayList<>();

        for(Member member : memberPage) {
            result.add(new ResponseMemberDto(member));
        }

        return result;
    }

    public Long getCount() {
        return memberRepository.count() / 10;
    }
    
    // 블랙 해제
    public void setUnBlacked(List<Long> ids) {
        for(Long id : ids) {
            Member blackMember = memberRepository.findById(id).orElseThrow(MemberNotFound::new);
            blackMember.setRole(Role.USER);
        }
    }

    // 임의의 아이디를 만들어서 비회원 아이디에 저장하고, 저장된 아이디 반환
    public void anonymousSignup(AnonymousSignupDto signupDTO, String code, HttpServletRequest request, HttpServletResponse response) {
        if (!verifyCode(signupDTO.getEmail(), code)) {
            throw new InvalidVerificationCodeException();
        }

        String randomId = generatedRandomID();

        while (memberRepository.existsByMemberId(randomId)) {
            randomId = generatedRandomID();//중복된 비회원 아이디라면 다시 생성한다.
        }

        var member = Member.builder()
                .name(signupDTO.getName())
                .email(signupDTO.getEmail())
                .memberId(randomId)
                .phoneNumber(signupDTO.getPhoneNumber())
                .privacyCheck(true)
                .birth(signupDTO.getBirth())
                .grade("Anonymous")
                .gender(signupDTO.getGender())
                .role(Role.ANONYMOUS)
                .mailAuth(true)
                .build();
        Member saveMember = memberRepository.save(member);// 회원 정보 저장

        HttpSession session = request.getSession();
        session = request.getSession();
        session.setAttribute("memberId", saveMember.getMemberId());
        session.setAttribute("role", saveMember.getRole());

        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setMaxAge(10);
        cookie.setPath("/");
        cookie.setSecure(true);

        ResponseCookie memberIdCookie = ResponseCookie.from("memberId", saveMember.getMemberId())
                .httpOnly(false)
                .secure(true)
                .path("/")      // path
                .maxAge(3600)
                .sameSite("None")  // sameSite
                .build();

        ResponseCookie roleCookie = ResponseCookie.from("role", saveMember.getRole().toString())
                .httpOnly(false)
                .secure(true)
                .path("/")      // path
                .maxAge(3600)
                .sameSite("None")  // sameSite
                .build();

        response.addCookie(cookie);
        response.addHeader(HttpHeaders.SET_COOKIE, memberIdCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, roleCookie.toString());
    }

    public String generatedRandomID() {
        int length = 16;
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for(int i = 0; i < length; i++) {
            int num = random.nextInt(10);
            sb.append(num);
        }

        return sb.toString();
    }

    public ResponseMemberDto findByMemberId(String id) {
        Optional<Member> member = memberRepository.findByMemberId(id);
        if(member.isEmpty()) {
            throw new MemberNotFound();
        }
        return new ResponseMemberDto(member.get());
    }
}
