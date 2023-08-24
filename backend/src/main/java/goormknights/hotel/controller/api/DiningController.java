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

@RestController
@RequiredArgsConstructor
@RequestMapping("/dinings")
@Slf4j
public class DiningController {

    private final DiningService diningService;
    private final ImageService imageService;

    @PostMapping("/dining")
    public ResponseEntity<Object> uploadDining(@Validated @ModelAttribute RequestDiningDTO requestDiningDTO, @RequestParam MultipartFile img) throws IOException {

        RequestImageDTO requestImageDTO = imageService.convertToImageDTO(img);
        log.info("requestImageDTO={}", requestImageDTO);

        diningService.saveDining(requestDiningDTO, requestImageDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDTO> updateDining(@PathVariable String diningName, @Validated @ModelAttribute RequestDiningDTO requestDiningDTO, @RequestParam MultipartFile img) throws IOException {
        RequestImageDTO requestImageDTO = null;
        if(img != null) requestImageDTO = imageService.convertToImageDTO(img);
        log.info("requestDiningDTO={}", requestDiningDTO);
        log.info("requestImageDTO={}", requestImageDTO);

        ResponseDiningDTO responseDiningDTO = diningService.modifyDining(diningName, requestDiningDTO, requestImageDTO).toResponseDiningDTO();
        log.info("responseDiningDTO={}", responseDiningDTO);

        return ResponseEntity.ok(responseDiningDTO);
    }

    @DeleteMapping("/dining/{diningName}")
    public ResponseEntity<Object> deleteDining(@PathVariable String diningName){
        diningService.deleteByDiningName(diningName);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/dining/{diningName}")
    public ResponseEntity<ResponseDiningDTO> findOneDining(@PathVariable String diningName) {

        ResponseDiningDTO responseDiningDTO = diningService.findByDiningName(diningName).toResponseDiningDTO();
        log.info("diningName={}", diningName);
        log.info("responseDiningDTO={}", responseDiningDTO);

        return ResponseEntity.ok(responseDiningDTO);
    }
}
