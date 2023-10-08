package goormknights.hotel.giftcard.controller;

import goormknights.hotel.giftcard.dto.request.RequestGiftCardDto;
import goormknights.hotel.giftcard.dto.request.StateChangeData;
import goormknights.hotel.giftcard.dto.response.ResponseGiftCardDto;
import goormknights.hotel.giftcard.service.GiftCardService;
import goormknights.hotel.global.dto.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/giftcard")
public class GiftCardController {
    private final GiftCardService giftCardService;

    // 상품권 상세 조회 - uuid를 이용
    @GetMapping("/{uuid}")
    public ResponseEntity<ResponseGiftCardDto> getGiftCardByUuid(@PathVariable String uuid) {
        ResponseGiftCardDto giftCard = giftCardService.getGiftCard(uuid);
        return new ResponseEntity<>(HttpStatus.OK.value(), giftCard);
    }

    /**
     * @return 전체 상품권 목록
     */
    @GetMapping("/list")
    public List<ResponseGiftCardDto> getAllGiftCard(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return giftCardService.getGiftCardList(pageable);
    }

    // 페이지 수를 반환하는 코드
    @GetMapping("/count")
    public Long getPageCount() {
        return giftCardService.calcPageCount();
    }

    // 관리자가 상품권 발행을 요청하는 페이지
    // 추후 스프링의 권한 확인 어노테이션이 필요
    @PostMapping("/issue")
    public ResponseEntity<String> issuedGiftCard(@ModelAttribute RequestGiftCardDto requestGiftCardDto) {
        giftCardService.issuedGiftCard(requestGiftCardDto);
        return new ResponseEntity<String>(HttpStatus.OK.value(), "상품권 발행이 완료되었습니다.");
    }

    // 사용자가 상품권을 등록하는 요청
    @PostMapping("/register")
    public ResponseEntity<String> registerationGiftCard(@RequestParam Long memberId, @RequestParam String uuid) {
        giftCardService.registering(memberId, uuid);
        return new ResponseEntity<>(HttpStatus.OK.value(), "상품권 등록이 완료되었습니다.");
    }

    @PostMapping("/usable")
    public ResponseEntity<String> changeStateUsable(@RequestBody StateChangeData stateChangeData) {
        giftCardService.stateUsable(stateChangeData);
        return new ResponseEntity<>(HttpStatus.OK.value(), "변경 완료");
    }

    @PostMapping("/unusable")
    public ResponseEntity<String> changeStateUnusable(@RequestBody StateChangeData stateChangeData) {
        giftCardService.stateUnusable(stateChangeData);
        return new ResponseEntity<>(HttpStatus.OK.value(), "변경 완료");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateGiftCard(@RequestBody RequestGiftCardDto giftCardDto) {
        System.out.println(giftCardDto.toString());
        giftCardService.updateGiftCard(giftCardDto);
        return new ResponseEntity<>(HttpStatus.OK.value(), "업데이트 완료");
    }
}
