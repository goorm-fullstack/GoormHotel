package goormknights.hotel.service.item;

import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Member;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.member.MemberRepository;
import goormknights.hotel.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final CouponRepository couponRepository;

    public void save(Item item) {
        itemRepository.save(item);
    }

    // 테스트입니다.
    // 실제 로직과는 다를 수도 있습니다.
    public String buyItem(int id, Member member, int couponId) {
        Item item = itemRepository.findById(id).orElseThrow(() -> {
            throw new NoSuchElementException("대상 아이템이 없습니다");
        });

        int price = item.getPrice();
        BigDecimal newPrice = new BigDecimal(0);
        log.info("price = {}", price);

        if(member.getCouponList().contains(couponRepository.findById(couponId).orElseThrow())) {
            Coupon coupon = couponRepository.findById(couponId).orElseThrow();
            BigDecimal discontRate = new BigDecimal(coupon.getDiscountRate()).divide(BigDecimal.valueOf(100));
            BigDecimal discont = discontRate.multiply(BigDecimal.valueOf(price));
            log.info("apply Coupon price = {}", discont);
            newPrice = new BigDecimal(price).subtract(discont).setScale(0, RoundingMode.FLOOR);
            log.info("apply Coupon price = {}", newPrice);
            coupon.setIsUsed();
        }

        return "주문 확인 Item : "+item.getName()+" 주문 가격 : "+newPrice;
    }
}
