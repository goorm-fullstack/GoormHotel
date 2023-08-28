package goormknights.hotel.service.coupon;

import goormknights.hotel.dto.request.RequestCouponDto;
import goormknights.hotel.repository.coupon.CouponRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class CouponService {
    private final CouponRepository couponRepository;

    public void createCoupon(RequestCouponDto couponDto) {
        couponRepository.save(couponDto.toEntity());
    }
}
