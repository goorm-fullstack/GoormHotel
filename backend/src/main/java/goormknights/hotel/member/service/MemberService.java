package goormknights.hotel.member.service;

import goormknights.hotel.member.exception.NotExistMemberException;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final GiftCardRepository giftCardRepository;

    public void save(Member member) {
        memberRepository.save(member);
    }

    // 상품권 등록
    public void registrationGiftCard(int memberId, String code) {
        GiftCard giftCard = giftCardRepository.findByUuid(code).orElseThrow(() -> new NoSuchElementException("존재하지 않는 상품권입니다"));
//        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("존재하지 않는 사용자입니다"));
//        member.getGiftCardList().add(giftCard);
    }
}
