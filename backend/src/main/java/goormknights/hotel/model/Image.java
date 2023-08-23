package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originFileName; // 원래 파일 명

    @Column(nullable = false)
    private String fileName; // 서버에서 관리할 이미지 명

    @Column(nullable = false)
    private String filePath; // 서버의 이미지 경로

    @Builder
    public Image(String originFileName, String fileName, String filePath) {
        this.originFileName = originFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
