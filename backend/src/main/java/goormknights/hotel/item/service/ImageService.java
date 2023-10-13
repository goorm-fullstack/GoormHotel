package goormknights.hotel.item.service;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class ImageService {

    private final ItemRepository<Item> itemRepository;

    // 이미지의 바이트어레이 컨트롤러에 전달
    public byte[] getByteImage(String itemName){
        Item item = itemRepository.findByName(itemName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
        return item.getThumbnail().getData();
    }

    // 이미지의 mime-type 컨트롤러에 전달
    public String getMimeTypeImage(String itemName){
        Item item = itemRepository.findByName(itemName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
        return item.getThumbnail().getMimeType();
    }

//  MultipartFile타입의 데이터를 RequestImageDto로 변환
    public RequestImageDto convertToImageDto(MultipartFile img) throws IOException {
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();
        int hour = now.getHour();
        int minute = now.getMinute();
        int second = now.getSecond();
        int millis = now.get(ChronoField.MILLI_OF_SECOND);

        String absolutePath = "./";
        String newFileName = "image" + hour + minute + second + millis;
        String fileExtension = '.' + img.getOriginalFilename().replaceAll("^.*\\\\.(.*)$", "$1");
        String path = "images\\" + year + month + day;

        File file = new File(path);
        if (!file.exists()) file.mkdirs();

        file = new File(absolutePath + newFileName + fileExtension);
        img.transferTo(file);

        Path source = Paths.get(absolutePath + newFileName + fileExtension);
        byte[] bytes = null;
        try (InputStream inputStream = Files.newInputStream(source)) {
            bytes = inputStream.readAllBytes();
        }
        String mimeType = Files.probeContentType(source);

        log.info("mimeType={}", mimeType);

        return RequestImageDto.builder()
                .originFileName(img.getOriginalFilename())
                .fileName(newFileName + fileExtension)
                .filePath(absolutePath + newFileName + fileExtension)
                .mimeType(mimeType)
                .data(bytes)
                .build();
    }
}
