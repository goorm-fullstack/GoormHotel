package goormknights.hotel;

import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.GiftCard;
import goormknights.hotel.model.Member;
import goormknights.hotel.model.Room;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.giftcard.GiftCardRepository;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.member.MemberRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class InitData {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private GiftCardRepository giftCardRepository;

    @PostConstruct
    void init() {
        Member member = Member.builder()
                .email("test")
                .password("test")
                .name("test")
                .phoneNumber("test")
                .address("test")
                .privacyCheck(true)
                .grade("Silver")
                .authority("ROLE_MEMBER")
                .build();

        Room room = Room.builder()
                .bed("double")
                .roomAdult(2)
                .roomChild(2)
                .capacity(6)
                .spare(2)
                .name("test")
                .price(10000)
                .priceAdult(2000)
                .priceChild(1000)
                .type("room")
                .typeDetail("deluxe")
                .build();

        Coupon coupon = new Coupon(UUID.randomUUID().toString(), member);
        GiftCard giftCard = new GiftCard(UUID.randomUUID().toString(), 10000);
        giftCard.registrationGiftCard(member);
        memberRepository.save(member);
        itemRepository.save(room);
        couponRepository.save(coupon);
        giftCardRepository.save(giftCard);
    }
}
