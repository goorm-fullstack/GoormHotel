package goormknights.hotel.subscribe;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class initMemberData {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    void initData() {
        Member member = Member.builder()
                .email("9rudrb40@naver.com")
                .memberId("yss1902")
                .password(passwordEncoder.encode("1234"))
                .name("테스터")
                .grade("Bronze")
                .phoneNumber("00000000")
                .privacyCheck(true)
                .birth(LocalDate.now())
                .gender("Male")
                .build();

        memberRepository.save(member);
    }
}

