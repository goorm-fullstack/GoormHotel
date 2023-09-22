package goormknights.hotel.subscribe.controller;

import goormknights.hotel.subscribe.dto.request.RequestSubScribe;
import goormknights.hotel.subscribe.dto.response.ResponseSubScribeDto;
import goormknights.hotel.subscribe.service.SubScribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscribe")
public class SubScribeController {
    private final SubScribeService subScribeService;

    @GetMapping
    public ResponseEntity<List<ResponseSubScribeDto>> findAllSubScribe() {
        List<ResponseSubScribeDto> result =subScribeService.getAllSubScribe();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancelSubscribe(@PathVariable Long id) {
        subScribeService.unSubscribe(id);
        return ResponseEntity.ok("구독이 취소되었습니다.");
    }

    @PostMapping
    public ResponseEntity<RequestSubScribe> subscribe(@RequestBody RequestSubScribe requestSubScribe) {
        subScribeService.save(requestSubScribe);
        return ResponseEntity.ok(requestSubScribe);
    }
}
