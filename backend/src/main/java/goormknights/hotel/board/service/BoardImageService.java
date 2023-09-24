package goormknights.hotel.board.service;


import goormknights.hotel.board.dto.request.RequestImageDto;
import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class BoardImageService {

    private final BoardRepository boardRepository;

    public RequestImageDto requestImageDto(MultipartFile boardImage) throws IOException {
        LocalDateTime localDateTime = LocalDateTime.now();
        int year = localDateTime.getYear();
        int month = localDateTime.getMonthValue();
        int day = localDateTime.getDayOfMonth();

        int hour = localDateTime.getHour();
        int min = localDateTime.getMinute();
        int sec = localDateTime.getSecond();
        int mil = localDateTime.get(ChronoField.MILLI_OF_SECOND);

        String absolutePath = System.getProperty("user.dir")+ "\\backend\\src\\main\\resources\\static\\board\\image";      //파일을 저장할 경로 지정
        String newFileName = "img" + hour+min+sec+mil;
        String fileExtension = '.' + boardImage.getOriginalFilename().replaceAll("^.*\\\\.(.*)$", "$1");
        String path = "images\\" + year + "\\" + month + "\\" + day;

        File file = new File(absolutePath);
        if (!file.exists()) file.mkdirs();
        file = new File(absolutePath + "\\" + newFileName + fileExtension);
        boardImage.transferTo(file);

        Path source = Paths.get(absolutePath + "\\" + newFileName + fileExtension);
        byte[] bytes = null;
        try (InputStream inputStream = Files.newInputStream(source)) {
            bytes = inputStream.readAllBytes();
        }
        String mimeType = Files.probeContentType(source);

        return RequestImageDto.builder()
                .originalboardImageName(boardImage.getOriginalFilename())
                .boardImageName(newFileName + fileExtension)
                .boardImagePath(path)
                .mimeType(mimeType)
                .data(bytes)
                .build();
    }

    public byte[] getByteImage(Long boardId){
        Board board = boardRepository.findByBoardIdAndBoardDelete(boardId, false);
        return board.getBoardImage().getData();
    }

    public String getMimeTypeImage(Long boardId){
        Board board = boardRepository.findByBoardIdAndBoardDelete(boardId, false);
        return board.getBoardImage().getMimeType();
    }

}
