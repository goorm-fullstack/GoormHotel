package goormknights.hotel.item.service;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.response.ResponseDiningDto;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.repository.DiningRepository;
import goormknights.hotel.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
     * @param requestDiningDto - 다이닝 정보
     * @param requestImageDto - 이미지 정보
     * @return 다이닝 상품명
     */
    public String saveDining(RequestDiningDto requestDiningDto, RequestImageDto requestImageDto){
        Dining build = requestDiningDto.toEntity().toBuilder()
                .thumbnail(requestImageDto.toEntity())
                .build();
        return itemRepository.save(build).getName();
    }

    /**
     * 다이닝 수정
     * @param diningName - 다이닝 상품명
     * @param requestDiningDto - 다이닝 수정 정보
     * @param img - 다이닝 이미지 수정 정보
     * @return 수정 후 DB에 저장된 다이닝 엔티티
     */
    public Dining modifyDining(String diningName, RequestDiningDto requestDiningDto, MultipartFile img) throws IOException {
        Dining originDining = findByDiningName(diningName);

        RequestImageDto requestImageDto;
        if(img != null) {
            requestImageDto = imageService.convertToImageDto(img);
        } else {
            requestImageDto = RequestImageDto.builder()
                    .originFileName(originDining.getThumbnail().getOriginFileName())
                    .fileName(originDining.getThumbnail().getFileName())
                    .filePath(originDining.getThumbnail().getFilePath())
                    .data(originDining.getThumbnail().getData())
                    .mimeType(originDining.getThumbnail().getMimeType())
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
     * @return 다이닝 상품명에 해당하는 다이닝 엔티티
     */
    public Dining findByDiningName(String diningName) {
        return diningRepository.findByName(diningName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
    }

    /**
     * 전체 다이닝 조회 - 페이징
     * @param pageable - 페이징
     * @return DB에 저장된 전체 다이닝 목록 페이징 처리 후 반환
     */
    public Page<Dining> findAllDining(Pageable pageable){
        return diningRepository.findAll(pageable);
    }

    public List<ResponseDiningDto> findAll(){
        List<Dining> all = diningRepository.findAll();
        return all.stream().map(Dining::toResponseDiningDto).toList();
    }

    /**
     * 페이징된 엔티티 리스트 responseDto로 변환
     * @param pagingDiningList - 페이징된 엔티티 리스트
     * @return 페이징된 responseDto 리스트
     */
    public List<ResponseDiningDto> toResponseDtoList(Page<Dining> pagingDiningList){
        return pagingDiningList.map(Dining::toResponseDiningDto).getContent();
    }

    /**
     * 상품 이름 중복 확인
     * @param diningName - 다이닝 상품 이름
     * @return 중복일시 true, 아닐 시 false
     */
    public boolean existsByName(String diningName){
        return diningRepository.existsByName(diningName);
    }
}
