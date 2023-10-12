package goormknights.hotel;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@RequiredArgsConstructor
public class HotelApplication {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(HotelApplication.class, args);
	}

//	@PostConstruct
//	void init() {
//		Member member = Member.builder()
//				.memberId("test")
//				.email("test@test.com")
//				.grade("Bronze")
//				.password(passwordEncoder.encode("1234"))
//				.name("test")
//				.phoneNumber("test")
//				.birth(LocalDate.now())
//				.gender("M")
//				.mailAuth(true)
//				.role(Role.USER)
//				.build();
//		memberRepository.save(member);
//
//	}
}
