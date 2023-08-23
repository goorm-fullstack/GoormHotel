package goormknights.hotel.service;

import goormknights.hotel.exception.AlreadyExistsEmailException;
import goormknights.hotel.model.Member;
import goormknights.hotel.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(Signup signup) {
        Optional<Member> memberOptional = memberRepository.findByEmail(signup.getEmail());
        if (memberOptional.isPresent()) {
            throw new AlreadyExistsEmailException();
        }

        String encryptedPassword = passwordEncoder.encode(signup.getPassword());
        var member = Member.builder()
                .name(signup.getName())
                .email(signup.getEmail())
                .password(encryptedPassword)
                .build();
        memberRepository.save(member); // 회원 정보 저장
    }
}
