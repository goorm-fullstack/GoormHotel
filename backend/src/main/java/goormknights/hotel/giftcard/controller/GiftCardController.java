package goormknights.hotel.giftcard.controller;

import goormknights.hotel.giftcard.dto.response.ResponseGiftCardDto;
import goormknights.hotel.giftcard.service.GiftCardService;
import goormknights.hotel.global.dto.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/giftcard")
public class GiftCardController {
    private final GiftCardService giftCardService;

    @GetMapping("/list")
    public List<ResponseGiftCardDto> getAllGiftCard() {
        return giftCardService.getGiftCardList();
    }

    // 관리자가 상품권 발행을 요청하는 페이지
    // 추후 스프링의 권한 확인 어노테이션이 필요
    @PostMapping("/issue")
    public ResponseEntity<String> issuedGiftCard(@RequestParam int amount, @RequestParam int money) {
        giftCardService.issuedGiftCard(amount, money);
        return new ResponseEntity<String>(HttpStatus.OK.value(), "상품권 발행이 완료되었습니다.");
    }

    // 사용자가 상품권을 등록하는 요청
    @PostMapping("/register")
    public ResponseEntity<String> registerationGiftCard(@RequestParam Long memberId, @RequestParam String uuid) {
        giftCardService.registering(memberId, uuid);
        return new ResponseEntity<>(HttpStatus.OK.value(), "상품권 등록이 완료되었습니다.");
    }
}
