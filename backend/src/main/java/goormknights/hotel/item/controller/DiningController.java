package goormknights.hotel.item.controller;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.response.ResponseDiningDto;
import goormknights.hotel.item.service.DiningService;
import goormknights.hotel.item.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Object> uploadDining(@Validated @ModelAttribute RequestDiningDto requestDiningDto, @RequestParam MultipartFile img) throws IOException {

        RequestImageDto requestImageDto = imageService.convertToImageDto(img);

        diningService.saveDining(requestDiningDto, requestImageDto);
        return ResponseEntity.ok().build();
    }

    //다이닝 수정
    @PutMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDto> updateDining(@PathVariable String diningName, @Validated @ModelAttribute RequestDiningDto requestDiningDto, @RequestParam(required = false) MultipartFile img) throws IOException {

        ResponseDiningDto responseDiningDto = diningService.modifyDining(diningName, requestDiningDto, img).toResponseDiningDto();

        return ResponseEntity.ok(responseDiningDto);
    }

    // 다이닝 삭제
    @DeleteMapping("/dining/{diningName}")
    public ResponseEntity<Object> deleteDining(@PathVariable String diningName){
        diningService.deleteByDiningName(diningName);

        return ResponseEntity.ok().build();
    }

    // 다이닝 상품명을 통해 찾기
    @GetMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDto> findOneDining(@PathVariable String diningName) {
        ResponseDiningDto responseDiningDto = diningService.findByDiningName(diningName).toResponseDiningDto();
        log.info("diningName={}", diningName);

        return ResponseEntity.ok(responseDiningDto);
    }

    // 전체 다이닝 찾기(페이징)
    @GetMapping
    public ResponseEntity<List<ResponseDiningDto>> findAllDining(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC)Pageable pageable){
        Page<ResponseDiningDto> dining = diningService.findAllDining("dining", pageable);
        return ResponseEntity.ok(dining.getContent());
    }
}
