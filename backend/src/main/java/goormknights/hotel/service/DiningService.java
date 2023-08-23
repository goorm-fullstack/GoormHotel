package goormknights.hotel.service;

import goormknights.hotel.model.Dining;
import goormknights.hotel.repository.DiningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DiningService {

    private final DiningRepository diningRepository;

    public Long saveDining(Dining dining){
        return diningRepository.save(dining).getId();
    }

    public Dining findById(Long itemId) throws Exception {
        Dining dining = diningRepository.findById(itemId).orElseThrow(() ->
                new Exception("해당 dining을 찾을 수 없습니다"));

        return dining;
    }
}
