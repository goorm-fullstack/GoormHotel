package goormknights.hotel.member.service;

import goormknights.hotel.member.dto.request.AnonymousDto;
import goormknights.hotel.member.model.Anonymous;
import goormknights.hotel.member.repository.AnonymousRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AnonymousService {
    private AnonymousRepository repository;

    // 비회원 로그인
    public boolean annoymousLogin(AnonymousDto anonymousDto, HttpServletRequest request, HttpServletResponse response) {
        Optional<Anonymous> optionalAnonymous = repository.findByReservationNumberAndPhoneNumber(anonymousDto.getReservationNumber(), anonymousDto.getPhoneNumber());
        if (optionalAnonymous.isPresent()) {
            ResponseCookie nameCookie = ResponseCookie.from("name", optionalAnonymous.get().getName())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();
            ResponseCookie reservationCookie = ResponseCookie.from("role", optionalAnonymous.get().getReservationNumber())
                    .httpOnly(false)
                    .secure(true)
                    .path("/")      // path
                    .maxAge(3600)
                    .sameSite("None")  // sameSite
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, nameCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, reservationCookie.toString());
            return true;
        }
        return false;
    }
}
