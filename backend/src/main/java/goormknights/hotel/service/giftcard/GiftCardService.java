package goormknights.hotel.service.giftcard;

import goormknights.hotel.dto.request.RequestGiftCardDto;
import goormknights.hotel.repository.giftcard.GiftCardRepository;
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
