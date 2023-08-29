package goormknights.hotel.coupon.service;

import goormknights.hotel.coupon.dto.request.RequestCouponDto;
import goormknights.hotel.coupon.repository.CouponRepository;
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
