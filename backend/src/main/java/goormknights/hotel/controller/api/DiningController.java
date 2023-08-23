package goormknights.hotel.controller.api;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Item;
import goormknights.hotel.service.DiningService;
import goormknights.hotel.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dinings")
public class DiningController {

    private final DiningService diningService;
    private final ImageService imageService;

    @PostMapping("/dining")
    public ResponseEntity<Object> uploadDining(@RequestPart RequestDiningDTO requestDiningDTO, @RequestParam MultipartFile img) throws IOException {
        RequestImageDTO requestImageDTO = imageService.convertToImageDTO(img);

        diningService.saveDining(requestDiningDTO, requestImageDTO);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/dining/{diningId}")
//    public Item findOneDining(@PathVariable Long diningId) throws Exception {
//        return diningService.findById(diningId);
//    }
}
