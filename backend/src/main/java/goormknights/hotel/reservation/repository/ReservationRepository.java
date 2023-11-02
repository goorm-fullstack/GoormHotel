package goormknights.hotel.reservation.repository;

import goormknights.hotel.reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * 예약 번호로 예약 조회
     * @param reservationNumber
     * @return
     */
    @Query("SELECT r FROM Reservation r WHERE r.reservationNumber LIKE :reservationNumber")
    Optional<Reservation> findByReservationNumber(@Param("reservationNumber") String reservationNumber);

    /**
     * memberId로 예약 조회
     * @param memberId
     * @return
     */
    @Query("SELECT r FROM Reservation r WHERE r.member.memberId LIKE :memberId")
    Optional<Reservation> findByMemberId(@Param("memberId") String memberId);

    @Query("SELECT r FROM Reservation r WHERE r.member.memberId LIKE :memberId")
    List<Reservation> findAllByMemberId(@Param("memberId") String memberId);
}
