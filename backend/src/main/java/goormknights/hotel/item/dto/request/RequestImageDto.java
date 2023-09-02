package goormknights.hotel.item.dto.request;

import goormknights.hotel.item.model.Image;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestImageDto {

    @NotBlank
    private String originFileName; // 원래 파일 명

    @NotBlank
    private String fileName; // 서버에서 관리할 이미지 명

    @NotBlank
    private String filePath; // 서버의 이미지 경로

    @Builder(toBuilder = true)
    public RequestImageDto(String originFileName, String fileName, String filePath) {
        this.originFileName = originFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    // RequestImageDTO 엔티티화
    public Image toEntity(){
        return Image.builder()
                .originFileName(originFileName)
                .fileName(fileName)
                .filePath(filePath)
                .build();
    }
}
