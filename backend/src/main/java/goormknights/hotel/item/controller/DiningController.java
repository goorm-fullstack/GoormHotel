package goormknights.hotel.item.controller;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.response.ResponseDiningDto;
import goormknights.hotel.item.exception.DuplicatedItemNameException;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.service.DiningService;
import goormknights.hotel.item.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

    /**
     * 다이닝 생성
     * @param requestDiningDto - 다이닝 생성 정보
     * @param img - 이미지
     * @return 다이닝 생성 완료시 status 200
     * @throws IOException
     */
    @PostMapping("/dining")
    public ResponseEntity<Object> uploadDining(@Validated @ModelAttribute RequestDiningDto requestDiningDto, @RequestParam MultipartFile img, BindingResult bindingResult) throws IOException {

        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        else{
            RequestImageDto requestImageDto = imageService.convertToImageDto(img);

            diningService.saveDining(requestDiningDto, requestImageDto);
            return ResponseEntity.ok().build();
        }
    }

    /**
     * 다이닝 수정
     * @param diningName - 다이닝 상품 이름
     * @param requestDiningDto - 수정된 정보
     * @param img - 수정된 이미지
     * @return 수정된 다이닝
     * @throws IOException
     */
    @PutMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDto> updateDining(@PathVariable String diningName, @Validated @ModelAttribute RequestDiningDto requestDiningDto, @RequestParam(required = false) MultipartFile img, BindingResult bindingResult) throws IOException {

        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }else{
            ResponseDiningDto responseDiningDto = diningService.modifyDining(diningName, requestDiningDto, img).toResponseDiningDto();

            return ResponseEntity.ok(responseDiningDto);
        }
    }

    /**
     * 다이닝 삭제(소프트 딜리트)
     * @param diningName - 다이닝 상품 이름
     * @return 삭제 완료시 status 200
     */
    @DeleteMapping("/dining/{diningName}")
    public ResponseEntity<Object> deleteDining(@PathVariable String diningName){
        diningService.deleteByDiningName(diningName);

        return ResponseEntity.ok().build();
    }

    /**
     * 다이닝 상품명을 통해 다이닝 조회
     * @param diningName - 다이닝 상품 이름
     * @return 조회된 다이닝
     */
    @GetMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDto> findOneDining(@PathVariable String diningName) {
        ResponseDiningDto responseDiningDto = diningService.findByDiningName(diningName).toResponseDiningDto();
        log.info("diningName={}", diningName);

        return ResponseEntity.ok(responseDiningDto);
    }

    /**
     * 페이징된 전체 다이닝 조회
     * @param pageable - 페이징
     * @return 페이징된 전체 다이닝 리스트
     * 요청 파라미터에 size(불러올 데이터 양)와 page(현재 페이지) 작성 가능
     * 예) /dinings?size=20&page=1
     */
    @GetMapping
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    public ResponseEntity<List<ResponseDiningDto>> findAllDining(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC)Pageable pageable){
        Page<Dining> allDining = diningService.findAllDining(pageable);
        List<ResponseDiningDto> responseDtoList = diningService.toResponseDtoList(allDining);

        int totalPages = allDining.getTotalPages();
        long totalData = allDining.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalData))
                .body(responseDtoList);
    }

    @GetMapping("/check")
    public ResponseEntity<String> existsByDiningName(@RequestParam String diningName){
        log.info("diningName={}", diningName);

        if(diningService.existsByName(diningName)){
            String message = new DuplicatedItemNameException("중복된 상품명입니다.").getMessage();
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }else{
            return ResponseEntity.ok("사용 가능한 상품명입니다.");
        }
    }
}
