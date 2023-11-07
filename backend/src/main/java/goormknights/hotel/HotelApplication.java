package goormknights.hotel;

import goormknights.hotel.item.repository.DiningRepository;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@RequiredArgsConstructor
public class HotelApplication {
    private final DiningRepository diningRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(HotelApplication.class, args);
    }

    @PostConstruct
    void init() {
        // Dining dining = Dining.builder()
        // 		.name("test")
        // 		.price(1000)
        // 		.capacity(4)
        // 		.description("test")
        // 		.priceAdult(1000)
        // 		.priceChildren(100)
        // 		.spare(4)
        // 		.spareAdult(1)
        // 		.spareChildren(1)
        // 		.type("dining")
        // 		.typeDetail("dining")
        // 		.build();

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
        // 	diningRepository.save(dining);
    }
}
