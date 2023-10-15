package goormknights.hotel.member.repository;

import goormknights.hotel.member.model.Anonymous;
import goormknights.hotel.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnonymousRepository extends JpaRepository<Anonymous, Long> {
    Optional<Anonymous> findByReservationNumberAndPhoneNumber(String memberId, String phoneNumber);
}
