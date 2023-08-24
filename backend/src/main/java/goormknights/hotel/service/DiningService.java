package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.repository.DiningRepository;
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
    private final DiningRepository diningRepository;

    public String saveDining(RequestDiningDTO requestDiningDTO, RequestImageDTO requestImageDTO){
        Dining build = requestDiningDTO.toEntity().toBuilder()
                .thumbnail(requestImageDTO.toEntity())
                .build();
        return itemRepository.save(build).getName();
    }

    public Dining modifyDining(String diningName, RequestDiningDTO requestDiningDTO, @Nullable RequestImageDTO requestImageDTO) {
        Dining originDining = findByDiningName(diningName);

        Dining modifiedDining;
        if(requestImageDTO != null){
            modifiedDining = itemRepository.save(originDining.updateDining(requestDiningDTO, requestImageDTO));
        }else{
            modifiedDining = itemRepository.save(originDining.updateDining(requestDiningDTO));
        }
        return modifiedDining;
    }

    public void deleteByDiningName(String diningName){
        diningRepository.deleteByName(diningName);
    }

    public Dining findByDiningName(String diningName) {
        return diningRepository.findByName(diningName);
    }

    public List<Dining> findAllDining(String type){
        return itemRepository.findAllDining(type);
    }
}
