package goormknights.hotel.email.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

/**
 * 첨부 파일 엔티티
 * 파일을 직접 DB에 넣는 짓은 하지 마세요~
 */
@Entity
@Getter
public class AttachFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalFileName;//원본 파일 명
    private String newFileName;//새로운 파일 이름
    private String filePath;//저장된 경로

    @Builder
    public AttachFile(Long id, String originalFileName, String newFileName, String filePath) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.newFileName = newFileName;
        this.filePath = filePath;
    }
}
