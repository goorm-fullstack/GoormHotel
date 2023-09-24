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
@Where(clause = "board_Image_Delete = false")
@SQLDelete(sql = "UPDATE board_image SET board_image_delete = true WHERE board_image_id = ?")
public class BoardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;

    @Column(nullable = false)
    private String originalboardImageName;  //원래 이미지 이름

    @Column(nullable = false)
    private String boardImageName;      //변경된 이미지 이름

    @Column(nullable = false)
    private String boardImagePath;      //저장 경로

    @Column(nullable = false)
    //@Builder.Default
    private Boolean boardImageDelete = false;       //사진 softdelete

    @Column(nullable = false)
    private String mimeType;        //이미지 mimeType

    @Column(nullable = false)
    private byte[] data;

    @Builder(toBuilder = true)
    public BoardImage(String originalboardImageName, String boardImageName, String boardImagePath, String mimeType, byte[] data) {
        this.originalboardImageName = originalboardImageName;
        this.boardImageName = boardImageName;
        this.boardImagePath = boardImagePath;
        this.mimeType = mimeType;
        this.data = data;
    }

}
