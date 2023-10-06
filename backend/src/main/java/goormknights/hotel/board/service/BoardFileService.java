package goormknights.hotel.board.service;

import goormknights.hotel.board.dto.request.RequestFileDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

@Service
@Transactional
public class BoardFileService {

    public RequestFileDto requestFileDto(MultipartFile boardFile) throws IOException {
        LocalDateTime localDateTime = LocalDateTime.now();
        int year = localDateTime.getYear();
        int month = localDateTime.getMonthValue();
        int day = localDateTime.getDayOfMonth();

        int hour = localDateTime.getHour();
        int min = localDateTime.getMinute();
        int sec = localDateTime.getSecond();
        int mil = localDateTime.get(ChronoField.MILLI_OF_SECOND);

        String absolutePath = new File("").getAbsolutePath() + "\\";      //파일을 저장할 경로 지정
        String newFileName = "file" + hour+min+sec+mil;
        String fileExtension = '.' + boardFile.getOriginalFilename().replaceAll("^.*\\\\.(.*)$", "$1");
        String path = "files\\" + year + "\\" + month + "\\" + day;
        System.out.println("저장 경로: " + absolutePath);

        File file = new File(absolutePath);
        if (!file.exists()) file.mkdirs();
        file = new File(absolutePath + "\\" + newFileName + fileExtension);
        boardFile.transferTo(file);

        Path source = Paths.get(absolutePath + "\\" + newFileName + fileExtension);
        byte[] bytes = null;
        try (InputStream inputStream = Files.newInputStream(source)) {
            bytes = inputStream.readAllBytes();
        }
        String mimeType = Files.probeContentType(source);

        return RequestFileDto.builder()
                .originalboardFileName(boardFile.getOriginalFilename())
                .boardFileName(newFileName + fileExtension)
                .boardFilePath(path)
                .mimeType(mimeType)
                .data(bytes)
                .build();
    }
}
