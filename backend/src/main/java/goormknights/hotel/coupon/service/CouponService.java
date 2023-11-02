package goormknights.hotel.coupon.service;

import goormknights.hotel.coupon.dto.request.RequestCouponDto;
import goormknights.hotel.coupon.dto.response.ResponseCouponDto;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CouponService {
    private final CouponRepository couponRepository;

    public void createCoupon(RequestCouponDto couponDto) {
        couponRepository.save(couponDto.toEntity());
    }

    public ResponseCouponDto findById(Long id) {
        Optional<Coupon> coupon = couponRepository.findById(id);
        if(coupon.isEmpty())
            throw new RuntimeException();

        return coupon.get().toResponseDto();
    }
}
