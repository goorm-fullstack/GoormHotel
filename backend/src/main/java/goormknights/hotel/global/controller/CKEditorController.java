package goormknights.hotel.global.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 리액트 CKEditor에서 처리가 필요한 로직이 둘어있습니다.
 */
@RestController
@RequestMapping("/ckeditor")
public class CKEditorController {

    @Value("${file.upload}")
    private String path;

    @PostMapping("/upload/img")
    public ResponseEntity<String> imgUpload(@RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            // 업로드된 파일을 지정된 디렉토리에 저장
            String fileName = file.getOriginalFilename();
            File destinationFile = new File(path + File.separator + fileName);
            file.transferTo(destinationFile);

            // 여기서 파일 정보를 데이터베이스에 저장할 수 있음 (옵션)

            // 클라이언트에게 업로드 성공 메시지 전송
            return ResponseEntity.ok(destinationFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            // 업로드 실패 시 에러 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
}
