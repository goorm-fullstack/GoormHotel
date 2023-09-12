package goormknights.hotel.member.repository;

import goormknights.hotel.auth.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberSessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findByAccessToken(String accessToken);
}