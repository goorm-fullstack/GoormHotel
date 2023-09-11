package goormknights.hotel.item.repository;

import goormknights.hotel.item.model.Dining;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiningRepository extends JpaRepository<Dining, Long> {

    Optional<Dining> findByName(String diningName);
    void deleteByName(String diningName);

    // 페이징
    Page<Dining> findAllByType(String type, Pageable pageable);
}
