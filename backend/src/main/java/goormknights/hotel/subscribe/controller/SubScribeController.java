package goormknights.hotel.subscribe.controller;

import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.subscribe.dto.request.RequestSubScribe;
import goormknights.hotel.subscribe.dto.response.ResponseSubScribeDto;
import goormknights.hotel.subscribe.service.SubScribeService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscribe")
public class SubScribeController {
    private final SubScribeService subScribeService;
    private final EmailService emailService;

    // 현재 구독중인 모든 이메일을 조회
    @GetMapping
    public ResponseEntity<List<ResponseSubScribeDto>> findAllSubScribe(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseSubScribeDto> result =subScribeService.getAllSubScribe(pageable);
        return ResponseEntity.ok(result);
    }

    // 구독 취소 API 링크
    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancelSubscribe(@PathVariable Long id) {
        subScribeService.unSubscribe(id);
        return ResponseEntity.ok("구독이 취소되었습니다.");
    }

    // 뉴스레터 구독 API
    @PostMapping
    public ResponseEntity<RequestSubScribe> subscribe(@RequestBody RequestSubScribe requestSubScribe) throws MessagingException {
        subScribeService.save(requestSubScribe);
        emailService.sendSubscribe(requestSubScribe.getEmailAddress(), "newsletter");
        return ResponseEntity.ok(requestSubScribe);
    }

    // 전체 구독자 페이지 수 구하기
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        Long count = subScribeService.calcSubscribePageCount();
        return ResponseEntity.ok(count);
    }
}
