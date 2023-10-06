package goormknights.hotel.board.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "board_File_Delete = false")
@SQLDelete(sql = "UPDATE board_file SET board_file_delete = true WHERE board_file_id = ?")
public class BoardFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardFileId;

    @Column(nullable = false)
    private String originalboardFileName;  //원래 파일 이름

    @Column(nullable = false)
    private String boardFileName;      //변경된 파일 이름

    @Column(nullable = false)
    private String boardFilePath;      //저장 경로

    @Column(nullable = false)
    //@Builder.Default
    private Boolean boardFileDelete = false;       //파일 softdelete

    @Column(nullable = false)
    private String mimeType;        //이미지 mimeType

    @Column(nullable = false)
    @Lob
    private byte[] data;

    @Builder(toBuilder = true)
    public BoardFile(String originalboardFileName, String boardFileName, String boardFilePath, String mimeType, byte[] data) {
        this.originalboardFileName = originalboardFileName;
        this.boardFileName = boardFileName;
        this.boardFilePath = boardFilePath;
        this.mimeType = mimeType;
        this.data = data;
    }
}
