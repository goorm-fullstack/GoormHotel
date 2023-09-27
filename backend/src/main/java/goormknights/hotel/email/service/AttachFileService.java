package goormknights.hotel.email.service;

import goormknights.hotel.email.dto.request.RequestAttachFileDto;
import goormknights.hotel.email.dto.response.ResponseAttachFileDto;
import goormknights.hotel.email.model.AttachFile;
import goormknights.hotel.email.repository.AttachFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AttachFileService {
    private final AttachFileRepository attachFileRepository;

    @Value("${file.path}")
    private String path;

    public ResponseAttachFileDto save(RequestAttachFileDto attachFile) {
        String originalFileName = attachFile.getFileName();
        String newFileName = UUID.randomUUID().toString()+"_"+originalFileName;
        AttachFile file = AttachFile.builder()
                .originalFileName(originalFileName)
                .newFileName(newFileName)
                .filePath(path)
                .build();

        attachFileRepository.save(file);
        return new ResponseAttachFileDto(file);
    }
}
