package goormknights.hotel.item.service;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.repository.DiningRepository;
import goormknights.hotel.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DiningService {

    private final ItemRepository<Dining> itemRepository;
    private final DiningRepository diningRepository;
    private final ImageService imageService;

    /**
     * 다이닝 DB에 저장
     * @param requestDiningDTO - 다이닝 정보
     * @param requestImageDTO - 이미지 정보
     * @return diningName - 다이닝 상품명
     */
    public String saveDining(RequestDiningDto requestDiningDTO, RequestImageDto requestImageDTO){
        Dining build = requestDiningDTO.toEntity().toBuilder()
                .thumbnail(requestImageDTO.toEntity())
                .build();
        return itemRepository.save(build).getName();
    }

    /**
     * 다이닝 수정
     * @param diningName - 다이닝 상품명
     * @param requestDiningDto - 다이닝 수정 정보
     * @param img - 다이닝 이미지 수정 정보
     * @return dining - 수정 후 DB에 저장된 다이닝 엔티티
     */
    public Dining modifyDining(String diningName, RequestDiningDto requestDiningDto, MultipartFile img) throws IOException {
        Dining originDining = findByDiningName(diningName);

        RequestImageDto requestImageDto;
        if(!Objects.requireNonNull(img.getOriginalFilename()).equals("")) {
            requestImageDto = imageService.convertToImageDto(img);
        } else {
            requestImageDto = RequestImageDto.builder()
                    .originFileName(originDining.getThumbnail().getOriginFileName())
                    .fileName(originDining.getThumbnail().getFileName())
                    .filePath(originDining.getThumbnail().getFilePath())
                    .build();
        }

        return itemRepository.save(originDining.updateDining(requestDiningDto, requestImageDto));
    }

    /**
     * 다이닝 삭제(soft delete)
     * @param diningName - 다이닝 상품명
     */
    public void deleteByDiningName(String diningName){
        diningRepository.deleteByName(diningName);
    }

    /**
     * 다이닝 상품명을 통해 조회
     * @param diningName - 다이닝 상품명
     * @return dining - 다이닝 상품명에 해당하는 다이닝 엔티티
     */
    public Dining findByDiningName(String diningName) {
        return diningRepository.findByName(diningName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
    }

    /**
     * 전체 다이닝 조회
     * @param type - 1차 카테고리(다이닝 or 객실)
     * @return List<Dining> - DB에 저장된 전체 다이닝 목록
     */
    public List<Dining> findAllDining(String type){
        return itemRepository.findAllDining(type);
    }
}
