package goormknights.hotel.giftcard.service;

import goormknights.hotel.giftcard.dto.request.RequestGiftCardDto;
import goormknights.hotel.giftcard.dto.request.StateChangeData;
import goormknights.hotel.giftcard.dto.response.ResponseGiftCardDto;
import goormknights.hotel.giftcard.exception.AlreadyUsedException;
import goormknights.hotel.giftcard.exception.NoSuchGiftCardException;
import goormknights.hotel.giftcard.exception.NotAvailableException;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.member.exception.NotExistMemberException;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class GiftCardService {
    private final GiftCardRepository giftCardRepository;
    private final MemberRepository memberRepository;

    /**
     * 상품권 생성 로직
     * @param giftCardDto -> 실제로 사용할 수 없다.
     */
    public void createGiftCard(RequestGiftCardDto giftCardDto) {
        giftCardRepository.save(giftCardDto.toEntity());
    }

    // 전체 상품권를 조회하는 로직
    public List<ResponseGiftCardDto> getGiftCardList(Pageable pageable) {
        Page<GiftCard> giftcardList = giftCardRepository.findAll(pageable);
        List<ResponseGiftCardDto> result = new ArrayList<>();
        for(GiftCard giftCard : giftcardList) {
            result.add(giftCard.toResponseDto());
        }
        return result;
    }

    public Long calcPageCount() {
        long count = giftCardRepository.count();
        count /= 10;

        return count;
    }

    public ResponseGiftCardDto getGiftCard(String uuid) {
        GiftCard giftCard = giftCardRepository.findByUuid(uuid).orElseThrow(() -> new NoSuchGiftCardException("존재하지 않는 대상입니다."));
        return giftCard.toResponseDto();
    }

    // 기프트 카드 발행 로직
    // 만약 존재하는 기프트카드 번호라면 다시 돌 수 있도록 구현
    // 여러번 중복되면 로또 사세요.
    public void issuedGiftCard(RequestGiftCardDto requestGiftCardDto) {
        String uuid = makeSerialString();
        if(giftCardRepository.findByUuid(uuid).isEmpty()) {
            GiftCard giftCard = GiftCard.builder()
                    .title(requestGiftCardDto.getTitle())
                    .money(requestGiftCardDto.getMoney())
                    .isZeroMoney('N')
                    .uuid(uuid)
                    .issueDate(LocalDate.now())
                    .expire(requestGiftCardDto.getExpire())
                    .build();
            giftCardRepository.save(giftCard);
        }
    }


    // 상품권 번호를 발행하는 로직
    // uuid를 받아서 대시를 제거한 후에
    // 0부터 15까지로 잘라서 16자리의 문자열로 만든다.
    private String makeSerialString() {
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replaceAll("-","");
        return uuid.substring(0, 16);
    }

    /**
     *
     * @param memberId - 사용자 PK
     * @param uuid - 싱품권 번호
     * 사용자가 상품권 번호를 입력해서 상품권을 등록하는 로직입니다.
     */
    public void registering(long memberId, String uuid) {
        Member registor = memberRepository.findById(memberId).orElseThrow(() -> {
            throw new NotExistMemberException("존재하지 않는 사용자입니다.");
        });

        GiftCard giftCard = giftCardRepository.findByUuid(uuid).orElseThrow(() -> {
            throw new NotAvailableException("사용할 수 없는 상품권입니다.");
        });

        if(giftCard.getMember()!= null) {
            throw new AlreadyUsedException("이미 등록된 상품권입니다.");
        }

        giftCard.registrationGiftCard(registor);
        registor.getGiftCardList().add(giftCard);
    }

    public void stateUsable(StateChangeData stateChangeData) {
        for(Integer id : stateChangeData.getData()) {
            GiftCard giftCard = giftCardRepository.findById(id).orElseThrow();
            giftCard.changeUsableState();
            giftCardRepository.save(giftCard);
        }
    }

    public void stateUnusable(StateChangeData stateChangeData) {
        for(Integer id : stateChangeData.getData()) {
            GiftCard giftCard = giftCardRepository.findById(id).orElseThrow();
            giftCard.changeUnusableState();
            giftCardRepository.save(giftCard);
        }
    }
}
