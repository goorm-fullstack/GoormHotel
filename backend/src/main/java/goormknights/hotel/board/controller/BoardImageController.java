package goormknights.hotel.board.controller;

import goormknights.hotel.board.service.BoardImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BoardImageController {

    private final BoardImageService boardImageService;

    @GetMapping("/boards/image/{boardId}")
    public ResponseEntity<Object> image(@PathVariable Long boardId){
        byte[] data = boardImageService.getByteImage(boardId);
        String mimeType = boardImageService.getMimeTypeImage(boardId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .body(data);
    }
}
