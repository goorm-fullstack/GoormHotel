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

    @NotBlank
    private String mimeType; // 이미지 mimeType

    @NotBlank
    private byte[] data;

    @Builder(toBuilder = true)
    public RequestImageDto(String originFileName, String fileName, String filePath, String mimeType, @NotBlank byte[] data) {
        this.originFileName = originFileName;
        this.fileName = fileName;
        this.filePath = filePath;
        this.mimeType = mimeType;
        this.data = data;
    }

    // RequestImageDto 엔티티화
    public Image toEntity(){
        return Image.builder()
                .originFileName(originFileName)
                .fileName(fileName)
                .filePath(filePath)
                .mimeType(mimeType)
                .data(data)
                .build();
    }
}