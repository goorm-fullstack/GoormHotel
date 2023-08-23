package goormknights.hotel.repository.giftcard;

import goormknights.hotel.model.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, Integer> {
}
