package goormknights.hotel.service.item;

import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Member;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private ItemService itemService;
    @Test
    void buyItem() {
        // 객체 생성
        Member member = Member.builder()
                .authority("ROLE_MEMBER")
                .name("tester")
                .email("test")
                .grade("Bronze")
                .privacyCheck(true)
                .address("NoWhere")
                .phoneNumber("01000000000")
                .password("test")
                .build();

        Coupon coupon = new Coupon(UUID.randomUUID().toString(), member);
        Item item = Item.builder()
                .price(10000)
                .name("ItemA")
                .build();

        memberRepository.save(member);
        couponRepository.save(coupon);
        itemService.save(item);

        String buyInfo = itemService.buyItem(item.getId(), member, coupon.getId());
        System.out.println(buyInfo);
    }
}