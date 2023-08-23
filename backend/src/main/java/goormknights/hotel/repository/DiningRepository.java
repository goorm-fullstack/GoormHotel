package goormknights.hotel.repository;

import goormknights.hotel.model.Dining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiningRepository extends JpaRepository<Dining, Long> {
}
