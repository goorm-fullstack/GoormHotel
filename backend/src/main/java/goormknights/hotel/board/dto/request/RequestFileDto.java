package goormknights.hotel.board.dto.request;

import goormknights.hotel.board.model.BoardFile;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestFileDto {

    private String originalboardFileName;  //원래 이미지 이름

    private String boardFileName;          //새로운 이미지 이름

    private String boardFilePath;          //이미지 저장 경로

    private String mimeType;

    private byte[] data;

    @Builder(toBuilder = true)
    public RequestFileDto(String originalboardFileName, String boardFileName, String boardFilePath, String mimeType, byte[] data) {
        this.originalboardFileName = originalboardFileName;
        this.boardFileName = boardFileName;
        this.boardFilePath = boardFilePath;
        this.mimeType = mimeType;
        this.data = data;
    }

    public BoardFile toEntity() {
        return BoardFile.builder()
                .originalboardFileName(originalboardFileName)
                .boardFileName(boardFileName)
                .boardFilePath(boardFilePath)
                .mimeType(mimeType)
                .data(data)
                .build();
    }
}
