package goormknights.hotel.giftcard.service;

import goormknights.hotel.giftcard.dto.request.RequestGiftCardDto;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GiftCardService {
    private final GiftCardRepository giftCardRepository;

    public void createGiftCard(RequestGiftCardDto giftCardDto) {
        giftCardRepository.save(giftCardDto.toEntity());
    }
}
