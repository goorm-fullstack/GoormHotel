package goormknights.hotel.giftcard.repository;

import goormknights.hotel.giftcard.model.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftCardRepository extends JpaRepository<GiftCard, Integer> {
}
