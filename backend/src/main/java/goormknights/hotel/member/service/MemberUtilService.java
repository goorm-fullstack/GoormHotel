package goormknights.hotel.member.service;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberUtilService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void setTempPassword(String email, String tempPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));

        member.changePassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
    }

}