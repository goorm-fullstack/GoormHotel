package goormknights.hotel;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.item.repository.ItemRepository;
import goormknights.hotel.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
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
                .email("9rudrb40@naver.com")
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
        
        
        //사용되어선 안되는 쿠폰
        Coupon coupon = Coupon.builder()
                .uuid(UUID.randomUUID().toString())
                .discountRate(5)
                .issueDate(LocalDateTime.of(2022, 11, 11, 11, 11))
                .member(member)
                .expire(30)
                .build();

//        GiftCard giftCard = GiftCard.builder()
//                .uuid(UUID.randomUUID().toString())
//                .money(10000)
//                .member(member)
//                .build();

//        giftCard.registrationGiftCard(member);
        memberRepository.save(member);
        itemRepository.save(room);
        couponRepository.save(coupon);
//        giftCardRepository.save(giftCard);

    }
}
