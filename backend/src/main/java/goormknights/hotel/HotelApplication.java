package goormknights.hotel;

import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.repository.DiningRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@RequiredArgsConstructor
public class HotelApplication {
	private final DiningRepository diningRepository;

	public static void main(String[] args) {
		SpringApplication.run(HotelApplication.class, args);
	}

	@PostConstruct
	void init() {
		Dining dining = Dining.builder()
				.name("test")
				.price(1000)
				.capacity(4)
				.description("test")
				.priceAdult(1000)
				.priceChildren(100)
				.spare(4)
				.spareAdult(1)
				.spareChildren(1)
				.type("dining")
				.typeDetail("dining")
				.build();

		diningRepository.save(dining);
	}
}
