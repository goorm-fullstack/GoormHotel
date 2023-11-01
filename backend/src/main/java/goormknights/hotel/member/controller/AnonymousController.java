package goormknights.hotel.member.controller;

import goormknights.hotel.member.dto.request.AnonymousDto;
import goormknights.hotel.member.service.AnonymousService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous")
public class AnonymousController {
    private final AnonymousService anonymousService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AnonymousDto anonymousDto, HttpServletResponse response, HttpServletRequest request) {
        if (anonymousService.annoymousLogin(anonymousDto,request, response)) {
            return ResponseEntity.ok("로그인 완료");
        } else {
            return new ResponseEntity<>("로그인 실패", HttpStatus.UNAUTHORIZED);
        }
    }
}
