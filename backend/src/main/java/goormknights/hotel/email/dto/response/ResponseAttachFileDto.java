package goormknights.hotel.email.dto.response;

import goormknights.hotel.email.model.AttachFile;
import lombok.Data;

@Data
public class ResponseAttachFileDto {
    private Long id;
    private String originalFileName;//원본 파일 명
    private String newFileName;//새로운 파일 이름
    private String filePath;//저장된 경로

    public ResponseAttachFileDto(AttachFile attachFile) {
        id = attachFile.getId();
        originalFileName = attachFile.getOriginalFileName();
        newFileName = attachFile.getNewFileName();
        filePath = attachFile.getFilePath();
    }
}
