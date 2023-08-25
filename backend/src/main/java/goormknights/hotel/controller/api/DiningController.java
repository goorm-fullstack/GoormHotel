package goormknights.hotel.controller.api;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.response.ResponseDiningDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.service.DiningService;
import goormknights.hotel.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dinings")
@Slf4j
public class DiningController {

    private final DiningService diningService;
    private final ImageService imageService;

    // 다이닝 생성
    @PostMapping("/dining")
    public ResponseEntity<Object> uploadDining(@Validated @ModelAttribute RequestDiningDTO requestDiningDTO, @RequestParam MultipartFile img) throws IOException {

        RequestImageDTO requestImageDTO = imageService.convertToImageDTO(img);

        diningService.saveDining(requestDiningDTO, requestImageDTO);
        return ResponseEntity.ok().build();
    }

    //다이닝 수정
    @PutMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDTO> updateDining(@PathVariable String diningName, @Validated @ModelAttribute RequestDiningDTO requestDiningDTO, @RequestParam MultipartFile img) throws IOException {

        ResponseDiningDTO responseDiningDTO = diningService.modifyDining(diningName, requestDiningDTO, img).toResponseDiningDTO();

        return ResponseEntity.ok(responseDiningDTO);
    }

    // 다이닝 삭제
    @DeleteMapping("/dining/{diningName}")
    public ResponseEntity<Object> deleteDining(@PathVariable String diningName){
        diningService.deleteByDiningName(diningName);

        return ResponseEntity.ok().build();
    }

    // 다이닝 상품명을 통해 찾기
    @GetMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDTO> findOneDining(@PathVariable String diningName) {
        ResponseDiningDTO responseDiningDTO = diningService.findByDiningName(diningName).toResponseDiningDTO();
        log.info("diningName={}", diningName);

        return ResponseEntity.ok(responseDiningDTO);
    }

    // 전체 다이닝 찾기
    @GetMapping
    public ResponseEntity<List<ResponseDiningDTO>> findAllDining(){
        List<Dining> allDining = diningService.findAllDining("dining");
        List<ResponseDiningDTO> toResponseDTOList = new ArrayList<>();

        for (Dining dining : allDining) {
            toResponseDTOList.add(dining.toResponseDiningDTO());
        }

        return ResponseEntity.ok(toResponseDTOList);
    }
}
