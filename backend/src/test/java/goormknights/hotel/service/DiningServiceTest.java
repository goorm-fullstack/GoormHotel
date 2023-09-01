package goormknights.hotel.service;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.service.DiningService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class DiningServiceTest {

    @Autowired
    private DiningService diningService;

    @Test
    void saveDining() {
        RequestDiningDto requestDiningDTO = RequestDiningDto.builder()
                .price(100000)
                .type("dining")
                .name("diningService")
                .useTime("13 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        RequestDiningDto requestDiningDto2 = RequestDiningDto.builder()
                .price(200000)
                .type("dining2")
                .name("diningService2")
                .useTime("13 : 002")
                .priceAdult(300002)
                .priceChild(100002)
                .typeDetail("detail2")
                .build();
        RequestImageDto requestImageDto2 = RequestImageDto.builder()
                .originFileName("hello2")
                .fileName("hi2")
                .filePath("here2")
                .build();

        String diningName = diningService.saveDining(requestDiningDTO, requestImageDTO);
        diningService.saveDining(requestDiningDto2, requestImageDto2);

        Dining createdDining = diningService.findByDiningName(diningName);

        assertThat(createdDining.getName()).isEqualTo("diningService");
        assertThat(createdDining.getThumbnail().getFileName()).isEqualTo("hi");
    }

    @Test
    void deleteDining() {

        RequestDiningDto modifyDiningDTO = RequestDiningDto.builder()
                .price(200000)
                .type("dining")
                .name("diningService")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDto modifyImageDTO = RequestImageDto.builder()
                .originFileName("hi")
                .fileName("hello")
                .filePath("there")
                .build();

        String diningName = diningService.saveDining(modifyDiningDTO, modifyImageDTO);

        diningService.deleteByDiningName(diningName);

        List<Dining> allDining = diningService.findAllDining("dining");

        assertThat(allDining).isEmpty();
    }

    @Test
    void findByDiningName() {

        RequestDiningDto modifyDiningDTO = RequestDiningDto.builder()
                .price(200000)
                .type("dining")
                .name("oh")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDto modifyImageDTO = RequestImageDto.builder()
                .originFileName("hi")
                .fileName("hello")
                .filePath("there")
                .build();

        String diningName = diningService.saveDining(modifyDiningDTO, modifyImageDTO);

        Dining findDining = diningService.findByDiningName(diningName);

        assertThat(findDining.getName()).isEqualTo("oh");
    }

    @Test
    void findAll() {

        RequestDiningDto modifyDiningDTO = RequestDiningDto.builder()
                .price(200000)
                .type("dining")
                .name("oh")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDto modifyImageDTO = RequestImageDto.builder()
                .originFileName("hi")
                .fileName("hello")
                .filePath("there")
                .build();

        diningService.saveDining(modifyDiningDTO, modifyImageDTO);

        List<Dining> allDining = diningService.findAllDining("dining");

        assertThat(allDining).hasSize(1);
    }
}