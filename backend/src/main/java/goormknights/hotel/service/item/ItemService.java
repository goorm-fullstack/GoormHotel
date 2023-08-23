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
        log.info("price = {}", price);

        if(member.getCouponList().contains(couponRepository.findById(couponId).orElseThrow())) {
            Coupon coupon = couponRepository.findById(couponId).orElseThrow();
            float discont  = (float) coupon.getDiscountRate() / 100;
            float calc = (float) (price - (price * discont));
            price = (int) calc;
            log.info("apply Coupon price = {}", price);
            coupon.setIsUsed();
        }

        return "주문 확인 Item : "+item.getName()+" 주문 가격 : "+price;
    }
}
