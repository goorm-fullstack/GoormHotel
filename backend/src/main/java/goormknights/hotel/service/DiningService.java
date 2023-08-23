package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.repository.ItemRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DiningService {

    private final ItemRepository<Dining> itemRepository;

    public Long saveDining(RequestDiningDTO requestDiningDTO, RequestImageDTO requestImageDTO){
        Dining build = requestDiningDTO.toEntity().toBuilder()
                .thumbnail(requestImageDTO.toEntity())
                .build();
        return itemRepository.save(build).getId();
    }

    public Dining modifyDining(Long itemId, RequestDiningDTO requestDiningDTO, @Nullable RequestImageDTO requestImageDTO) throws Throwable {
        Dining originDining = findById(itemId);

        if(requestImageDTO != null){
            return originDining.updateDining(requestDiningDTO, requestImageDTO);
        }else {
            return originDining.updateDining(requestDiningDTO);
        }
    }

    public void deleteDining(Long itemId){
        itemRepository.deleteById(itemId);
    }

    public Dining findById(Long itemId) throws Throwable {
        return itemRepository.findById(itemId).orElseThrow(() ->
                new Exception("해당 dining을 찾을 수 없습니다."));
    }

    public List<Dining> findAllDining(){
        return itemRepository.findAll();
    }
}
