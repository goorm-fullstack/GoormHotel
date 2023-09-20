package goormknights.hotel.item.model;

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
@Where(clause = "DELETED = false")
@SQLDelete(sql = "UPDATE image SET deleted = true WHERE image_id = ?")
public class Image {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IMAGE_ID")
    private Long id;

    @Column(nullable = false)
    private String originFileName; // 원래 파일 명

    @Column(nullable = false)
    private String fileName; // 서버에서 관리할 이미지 명

    @Column(nullable = false)
    private String filePath; // 서버의 이미지 경로

    @Column(nullable = false)
    private String mimeType; // 이미지 mimeType

    @Column(nullable = false)
    @Lob
    private byte[] data;

    @Column(nullable = false)
    private boolean deleted = false; // soft delete 여부 구분

    @Builder(toBuilder = true)
    public Image(String originFileName, String fileName, String filePath, String mimeType, byte[] data) {
        this.originFileName = originFileName;
        this.fileName = fileName;
        this.filePath = filePath;
        this.mimeType = mimeType;
        this.data = data;
    }
}
