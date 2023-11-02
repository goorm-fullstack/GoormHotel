package goormknights.hotel.member.service;

import goormknights.hotel.member.dto.request.AnonymousDto;
import goormknights.hotel.member.model.Anonymous;
import goormknights.hotel.member.repository.AnonymousRepository;
import goormknights.hotel.reservation.repository.ReservationRepository;
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
    private final AnonymousRepository repository;
    private final ReservationRepository reservationRepository;

    // 비회원 로그인
    public boolean anonymousLogin(AnonymousDto anonymousDto, HttpServletRequest request, HttpServletResponse response) {
        Optional<Anonymous> optionalAnonymous = repository.findByReservationNumberAndPhoneNumber(anonymousDto.getReservationNumber(), anonymousDto.getPhoneNumber());
        if (optionalAnonymous.isPresent()) {
            return true;
        }
        return false;
    }
}
