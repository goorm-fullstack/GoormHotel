package goormknights.hotel.service;

import goormknights.hotel.model.Dining;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class DiningServiceTest {

    @Autowired
    private DiningService diningService;

    @Test
    void saveDining() {
        Dining build = Dining.builder()
                .diningName("diningRoom")
                .diningType("helloType")
                .adultCount(3)
                .price(140000)
                .childCount(3)
                .useTime("13 : 00")
                .priceAdult(30000)
                .priceChild(25000)
                .build();
        diningService.saveDining(build);
    }
}