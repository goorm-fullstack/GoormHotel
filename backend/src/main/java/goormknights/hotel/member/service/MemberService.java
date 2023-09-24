package goormknights.hotel.member.service;

import goormknights.hotel.auth.service.RedisUtil;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.repository.EmailSender;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.exception.AlreadyExistsEmailException;
import goormknights.hotel.global.exception.InvalidVerificationCodeException;
import goormknights.hotel.member.dto.request.MemberEdit;
import goormknights.hotel.member.dto.request.Signup;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.model.MemberEditor;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

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

    // 멤버 가입 및 저장
    public void signup(Signup signup, String code) {

        if (!verifyCode(signup.getEmail(), code)) {
            throw new InvalidVerificationCodeException();
        }

        Optional<Member> memberOptional = memberRepository.findByEmail(signup.getEmail());
        if (memberOptional.isPresent()) {
            throw new AlreadyExistsEmailException();
        }

        String encryptedPassword = passwordEncoder.encode(signup.getPassword());

        var member = Member.builder()
                .name(signup.getName())
                .email(signup.getEmail())
                .memberId(signup.getMemberId())
                .password(encryptedPassword)
                .phoneNumber(signup.getPhoneNumber())
                .privacyCheck(signup.getPrivacyCheck())
                .birth(signup.getBirth())
                .grade(signup.getGrade())
                .gender(signup.getGender())
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


    // 로그인
    public String login(String memberId, String rawPassword, HttpSession session) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new UsernameNotFoundException("해당되는 회원이 없습니다"));

        if (passwordEncoder.matches(rawPassword, member.getPassword())) {
            session.setAttribute("member", member);
            return "로그인 완료";
        } else {
            throw new BadCredentialsException("비밀번호가 다릅니다");
        }
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
}
