package goormknights.hotel.giftcard.repository;

import goormknights.hotel.giftcard.model.GiftCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, Integer> {
    Optional<GiftCard> findByUuid(String code);
    Page<GiftCard> findAll(Pageable pageable);
}
