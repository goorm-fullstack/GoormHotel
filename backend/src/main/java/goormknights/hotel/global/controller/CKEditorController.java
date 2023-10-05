package goormknights.hotel.global.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.codec.binary.Base64;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * 리액트 CKEditor에서 처리가 필요한 로직이 둘어있습니다.
 */
@RestController
@RequestMapping("/ckeditor")
public class CKEditorController {

    @Value("${file.upload}")
    private String path;

    private String location = "/mail/upload/img/";

    @PostMapping("/upload/img")
    public ResponseEntity<String> imgUpload(@RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            // 업로드된 파일을 지정된 디렉토리에 저장
            String fileName = file.getOriginalFilename();
            String newFileName = UUID.randomUUID().toString()+fileName;
            File destinationFile = new File(path + newFileName);
            file.transferTo(destinationFile);

            //바이트 단위로 이미지를 디코딩
            byte[] bytes = java.nio.file.Files.readAllBytes(destinationFile.toPath());
            String base64Image = Base64.encodeBase64String(bytes);

            // 클라이언트에게 업로드 성공 메시지 전송
            return ResponseEntity.ok("data:image/png;base64,"+base64Image);
        } catch (IOException e) {
            e.printStackTrace();
            // 업로드 실패 시 에러 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
}
