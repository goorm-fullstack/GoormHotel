package goormknights.hotel.item.controller;

import goormknights.hotel.item.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    // 이미지 바이트어레이로 전달 api
    @GetMapping("/image/{itemName}")
    public ResponseEntity<Object> image(@PathVariable String itemName) {
        byte[] data = imageService.getByteImage(itemName);
        String mimeType = imageService.getMimeTypeImage(itemName);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .body(data);
    }
}
