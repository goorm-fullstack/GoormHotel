package goormknights.hotel.coupon.controller;

import goormknights.hotel.coupon.dto.response.ResponseCouponDto;
import goormknights.hotel.coupon.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupon")
public class CouponController {
    private final CouponService couponService;
    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseCouponDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(couponService.findById(id));
    }
}
