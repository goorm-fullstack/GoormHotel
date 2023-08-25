package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestImageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

//  MultipartFile타입의 데이터를 RequestImageDTO로 변환
    public RequestImageDTO convertToImageDTO(MultipartFile img) throws IOException {
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        int millis = now.get(ChronoField.MILLI_OF_SECOND);

        String absolutePath = new File("c:\\InstagramCloneServer").getAbsoluteFile() + "\\";
        String newFileName = "image" + hour + minute + second + millis;
        String fileExtension = '.' + img.getOriginalFilename().replaceAll("^.*\\\\.(.*)$", "$1");
        String path = "images\\" + year + "\\" + month + "\\" + day;

        File file = new File(absolutePath + path);
        if (!file.exists()) file.mkdirs();

        file = new File(absolutePath + path + "\\" + newFileName + fileExtension);
        img.transferTo(file);

        return RequestImageDTO.builder()
                .originFileName(img.getOriginalFilename())
                .fileName(newFileName + fileExtension)
                .filePath(path)
                .build();
    }
}
