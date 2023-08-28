package goormknights.hotel.service;

import goormknights.hotel.exception.AlreadyExistsEmailException;
import goormknights.hotel.exception.InvalidVerificationCodeException;
import goormknights.hotel.exception.MemberNotFound;
import goormknights.hotel.model.Member;
import goormknights.hotel.model.MemberEdit;
import goormknights.hotel.model.MemberEditor;
import goormknights.hotel.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisUtil redisUtil;

    public boolean verifyCode(String email, String code) {
        // Redis에서 이메일로 저장된 인증 코드를 가져옴
        String savedCode = redisUtil.getData(email);

        // 저장된 인증 코드와 입력된 코드가 일치하는지 확인
        return code.equals(savedCode);
    }


    public void signup(Signup signup, String code) {
        // 이메일과 인증 코드가 일치하는지 확인
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
                .mailAuth(true)
                .build();
        memberRepository.save(member); // 회원 정보 저장
    }

    @Transactional
    public void edit(Integer id, MemberEdit memberEdit){
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

    @Transactional
    public void SetTempPassword(String email, String tempPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));

        member.changePassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
    }

}
