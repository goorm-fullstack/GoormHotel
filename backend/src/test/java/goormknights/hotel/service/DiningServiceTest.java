package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Image;
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
        RequestDiningDTO requestDiningDTO = RequestDiningDTO.builder()
                .price(100000)
                .type("dining")
                .name("diningService")
                .useTime("13 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        RequestDiningDTO requestDiningDTO2 = RequestDiningDTO.builder()
                .price(200000)
                .type("dining2")
                .name("diningService2")
                .useTime("13 : 002")
                .priceAdult(300002)
                .priceChild(100002)
                .typeDetail("detail2")
                .build();
        RequestImageDTO requestImageDTO2 = RequestImageDTO.builder()
                .originFileName("hello2")
                .fileName("hi2")
                .filePath("here2")
                .build();

        String diningName = diningService.saveDining(requestDiningDTO, requestImageDTO);
        diningService.saveDining(requestDiningDTO2, requestImageDTO2);

        Dining createdDining = diningService.findByDiningName(diningName);

        assertThat(createdDining.getName()).isEqualTo("diningService");
        assertThat(createdDining.getThumbnail().getFileName()).isEqualTo("hi");
    }

    @Test
    void deleteDining() {

        RequestDiningDTO modifyDiningDTO = RequestDiningDTO.builder()
                .price(200000)
                .type("dining")
                .name("diningService")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDTO modifyImageDTO = RequestImageDTO.builder()
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

        RequestDiningDTO modifyDiningDTO = RequestDiningDTO.builder()
                .price(200000)
                .type("dining")
                .name("oh")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDTO modifyImageDTO = RequestImageDTO.builder()
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

        RequestDiningDTO modifyDiningDTO = RequestDiningDTO.builder()
                .price(200000)
                .type("dining")
                .name("oh")
                .useTime("15 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();

        RequestImageDTO modifyImageDTO = RequestImageDTO.builder()
                .originFileName("hi")
                .fileName("hello")
                .filePath("there")
                .build();

        diningService.saveDining(modifyDiningDTO, modifyImageDTO);

        List<Dining> allDining = diningService.findAllDining("dining");

        assertThat(allDining).hasSize(1);
    }
}