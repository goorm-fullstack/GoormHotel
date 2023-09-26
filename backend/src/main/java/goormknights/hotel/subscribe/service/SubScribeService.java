package goormknights.hotel.subscribe.service;

import goormknights.hotel.subscribe.dto.request.RequestSubScribe;
import goormknights.hotel.subscribe.dto.response.ResponseSubScribeDto;
import goormknights.hotel.subscribe.model.SubScribe;
import goormknights.hotel.subscribe.repository.SubScribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SubScribeService {
    private final SubScribeRepository subScribeRepository;

    public void save(RequestSubScribe subScribe) {
        subScribeRepository.save(subScribe.toEntity());
    }

    public List<ResponseSubScribeDto> getAllSubScribe(Pageable pageable) {
        Page<SubScribe> all = subScribeRepository.findAllByIsSubscribe(pageable,"Y");
        List<ResponseSubScribeDto> result = new ArrayList<>();
        for(SubScribe s : all) {
            result.add(s.toDto());
        }
        return result;
    }

    public void unSubscribe(Long id) {
        SubScribe findSubscribe = subScribeRepository.findById(id).orElseThrow(()-> new NoSuchElementException("구독하지 않은 사용자입니다"));
        findSubscribe.cancelSubscribe();
        subScribeRepository.save(findSubscribe);
    }
}
