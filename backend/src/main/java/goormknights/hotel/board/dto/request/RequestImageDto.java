package goormknights.hotel.board.dto.request;

import goormknights.hotel.board.model.BoardImage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestImageDto {

    private String originalboardImageName;  //원래 이미지 이름

    private String boardImageName;          //새로운 이미지 이름

    private String boardImagePath;          //이미지 저장 경로

    private String mimeType;

    private byte[] data;

    @Builder(toBuilder = true)
    public RequestImageDto(String originalboardImageName, String boardImageName, String boardImagePath, String mimeType, byte[] data) {
        this.originalboardImageName = originalboardImageName;
        this.boardImageName = boardImageName;
        this.boardImagePath = boardImagePath;
        this.mimeType = mimeType;
        this.data = data;
    }

    public BoardImage toEntity() {
        return BoardImage.builder()
                .originalboardImageName(originalboardImageName)
                .boardImageName(boardImageName)
                .boardImagePath(boardImagePath)
                .mimeType(mimeType)
                .data(data)
                .build();
    }

}